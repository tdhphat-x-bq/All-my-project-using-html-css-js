const container = document.querySelector(".container")
const score = document.querySelector(".score")
const Gameover = document.querySelector(".gameover")
const bird = document.querySelector(".bird")
const sound = document.querySelectorAll("audio")
const div = document.querySelector(".container > div")
const mark = new Map();

let x = 2300, y = 0, degree = 0, sc = 0, end = 0, vel = 0, numOfPipe = 1;
let screen = container.children, down = null, collision = null, run = null;

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
    run = null; end = 1;
}

function updateStatus(deg) {
    degree = deg;
    let rad = degree * Math.PI / 180;
    y += 15 * deg / Math.abs(deg) - 40 * (deg < 0);
    update();
}

function checkCollision() {
    const posBird = bird.getBoundingClientRect();
    //bird vs ground and top
    let collied = !(posBird.top > 10 && posBird.bottom < 325);
    if (collied) {
        gameover();
        return;
    }
    //bird vs pipe
    const pipes = container.querySelectorAll(".pipe");    
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
        } else if (Math.floor(posBird.left) > Math.floor(posPipe.right) && mark.get(i) == 1) {  
            console.log(i, mark.get(i));
            sc++; mark.set(i, 0);
            sound[2].currentTime = 0;
            sound[2].play();
        }
    }
}

function createPipe() {
    numOfPipe++;
    let kc = Math.floor((950 - numOfPipe * 50) / (numOfPipe - 1));
    let push = 100;
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
        screen[1].append(pipe);

        const pipe1 = pipe.cloneNode(true);
        pipe1.src = "assets/pipe_bottom.png";
        pipe1.style.top = `${350 - h2}`;
        pipe1.style.height = `${h2}px`;
        screen[1].append(pipe1);

        push += kc + 50; 
    }   
    const posBird = bird.getBoundingClientRect();
    const pipes = container.querySelectorAll(".pipe");
    for (let i = 0; i < pipes.length; i += 2) {
        let posPipe = pipes[i].getBoundingClientRect();
        mark.set(i, 0), mark.set(i+1, 0);
        if (posPipe.left > posBird.right) mark.set(i, 1);
    }
}

function gamePlay() {
    vel -= 10;
    if (vel % 1160 == 0) {        
        const d = div.cloneNode(true);
        container.children[0].remove();
        container.append(d);
        container.lastChild.style.left = `${x}`;
        x += 1150; createPipe();
    } else container.style.transform = `translateX(${vel}px)`;
}

setInterval(() => score.innerHTML = `Your Score: ${sc}`, 3)
collision = setInterval(checkCollision, 20);

window.addEventListener("keydown", (e) => {
    if ([" ", "ArrowRight"].includes(e.key)) e.preventDefault();
    if (e.key == " " && !end) {
        Gameover.style.zIndex = "-1";
        sound[0].currentTime = 0;
        sound[0].play();
        updateStatus(-45);
        clearInterval(down);
        down = null; 
        if (run == null) run = setInterval(gamePlay, 50);
    }
})
window.addEventListener("keyup", (e) => {
    if (e.key == " " && down == null && !end) {
        down = setInterval(() => updateStatus(45), 50);
    }
})