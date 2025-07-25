const List = document.querySelectorAll(".child1 > div")
const btn = document.querySelector("button")
const heart = document.querySelector(".heart")
const last = document.querySelector(".last")
const child2 = document.querySelector(".child2")
const child1 = document.querySelector(".child1")
const map = new Map();
let feedback;
for (let element of List) {
    element.addEventListener("click", (e) => {
        if (!map.has(element)) {
            element.style.backgroundColor = "#ffffffb4";
            for (let keys of map.keys()) keys.style.backgroundColor =  "transparent";
            map.clear();
            map.set(element, 1);
        }
    })
}
btn.addEventListener("click", (e) => {
    
    for (let key of map.keys()) {
        feedback = key.querySelector("p")
        console.log(feedback)
    }
    child1.style.display = "none";
    child2.style.display = "flex";
    feedback.style.display = "inline";
    last.insertAdjacentElement("beforeend", feedback)
})