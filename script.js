var hour = document.querySelector("#hours")
var min = document.querySelector("#min")
var sec = document.querySelector("#sec")
var start = document.querySelector("#str")
var lap = document.querySelector("#lap")
var isTap = true
var stopCounter = 0
var display = document.querySelector(".display")
var reset = document.querySelector("#reset")
var lapCounter = []
var data = []

try {
    data = localStorage.getItem('data')
    data = data.split(",")
    lapCounter = data.slice()
    data.forEach(element => {
        display.innerHTML = `<div class="card">${element}</div>` + display.innerHTML
    });
}
catch (e) {
    console.log(e)
}

function increment() {
    if (stopCounter == 1) {
        isTap = true
        return null
    }
    if (parseInt(sec.innerHTML) == 59) {
        sec.innerHTML = "00"
        if (parseInt(min.innerHTML) == 59) {
            min.innerHTML = "00"
            if (parseInt(hour.innerHTML) < 9) {
                hour.innerHTML = "0" + String(parseInt(hour.innerHTML) + 1)
            }
            else {
                hour.innerHTML = String(parseInt(hour.innerHTML) + 1)
            }
        }
        else if (parseInt(min.innerHTML) < 9) {
            min.innerHTML = "0" + String(parseInt(min.innerHTML) + 1)
        }
        else {
            min.innerHTML = String(parseInt(min.innerHTML) + 1)
        }
    }
    else if (parseInt(sec.innerHTML) < 9) {
        sec.innerHTML = "0" + String(parseInt(sec.innerHTML) + 1)
    }
    else {
        sec.innerHTML = String(parseInt(sec.innerHTML) + 1)
    }
    setTimeout(increment, 1000);
}


start.addEventListener('click', () => {
    if (isTap) {
        start.innerHTML = `<img src="assets/pauseButton.png" alt="">`
        stopCounter = 0
        isTap = false
        increment()
    }
    else {
        start.innerHTML = `<img src="assets/playButton.png" alt="">`
        stopCounter = 1
    }
})


lap.addEventListener('click', () => {
    if (lapCounter == null || !(lapCounter.includes(`${hour.innerHTML}:${min.innerHTML}:${sec.innerHTML}`))) {
        display.innerHTML = `<div class="card">${hour.innerHTML}:${min.innerHTML}:${sec.innerHTML}</div>` + display.innerHTML
        lapCounter.push(`${hour.innerHTML}:${min.innerHTML}:${sec.innerHTML}`)
        localStorage.setItem('data', lapCounter)
    }
})

reset.addEventListener('click', () => {
    localStorage.removeItem('data')
    lapCounter = []
    reset.innerHTML = `<img src="assets/resetButton.png" alt="">`
    display.innerHTML = ""
    sec.innerHTML = "00"
    min.innerHTML = "00"
    hour.innerHTML = "00"
})

// key shortcuts
// S/X - Start/Stop
// R - Reset
// L - Lap

document.onkeyup = function (e) {
    if (e.key == 's') {
        start.click()
    } else if (e.key == 'x') {
        start.click()
    } else if (e.key == 'r') {
        reset.click()
    } else if (e.key == 'l') {
        lap.click()
    }
};