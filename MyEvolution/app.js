const content = document.querySelector(".content");
let l = 0, deg = -360, time = 0, run = null, run1 = null, step = -290;
let tl = gsap.timeline(), tl1 = gsap.timeline();

for (let i = 0; i < 17; i++) {
    let s;
    const item = document.createElement("div");
    const img = document.createElement("img");
    const text = document.createElement("p");

    img.src = `assets/p1 (${i}).jpg`;

    if (i > -1 && i < 4) s = "Adult";
    if (i > 3 && i < 10) s = "Child";
    if (i > 9) s = "My Sister";
    if (i == 16) s = "Sigma ☠️"; 

    text.innerText = s;
    item.append(img); item.append(text);
    item.style.left = `${l}px`;
    content.append(item);
    l += 290;
}

run = setInterval(() => {
    tl.to(".circle", {
        duration: 1.5,
        ease: "linear",
        rotate: deg,
    })
    deg -= 360; time = 2000;
}, time)

run = setInterval(() => {
    tl1.to(".content > div", {
        duration: 1.5,
        ease: "linear",
        x: step,
    });
    step -= 290;
}, 2000);

setInterval(() => {
    let pos = content.children[0].getBoundingClientRect();
    if (Math.floor(pos.left) == -89) {
        const item = content.children[0].cloneNode(true);
        content.children[0].remove();
        item.style.left = `${l}px`;
        content.append(item);
        l += 290;
    }
}, 5); 
