const game = document.querySelector(".game")
const main = document.querySelector(".player")
const enemies = document.querySelectorAll("section:not(.center)")
const center = document.querySelector(".center")
const score = document.querySelector(".Score")
const blood = document.querySelector(".blood")
const sound = document.querySelectorAll("audio")
const gameover = document.querySelector(".gameover")

let play = null, rot = null, run = null, bulletRun = null, degree = -45, step = 10, numOfEnemy = 1;
let x = 0, y = 0, sc = 0, left = 2, degLeft = 45, collision = null, deg = [45, -135], st = [0, 0];

for (let i = 0; i < 4; i++) {
    const div = document.createElement("div")
    div.style.left = `${left}`;
    blood.append(div);
    left += 48;
}
update();

function update() {
    main.style.transform = `translate(${x}px, ${y}px) rotate(${degree}deg)`
}

function changeIn4() {
    let del = blood.lastChild;
    if (blood.children.length > 1) {
        del.style.transform = "translateX(-50px)"
        setTimeout(() => del.remove(), 1040)
    } else {
        del.remove();
        main.querySelector("img").src = "assets/boom.png";
        setTimeout(() => {
            gameover.style.zIndex = "9999";
            const boom = sound[2].cloneNode(true);
            boom.play();
        }, 150)
        clearInterval(play); clearInterval(collision);
    }
}

function createEnemy(x, y, pos) {
    const enemy = document.createElement("img")
    const div = document.createElement("div")
    const enemyBlood = document.createElement("div")
    enemyBlood.classList.add("blood")
    enemyBlood.style.width = "52px";
    enemyBlood.style.height = "5px";
    enemyBlood.style.border = "0.5px solid white";
    let push = 1;
    for (let i = 0; i < 4; i++) {
        const tmp = document.createElement("div")
        tmp.style.left = `${push}`;
        enemyBlood.append(tmp);
        push += 12;
    }

    enemy.src = "assets/rocket.png"
    enemy.style.transform = `rotate(${deg[pos]}deg)`
    div.append(enemy); div.append(enemyBlood);
    div.style.position = "absolute"
    div.style.transform = `translate(${x}px, ${y}px)`
    div.classList.add("rocket")
    enemies[pos].prepend(div);
}

function gamePlay() {
    st[0] += 10; st[1] -= 10;
    if (st[0] == 10) {        
        for (let i = 0; i < numOfEnemy; i++) {
            let x = Math.random() * 950;
            let y = Math.random() * 420;
            let pos = Math.floor(Math.random() * 2);
            createEnemy(x, y, pos);
        }
    }
    if (st[0] > 2060) {
        numOfEnemy++;
        const imgs = game.querySelectorAll(".rocket");        
        imgs.forEach(img => img.remove());

        for (let i = 0; i < 2; i++) {
            enemies[i].style.transition = "0s all";
            enemies[i].style.transform = "translateX(0)"
            st[i] = 0;
        }
    }
    if (!st[0]) return;
    for (let i = 0; i < 2; i++) {
        enemies[i].style.transition = "50ms linear";
        enemies[i].style.transform = `translateX(${st[i]}px)`;
    }
}

function checkCollision() {
    const rockets = game.querySelectorAll(".rocket")

    let playerPos = main.getBoundingClientRect();
    for (let element of rockets) {
        let enemyPos = element.getBoundingClientRect();
        // player vs rocket
        let check1 = !(
            playerPos.bottom < enemyPos.top + 20|| 
            playerPos.top > enemyPos.bottom - 20 ||
            playerPos.right < enemyPos.left + 20 ||
            playerPos.left > enemyPos.right - 20
        )
        if (check1) {
            sound[0].play(); 
            changeIn4();
        }
        // rocket vs bullet
        let bullets = main.querySelectorAll(".bullet");
        for (let bull of bullets) {
            if (bull == null) break;
            let bulletPos = bull.getBoundingClientRect();
            let check2 = !(
                bulletPos.bottom < enemyPos.top || 
                bulletPos.top > enemyPos.bottom ||
                bulletPos.right < enemyPos.left ||
                bulletPos.left > enemyPos.right
            )
            if (check2) {
                bull.remove();
                element.lastChild.lastChild.remove();
                if (element.lastChild.children.length == 0) {
                    element.lastChild.remove();
                    element.children[0].src = "assets/boom.png";
                    element.style.transform = `translate(${enemyPos.x, enemyPos.y})`;
                    setTimeout(() => {
                        const boom = sound[2].cloneNode(true);
                        boom.play();
                    }, 150)
                    setTimeout(() => element.remove(), 500);
                    clearInterval(play);
                    setTimeout(() => play = setInterval(gamePlay, 80), 500);
                    sc++;
                }
                break;
            }
        }
    }
}
setInterval(() => score.innerText = `Your Score: ${sc}`, 2)
play = setInterval(gamePlay, 80)
collision = setInterval(checkCollision, 2)

window.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowLeft"].includes(e.key)) e.preventDefault();
    if (e.key == "ArrowRight" && rot == null) {
        rot = setInterval(() => {
            degree += 15;
            update();
        }, 35)
    }

    if (e.key == "ArrowLeft" && rot == null) {
        rot = setInterval(() => {
            degree -= 15;
            update();
        }, 35)
    }

    if (e.key == "s" && run == null) {
        main.children[0].src = "assets/plane_speed.png"
        run = setInterval(() => {
            let rand = (degree + 45) * Math.PI / 180;
            x += Math.sin(rand) * step;
            y -= Math.cos(rand) * step;
            update();
        }, 45)
    } 
})

window.addEventListener("keyup", (e) => {
    if (e.key == "d") {
        const s = sound[1].cloneNode(true); s.play();
        const bullet = document.createElement("div")
        bullet.classList.add("bullet")
        main.append(bullet)
        setTimeout(() => bullet.style.transform = "translate(1000px, -1000px)", 5)
    }

    if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
        clearInterval(rot);
        rot = null;
    }

    if (e.key == "s") {
        main.children[0].src = "assets/plane.png"
        clearInterval(run);
        run = null;
    }
})

