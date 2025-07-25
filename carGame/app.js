const btn = document.querySelector("button")
const car = document.querySelector(".car")
const clock = document.querySelectorAll(".clock > div")
const timer = document.querySelector(".clock")
const container = document.querySelector(".container")
const road = document.querySelector(".road")
const screen = document.querySelector(".container > div")
const gameover = document.querySelector(".gameover")
const center = document.querySelector(".center")
const del = document.querySelectorAll(".del")
const section = document.querySelector("section")

let obtacle = -1, counter, run, enemyAttach, collision, flag = false;
let hour = [0, 0], minute = [0, 0], second = [0, -1];
let newS = screen.cloneNode(true), st = [0, 0, 0], rand = [0, 0, 0];
let pos = [0, 0, 0, 0];

container.append(newS);
newS = screen.cloneNode(true);
container.append(newS);
const child = container.children;

function plus (time) {
    time[1]++;
    if (time[1] == 10) {
        time[1] = 0;
        time[0]++;
    }
}
function runClock() {
    plus(second);
    if (second[0] == 6) {
        plus(minute);
        second = [0, 0];
    }
    if (minute[0] == 6) {
        plus(hour);
        minute = [0, 0];
    }
    clock[0].innerText = `${hour[0]}${hour[1]}:`
    clock[1].innerText = `${minute[0]}${minute[1]}:`
    clock[2].innerText = `${second[0]}${second[1]}`
}
function play() {
    let vel = 17;
    let flag;
    for (let i = 0; i < 3; i++) st[i] += vel;
    if (st[0] > 1200) {
        st[0] = -590; flag = 0; obtacle = 0;
        child[0].style.transition = "0s all"
        child[0].style.transform = "translateY(-590px)"
    }
    if (st[1] > 600) {
        st[1] = -1190; flag = 1; obtacle = 1; 
        child[1].style.transition = "0s all"
        child[1].style.transform = "translateY(-1190px)"
    }
    if (st[2] > 0) {
        st[2] = -1790; flag = 2; obtacle = 2; 
        child[2].style.transition = "0s all"
        child[2].style.transform = "translateY(-1790px)"
    }
    if (obtacle != -1) {
        const imgs = child[obtacle].querySelectorAll("img")
        imgs.forEach(img => img.remove())
        enemy(); 
        obtacle = -1;
    }
    for (let i = 0; i < 3; i++) {
        if (i == flag) continue;
        child[i].style.transition = "40ms linear";
        child[i].style.transform = `translateY(${st[i]}px)`
    }
}
function enemy () {
    rand[0] = Math.floor(Math.random() * 2);
    for (let i = 1; i < 3; i++) rand[i] = Math.floor(Math.random() * 3);
    if (!rand[0]) {
        const img = document.createElement("img")
        img.classList.add("img")
        img.src = `assets/gamecar${rand[2] + 1}.png`
        child[obtacle].children[rand[1]].prepend(img);
    } else {
        const img1 = document.createElement("img")
        const img2 = document.createElement("img")
        img1.classList.add("img")
        img2.classList.add("img")
        let rand1 = Math.floor(Math.random() * 3);
        let rand2 = Math.floor(Math.random() * 3);
        img1.src = `assets/gamecar${rand1 + 1}.png`
        img2.src = `assets/gamecar${rand2 + 1}.png`
        child[obtacle].children[rand[1]].prepend(img1);
        if (rand[1] != rand[2]) child[obtacle].children[rand[2]].prepend(img2);
    }
}   
function gameOver() {
    flag = false; 

    clearInterval(collision); 
    clearInterval(counter);
    clearInterval(run);
    
    timer.style.display = "none"
    gameover.style.display = "flex";
    gameover.innerHTML = 
    `<h1> Game Over </h1>
    <div> Your Time: 
    ${hour[0]}${hour[1]}:${minute[0]}${minute[1]}:${second[0]}${second[1]}</div>`
}
function checkCollision() {
    const carPos = car.getBoundingClientRect();
    const containerPos = container.getBoundingClientRect();
    let enemies = container.querySelectorAll("img")

    for (let enemy of enemies) {
        let enemyPos = enemy.getBoundingClientRect();

        let check = !(
            (carPos.left > enemyPos.right - 15 ||
            carPos.right < enemyPos.left + 23 || 
            carPos.top > enemyPos.bottom - 20 || 
            carPos.bottom < enemyPos.top + 20) 
            && (carPos.left > containerPos.left && carPos.right < containerPos.right + 2) 
        )
        if (check) {
            gameOver();
            break;
        }
    }
}
btn.addEventListener("click", () => {
    let curPos = 8;  flag = true;

    gameover.style.display = "none";
    btn.style.display = "none";
    car.style.transition = "1s all"
    car.style.transform = `translate(${curPos}px ,-200px)`;
    
    counter = setInterval(runClock, 1000);
    run = setInterval(play, 50);
    collision = setInterval(checkCollision, 5);
    
    window.addEventListener("keyup", (e) => {
        car.style.transition = "100ms all"
        if (e.key == "ArrowLeft" && flag == true) { 
            curPos -= 97;
            car.style.transform = `translate(${curPos}px,-250px)`;
        }
        if (e.key == "ArrowRight" && flag == true) { 
            curPos += 97;
            car.style.transform = `translate(${curPos}px,-250px)`;
        }
    })
})
