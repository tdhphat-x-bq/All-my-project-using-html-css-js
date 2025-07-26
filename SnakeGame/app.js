const container = document.querySelector(".container")
const food = document.querySelector(".food")
const score = document.querySelector(".score")
const Gameover = document.querySelector(".gameover")
const func = [1, 1, -1, -1]
let body = container.children;

let len = body.length, run = null, collision = null, sc = 0;
let pos = [[0, 0], [0, 0], [0, 0]];
let respon = [[0], [0], [0]], ob = [[], [], []];

function createFood() {
    let x = Math.floor(Math.random() * 950);
    let y = Math.floor(Math.random() * 420);
    let xPos = 25 * Math.floor(x / 25);
    let yPos = 25 * Math.floor(y / 25);
    food.style.top = `${yPos}px`
    food.style.left = `${xPos}px`
}

function update() {
    let p = body[0].getBoundingClientRect();
    const div = document.createElement("div")
    div.style.background = "green"
    let res = respon[0][0], x, y;

    if (res & 1) {
        x = p.x - 25 * func[res];
        y = p.y;
    } else {
        x = p.x;
        y = p.y - 25 * func[res];
    }

    pos.unshift([x, y]); 
    respon.unshift([...respon[0]]);
    ob.unshift([...ob[0]]);

    div.style.transform = `translate(${x}px, ${y}px)`;
    container.prepend(div);
    body = container.children;    
    len++; sc++;
}

function gameover() {
    Gameover.style.zIndex = "9999";
    clearInterval(run);
    clearInterval(collision);
}

function checkCollision() {
    let posPlayer = body[len-1].getBoundingClientRect();
    // player vs wall
    let collied = posPlayer.x < 0 || posPlayer.y < 0 || posPlayer.x > 980 || posPlayer.y > 500;
    if (collied) gameover();
    // player vs body
    for (let i = 0; i < len - 1; i++) {
        let posBody = body[i].getBoundingClientRect();
        collied = Math.floor(posPlayer.x) == Math.floor(posBody.x) && Math.floor(posPlayer.y) == Math.floor(posBody.y);
        if (collied) {
            gameover();
            break;
        }
    }
    // player vs food
    let posFood = food.getBoundingClientRect();
    if (posPlayer.x == posFood.x && posPlayer.y == posFood.y) {
        createFood(); 
        update();
    }
}

createFood()
setInterval(() => score.innerHTML = `Your Score: ${sc}`, 3)
collision = setInterval(checkCollision, 5);
run = setInterval(() => {
    for (let i = len - 1; i >= 0; i--) {   
        let locate = body[i].getBoundingClientRect();
        if (ob[i].length > 0 && Math.floor(locate.x) == Math.floor(ob[i][0][0])
            && Math.floor(locate.y) == Math.floor(ob[i][0][1])) {
            respon[i].shift();
            ob[i].shift();
        }     

        let r = respon[i][0]; 
        if (r & 1) pos[i][0] += 25 * func[r];
        else pos[i][1] += 25 * func[r];
        
        body[i].style.transform = `translate(${pos[i][0]}px, ${pos[i][1]}px)`; 
    }
}, 200);
window.addEventListener("keydown", (e) => {
    let res = -1;
    if (e.key == "s") res = 0;
    if (e.key == "d") res = 1;    
    if (e.key == "w") res = 2;
    if (e.key == "a") res = 3;

    if (res != -1) {
        let locate = body[len-1].getBoundingClientRect();
        
        for (let i = 0; i < len; i++) {
            let p = body[i].getBoundingClientRect();
            respon[i].push(res);
            ob[i].push([locate.x, locate.y]);
        }
    }
})