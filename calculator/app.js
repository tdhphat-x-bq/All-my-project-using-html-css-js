const inp = document.querySelectorAll("input")
const select = document.querySelector("select")
const btn = document.querySelector("button")
const ans = document.querySelector(".result")
let number = [];
btn.addEventListener("click", () => {
    let a = parseInt(inp[1].value), b = parseInt(inp[0].value);
    let sum = a;
    if (select.value == "+") sum += b;
    if (select.value == '-') sum -= b;
    if (select.value == '*') sum *= b;
    if (select.value == '/') sum /= b;    
    ans.innerText = sum.toString();
})