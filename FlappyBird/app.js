const container = document.querySelector(".container")
const score = document.querySelector(".score")
const Gameover = document.querySelector(".gameover")
const bird = document.querySelector(".bird")
const sound = document.querySelectorAll("audio")
const screen = container.children;

let y = 0, degree = 0, step = 10, sc = 0, start = 0, end = 0, st = [0, 0], numOfPipe = 1;
let down = null, collision = null, run = null, pipe = null, cnt = 0, except = -1;
const mark = new Map();

function update() {
    bird.style.transform = `translateY(${y}px) rotate(${degree}deg)`
}

function gameover() {
    sound[1].play();
    Gameover.textContent = "Game Over"
    Gameover.style.transform = "translate(310px, 170px)";
    Gameover.style.zIndex = "9999";
    clearInterval(down);
    clearInterval(collision);
    clearInterval(run);
    run = null; 
    end = 1;
}

function updateStatus(deg) {
    degree = deg;
    let rad = degree * Math.PI / 180;
    y += 15 * deg / Math.abs(deg) - 40 * (deg < 0);
    update();
}

function checkCollision() {
    let posBird = bird.getBoundingClientRect();
    //bird vs ground and top
    let collied = !(posBird.top > 10 && posBird.bottom < 325);
    if (collied) {
        gameover();
        return;
    }
    //bird vs pipe
    for (let i = 0; i < 2; i++) {
        const pipes = screen[i].querySelectorAll(".pipe")
        if (i == except) continue;
        for (let i = 0; i < pipes.length; i++) {
            let posPipe = pipes[i].getBoundingClientRect();
            collied = !(
                posBird.top > posPipe.bottom || 
                posBird.bottom < posPipe.top ||
                posBird.left > posPipe.right ||
                posBird.right < posPipe.left
            );
            if (collied) {
                gameover();
                break;
            } 
            else {
                console.log(mark.get(i));
                if (Math.floor(posBird.left) > Math.floor(posPipe.right)
                && mark.get(i) == 1 && Math.floor(posPipe.right) > 0) {                    
                    sc++; mark.set(i, 0);
                    sound[2].currentTime = 0;
                    sound[2].play();
                }
            }
        }
    }
    
}

function createPipe(obtacle) {
    const imgs = screen[obtacle].querySelectorAll(".pipe")
    imgs.forEach(img => img.remove());

    numOfPipe++;
    let kc = Math.floor((930 - numOfPipe * 50) / (numOfPipe - 1));
    let push = 50;
    for (let i = 0; i < numOfPipe; i++) {
        let h1 = Math.floor(Math.random() * 251);
        let h2 = 250 - h1;
        let pipe = document.createElement("img");

        pipe.classList.add("pipe");
        pipe.style.position = "absolute";
        pipe.style.width = "50px";
        pipe.style.zIndex = "9999";
        pipe.src = "assets/pipe_top.png";
        pipe.style.position = "absolute";
        pipe.style.height = `${h1}px`;
        pipe.style.left = `${push}`;
        screen[obtacle].append(pipe);

        const pipe1 = pipe.cloneNode(true);
        pipe1.src = "assets/pipe_bottom.png";
        pipe1.style.top = `${350 - h2}`;
        pipe1.style.height = `${h2}px`;
        screen[obtacle].append(pipe1);

        push += kc + 50; 
    }   
    const pipes = container.querySelectorAll(".pipe");
    for (let i = 0; i < pipes.length; i += 2) {
        mark.set(i, 1); mark.set(i+1, 0);
    }
}

function gamePlay() {
    let tmp = -1;
    st[0] -= 10; st[1] -= 10;
    if (st[1] <= -2060) {
        // screen[1].style.display = "none";
        screen[1].style.transition = "0s all";
        screen[1].style.transform = "translateX(-10px)"
        st[1] = -10; tmp = 1; except = 1;
    }
    if (st[0] <= -1030) {
        screen[0].style.transition = "0s all";
        screen[0].style.transform = "translateX(1020px)";
        st[0] = 1020; tmp = 0; except = 0;
    }
    if (tmp != -1) createPipe(tmp);
    setTimeout(() => {
        screen[1].style.display = "block"
    }, 20)
    for (let i = 0; i < 2; i++) {
        screen[i].style.transition = "50ms linear";
        screen[i].style.transform = `translateX(${st[i]}px)`;
    }
}

setInterval(() => score.innerHTML = `Your Score: ${sc}`, 3)
collision = setInterval(checkCollision, 5);

window.addEventListener("keydown", (e) => {
    if ([" ", "ArrowRight"].includes(e.key)) e.preventDefault();
    if (e.key == " " && !end) {
        Gameover.style.zIndex = "-1";
        sound[0].currentTime = 0;
        sound[0].play();
        updateStatus(-45);
        clearInterval(down);
        down = null; 
        if (run == null) run = setInterval(gamePlay, 70);
    }
})
window.addEventListener("keyup", (e) => {
    if (e.key == " " && down == null && !end) {
        down = setInterval(() => {
            updateStatus(45);
        }, 50);
    }
})