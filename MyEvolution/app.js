const box = document.querySelector(".main");
let imgs, vel = -190, l = 0, step = 1;

for (let i = 0; i < 17; i++) {
    const img = document.createElement("img");
    img.src = `assets/p1 (${i}).jpg`;
    box.append(img);
    box.lastChild.style.left = `${l}px`;
    l += 190;
}
imgs = box.children;
let run = setInterval(() => {
    box.style.transform = `translateX(${vel}px)`;
    vel -= 190;
    setTimeout(() => {
        const img = imgs[0].cloneNode(true);
        imgs[0].remove();
        box.append(img);
        box.lastChild.style.left = `${l}px`;
        imgs = box.children;
        l += 190;
    }, 1000);
}, 2000);
