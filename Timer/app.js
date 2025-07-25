const clock = document.querySelectorAll("div")
let hour = [0, 0], minute = [0, 0], second = [0, 0], cnt = 0, intervalId;
function plus(time) {
    time[1]++;
    if (time[1] == 10) {
        time[0]++;
        time[1] = 0;
    }
}
function clockRun() {
    plus(second);
    if (second[0] == 6) {
        second = [0, 0];
        plus(minute);
    }
    if (minute[0] == 6) {
        minute = [0, 0];
        plus(hour);
    }
    clock[0].innerText = `${hour[0]}${hour[1]}`;
    clock[1].innerText = `${minute[0]}${minute[1]}`;
    clock[2].innerText = `${second[0]}${second[1]}`;
}
window.addEventListener("keydown", (e) => {
    if (e.key == " ") {
        for (let element of clock) element.style.color = "red";
    }
})
window.addEventListener("keyup", (e) => {
    console.log(e.key);
    if (e.key == " ") {
        for (let element of clock) element.style.color = "green";
        if (!cnt) {
            intervalId = setInterval(clockRun, 1000)
            cnt = 1;
        } else {
            clearInterval(intervalId);
            cnt = 0;
        }
    }
})