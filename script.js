var hour = document.querySelector("#hours")
var min = document.querySelector("#min")
var sec = document.querySelector("#sec")
var start = document.querySelector("#str")
var stop = document.querySelector("#stp")
var lap = document.querySelector("#lap")
var isTap = true
var stopCounter = 0
var display = document.querySelector(".display")
var reset = document.querySelector("#reset")

function increment() {
    if(stopCounter == 1){
        isTap = true
        return 0
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
        stopCounter = 0
        increment()
        isTap = false
       
    }
})

stop.addEventListener('click', () => {
    stopCounter = 1
})

lap.addEventListener('click', ()=>{
    display.innerHTML = `<div class="card">${hour.innerHTML}:${min.innerHTML}:${sec.innerHTML}</div>` + display.innerHTML
})

reset.addEventListener('click', ()=>{
    display.innerHTML = ""
    sec.innerHTML = "00"
    min.innerHTML = "00"
    hour.innerHTML = "00"
})