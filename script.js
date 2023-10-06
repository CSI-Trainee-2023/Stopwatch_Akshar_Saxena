var hour = document.querySelector("#hours")
var min = document.querySelector("#min")
var sec = document.querySelector("#sec")
var milli = document.querySelector("#milli")
var startStop = document.querySelector("#str")
var lap = document.querySelector("#lap")
var isTap = true
var stopCounter = 0
var display = document.querySelector(".display")
var reset = document.querySelector("#reset")
var lapCounter = []
var data = []

// try/catch for retrieving the data from localStorage

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

// increment function for stopwatch

function increment() {
    if (stopCounter == 1) { //checking for the condition of stop
        isTap = true
        return null
    }
    milli.innerHTML = String(parseInt(milli.innerHTML) + 1).padStart(3, "0")
    if (milli.innerHTML == "099") {
        sec.innerHTML = String(parseInt(sec.innerHTML) + 1).padStart(2, "0")
        if (sec.innerHTML == "60") {
            sec.innerHTML = "00"
            min.innerHTML = String(parseInt(min.innerHTML) + 1).padStart(2, "0")
            if (min.innerHTML == "60") {
                min.innerHTML = "00"
                hour.innerHTML = String(parseInt(hour.innerHTML) + 1).padStart(2, "0")
            }
        }
        milli.innerHTML = "000" // reseting the value of milliseconds
    }
    setTimeout(increment, 10); // recalling function after every 10 milliseconds
}

// start/stop button 
startStop.addEventListener('click', () => {
    if (isTap) {
        startStop.innerHTML = `<img src="assets/pauseButton.png" alt="">`
        stopCounter = 0
        isTap = false
        increment()
    }
    else {
        startStop.innerHTML = `<img src="assets/playButton.png" alt="">`
        stopCounter = 1
    }
})

//lap button
lap.addEventListener('click', () => {
    if (lapCounter == null || !(lapCounter.includes(`${hour.innerHTML}:${min.innerHTML}:${sec.innerHTML}:${milli.innerHTML}`))) {
        display.innerHTML = `<div class="card">${hour.innerHTML}:${min.innerHTML}:${sec.innerHTML}:${milli.innerHTML}</div>` + display.innerHTML
        lapCounter.push(`${hour.innerHTML}:${min.innerHTML}:${sec.innerHTML}:${milli.innerHTML}`)
        localStorage.setItem('data', lapCounter)
    }
})

//reset button
reset.addEventListener('click', () => {
    localStorage.removeItem('data')
    lapCounter = []
    reset.innerHTML = `<img src="assets/resetButton.png" alt="">`
    display.innerHTML = ""
    sec.innerHTML = "00"
    min.innerHTML = "00"
    hour.innerHTML = "00"
    milli.innerHTML = "000"
})

// adding keyboard shortcuts
document.onkeyup = function (e) {
    if (e.key == 's') {
        startStop.click()
    } else if (e.key == 'x') {
        startStop.click()
    } else if (e.key == 'r') {
        reset.click()
    } else if (e.key == 'l') {
        lap.click()
    }
};