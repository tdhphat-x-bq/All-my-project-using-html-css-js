const divs = document.querySelectorAll("form > div")
const password = document.querySelector("input[type=password]")
const eye = document.querySelector(".fa-eye")

document.addEventListener("click", (e) => {
    if (![...divs].some(div => div.contains(e.target))) {
        divs.forEach(div => div.style.border = "none");
    }
})
for (let i of divs) {
    i.addEventListener("click", () => {
        i.style.borderBottom = "1px solid white";
    })
}
eye.addEventListener("mousedown", () => {
    password.type = "text";
})
eye.addEventListener("mouseup", () => {
    password.type = "password";
})