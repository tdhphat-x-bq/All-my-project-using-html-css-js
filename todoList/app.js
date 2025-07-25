const box = document.querySelector(".box")
const inp = document.querySelector("input")
const btn = [];
let cnt = 0, p3;
const map = new Map();
inp.addEventListener("keypress", (e) => {
    if (e.key == "Enter" && inp.value.trim()) {
        cnt++;
        const div = document.createElement("div")
        div.innerHTML = `<p> ${inp.value} </p> <p class="del"> x </p>`
        inp.value = "";
        box.appendChild(div);
        // console.log(box.children[1].children[1].innerText);
    }
})
box.addEventListener("click", (e) => {
    const tmp = e.target;
    if (tmp.classList.contains("del")) tmp.parentElement.remove();
})