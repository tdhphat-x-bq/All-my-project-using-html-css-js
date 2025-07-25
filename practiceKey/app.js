const key = document.querySelector(".key")
const keyCode = document.querySelector(".key-code")
const code = document.querySelector(".code")
window.addEventListener("keypress", (e) => {
    key.innerText = e.key;
    keyCode.innerText = e.charCode;
    code.innerText = e.code;
})