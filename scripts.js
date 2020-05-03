//Global Variables and on load declarations
const tokenSize = document.querySelectorAll(".tokenItem");
const multiTable = document.querySelector(".multiTable");
const btnArea = document.querySelector('.btnArea');
let gridVal = document.querySelector("#tokenSize").value;
let colorVal = document.querySelector("#colorDrop").value;
let bodyC = document.querySelector("body");
//Creates Token Images for Non-Dynamic Token Shapes
let coinImg = document.createElement("div")
coinImg.classList.add("coinImg");
//Creates default animation choice
let aniChoice = "none";
let shapeChoice = "circle";
//Keeps track of total amount of tokens possible to earn, default is 10
let tokenTotal = 10;
//keeps track of how many tokens have actually been earned, default is 0, no tokens earned at beginning
let tokenScore = 0;
//Toggle Timer Functionality
const toggleTimerBtn = document.querySelector(".toggleTimer");
let isSoundLoaded = false;
toggleTimerBtn.addEventListener("click", () => {
    multiTable.classList.toggle("hideTimer");
    let text = toggleTimerBtn.innerHTML;
    text == "Show Timer" ? text = "Collapse Timer" : text = "Show Timer";
    toggleTimerBtn.innerHTML = text;
    if(!isSoundLoaded){
        sound.play();
        isSoundLoaded = true;
    }
})
const toggleMenuBtn = document.querySelector(".toggleMenu");
const menuItems = document.querySelectorAll(".hideMenuItem");
toggleMenuBtn.addEventListener("click", () => {
    menuItems.forEach(elem => {
        elem.classList.toggle("hideTimer");
    })
    let text = toggleMenuBtn.innerHTML;
    text == "Edit Tokens" ? text = "Hide Menu" : text = "Edit Tokens";
    toggleMenuBtn.innerHTML = text;

})
//Reset Button Functionality
function resetBtn() {
    bodyC.style.backgroundColor = "#05386B";
    tokenScore = 0;
    confetti.stop();
    let circleToken = document.querySelectorAll(".circleItem");
    for (let i = 0; i < circleToken.length; i++) {
        circleToken[i].removeAttribute("data-attr");
        //Removes previous shape selections
        circleToken[i].classList.remove("circleItem");
        circleToken[i].classList.remove("starItem");
        circleToken[i].classList.remove("coinItem");
        circleToken[i].classList.remove("heartItem");
        circleToken[i].classList.remove("smileyItem");
        circleToken[i].classList.remove("burstItem");
        circleToken[i].classList.remove("alienItem");
        circleToken[i].style.backgroundColor = "#000";
    }
    //Updates user token color choice
    colorVal = document.querySelector("#colorDrop").value;
    //Updates user animation choice
    aniChoice = document.querySelector("#aniSelect").value;
    //Generate Button Functionality -- Updates Number of Available Tokens
    gridVal = document.querySelector("#tokenSize").value;
    tokenTotal = gridVal
    resetGrid()
    makeGrid(gridVal)
    //Shape Selection Update
    shapeChoice = document.querySelector("#shapeDrop").value;
};

function resetGrid(){
    btnArea.innerHTML = "";
}
function makeGrid(size){
    for(let i = 0; i < size; i++){
        const btn = document.createElement('DIV');
        btn.classList.add('btn');
        btnArea.appendChild(btn);
        btn.addEventListener("click", ()=> {
            gridVal = document.querySelector("#tokenSize").value;
            if(btn.getAttribute("data-attr") !== "clicked") tokenScore++;
            btn.setAttribute("data-attr", "clicked");
            changeColor(btn);
            startAni();
        })
    }
}
makeGrid(10);

//Functionality to trigger earned animation upon succesful completion of the token board
function startAni() {
    aniChoice = document.querySelector("#aniSelect").value;
    
    if (tokenScore < tokenTotal) {
        console.log("You haven't earned all your tokens!!")
        console.log(`${tokenScore} out of ${tokenTotal}`)
        
    } else{
        if (aniChoice == "none"){
            console.log("You've Earned All Your Tokens!!")
            console.log("no animation selected")
        } else if (aniChoice == "confetti") {
            confetti.start();
            console.log("You've Earned All Your Tokens!!")
            console.log(`${tokenScore} out of ${tokenTotal}`)
        } else if (aniChoice == "fireworks") {
            bodyC.style.backgroundColor = "black";
            newFireWorkStar(200, 200);
            newFireWorkStar(400, 400);
            newFireWorkStar(600, 300);
            newFireWorkStar(500, 100);
            newFireWorkStar(800, 500);
            newFireWorkStar(800, 100);
            newFireWorkStar(900, 200);
            newFireWorkStar(1100, 400);
            newFireWorkStar(1100, 100);
            newFireWorkStar(100, 1000);
            newFireWorkStar(1, 1);
        }
    }
};

//Color Generation - Array of Possible Colors
let Colors = {};
Colors.names = {
    aqua: "#00ffff",
    azure: "#f0ffff",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgreen: "#006400",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#800080",
    violet: "#800080",
    red: "#ff0000",
    yellow: "#ffff00"
};

//Generates a random color
Colors.random = function() {
    let result;
    let count = 0;
    for (let prop in this.names)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
    
};

//Timer Functionality

//addMin
//displaySet
//subMin
//startTimer

const addMin = document.querySelector(".addMin");
const subMin = document.querySelector(".subMin");
const addSec = document.querySelector(".addSec");
const subSec = document.querySelector(".subSec");
const startTimerBtn = document.querySelector(".startTimer");
const pauseTimerBtn = document.querySelector(".pauseTimer");
const resetTimerBtn = document.querySelector(".resetTimer");
const digitTable = document.querySelector(".digitTable");

addMin.addEventListener("click", () => {addMinFunc(); updataDigitTable(timerSetting);});
subMin.addEventListener("click", () => {subMinFunc(); updataDigitTable(timerSetting);});
addSec.addEventListener("click", () => {addSecFunc(); updataDigitTable(timerSetting);});
subSec.addEventListener("click", () => {subSecFunc(); updataDigitTable(timerSetting);});
let timerSet = null;
let setMin = 60000; //60s * 1000ms = minutes
let setSec = 10000; //1000ms * 10 increment
let timerSetting = 0;
startTimerBtn.addEventListener("click", () => {
    if(timerSetting > 0){
        if(timerSet == null){
            timerSet = startTimer(timerSetting, ".digitTable");
            console.log("in timerSet == null");
            startTimerBtn.classList.toggle("hideTimer");
            pauseTimerBtn.classList.toggle("hideTimer");
            pauseTimerBtn.classList.toggle("paused");
        }
        else{ 
            timerSet.resume();
            console.log("in timerSet.resume();");
            startTimerBtn.classList.toggle("hideTimer");
            pauseTimerBtn.classList.toggle("hideTimer");
        }
    }
    
});
pauseTimerBtn.addEventListener("click", () => {
    timerSet.pause();
    startTimerBtn.classList.toggle("hideTimer");
    pauseTimerBtn.classList.toggle("hideTimer");
});
resetTimerBtn.addEventListener("click", () => {
    let btnStatus = startTimerBtn.classList.contains("hideTimer");
    if(btnStatus){
        startTimerBtn.classList.toggle("hideTimer");
        pauseTimerBtn.classList.toggle("hideTimer");
    }
    timerSet.reset();
    updataDigitTable(timerSetting);
    timerSet = null;
})
function updataDigitTable(now){
    let m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
    s = (s < 10 ? "0" : "")+s;
    digitTable.innerHTML = m+":"+s;
};

function addMinFunc(){
    return timerSetting += setMin;
};
function subMinFunc(){
    timerSetting -= setMin;
    if(timerSetting < 0) timerSetting = 0;
    return timerSetting;
}
function addSecFunc(){
    return timerSetting += setSec;
}
function subSecFunc(){
    timerSetting -= setSec;
    if(timerSetting < 0) timerSetting = 0;
    return timerSetting;
}
//const sound = new Audio("/audio/alarm.mp3");
const sound = document.querySelector("#alarmSound");
function startTimer(ms, container) {
    let alarmSound, startTime, timer, obj, original = ms,
        display = document.querySelector(container);
    obj = {};
    obj.resume = function() {
        startTime = new Date().getTime();
        timer = setInterval(obj.step,250);                       
    };
    obj.pause = function() {
        ms = obj.step();
        clearInterval(timer);
    };
    obj.step = function() {
        var now = Math.max(0,ms-(new Date().getTime()-startTime)), 
            m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
        console.log("now: " + now)
        s = (s < 10 ? "0" : "")+s;
        display.innerHTML = m+":"+s;
        if( now == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            sound.muted = false;
        }
        return now;
    };
    obj.reset = function() {
        console.log("in reset " + ms)
        clearInterval(timer);
        timer = null;
        //obj.pauseAudio();
        sound.muted = true;
        return ms = timerSetting;
    };
    obj.resume();
    return obj;
}



(function startInterval(){
    const addMinInt = document.querySelector(".addMinInt");
    const subMinInt = document.querySelector(".subMinInt");
    const addSecInt = document.querySelector(".addSecInt");
    const subSecInt = document.querySelector(".subSecInt");
    const startTimerBtnInt = document.querySelector(".startTimerInt");
    const pauseTimerBtnInt = document.querySelector(".pauseTimerInt");
    const resetTimerBtnInt = document.querySelector(".resetTimerInt");
    const digitTableInt = document.querySelector(".digitTableInt");


    addMinInt.addEventListener("click", () => {addMinFuncInt(); updataDigitTableInt(setInt);});
    subMinInt.addEventListener("click", () => {subMinFuncInt(); updataDigitTableInt(setInt);});
    addSecInt.addEventListener("click", () => {addSecFuncInt(); updataDigitTableInt(setInt);});
    subSecInt.addEventListener("click", () => {subSecFuncInt(); updataDigitTableInt(setInt);});
    function updataDigitTableInt(now){
        let m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
        s = (s < 10 ? "0" : "")+s;
        digitTableInt.innerHTML = m+":"+s;
    };
    let setInt = 0;
    function addMinFuncInt(){
        return setInt += setMin;
    };
    function subMinFuncInt(){
        setInt -= setMin;
        if(setInt < 0) setInt = 0;
        return setInt;
    }
    function addSecFuncInt(){
        return setInt += setSec;
    }
    function subSecFuncInt(){
        setInt -= setSec;
        if(setInt < 0) setInt = 0;
        return setInt;
    }
    startTimerBtnInt.addEventListener("click", () => {
        start();
        startTimerBtnInt.classList.toggle("hideTimer");
        pauseTimerBtnInt.classList.toggle("hideTimer");
    })
    resetTimerBtnInt.addEventListener('click', stopF);
    pauseTimerBtnInt.addEventListener('click', pauseF);
    let pause = false;
    let s = 0;
    function start() {
        // extract the integer value from times
        let stop = false;
        // increment seconds
        
        updataDigitTableInt(s);
        // if stop is not pressed
        if (!stop) {
            // if pause is not pressed
            if (!pause) {
            // increase time
            s = s + 1000;
            setTimeout(start, 1000);
            let now = s, 
                m = Math.floor(now/60000), sd = Math.floor(now/1000)%60;
            sd = (sd < 10 ? "0" : "")+sd;
            digitTableInt.innerHTML = m+":"+s;
            if(s % setInt == 0){
                //play beep sound once
                sound.muted = !sound.muted;
                setTimeout(function(){sound.muted = !sound.muted;}, 300);
            }
            updataDigitTableInt(s);
            
            } else {
            // toggle pause
                pause = !pause;
                startTimerBtnInt.classList.toggle("hideTimer");
                pauseTimerBtnInt.classList.toggle("hideTimer");
            }
        } else {
            // toggle stop
            stop = !stop;
        }
    }
    function stopF() {
        stop = true;
        pause = true;
        s = 0;
        setInt = 0;
        updataDigitTableInt(s);
    }
    function pauseF() {
        pause = true;
    }
})();

(function startDur(){
    const startTimerBtnDur = document.querySelector(".startTimerDur");
    const pauseTimerBtnDur = document.querySelector(".pauseTimerDur");
    const resetTimerBtnDur = document.querySelector(".resetTimerDur");
    const digitTableDur = document.querySelector(".digitTableDur");
    function updataDigitTableDur(now){
        let m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
        s = (s < 10 ? "0" : "")+s;
        digitTableDur.innerHTML = m+":"+s;
    };
    startTimerBtnDur.addEventListener("click", () => {
        start();
        startTimerBtnDur.classList.toggle("hideTimer");
        pauseTimerBtnDur.classList.toggle("hideTimer");
    })
    resetTimerBtnDur.addEventListener('click', stopF);
    pauseTimerBtnDur.addEventListener('click', pauseF);
    let pause = false;
    let s = 0;
    function start() {
        // extract the integer value from times
        let stop = false;
        // increment seconds
        
        updataDigitTableDur(s);
        // if stop is not pressed
        if (!stop) {
            // if pause is not pressed
            if (!pause) {
            // increase time
            s = s + 1000;
            setTimeout(start, 1000);
            let now = s, 
                m = Math.floor(now/60000), sd = Math.floor(now/1000)%60;
            sd = (sd < 10 ? "0" : "")+sd;
            digitTableDur.innerHTML = m+":"+s;
            updataDigitTableDur(s);
            } else {
            // toggle pause
                pause = !pause;
                startTimerBtnDur.classList.toggle("hideTimer");
                pauseTimerBtnDur.classList.toggle("hideTimer");
            }
        } else {
            // toggle stop
            stop = !stop;
        }
    }

    function stopF() {
        stop = true;
        pause = true;
        s = 0;
        updataDigitTableDur(s);
    }

    function pauseF() {
        pause = true;
    }
})();
//Color Option Functionality - Checks for selected color/shape and changes token color/shape to the correct selection
function changeColor(_this) {
    //
    _this.classList.add()
    //Updates Color
    if (colorVal == "random"){
        _this.style.backgroundColor = Colors.random()
    } else if (colorVal == "red") {
        _this.style.backgroundColor = "#ff0000"
    } else if (colorVal == "orange") {
        _this.style.backgroundColor = "#ffa500"
    } else if (colorVal == "yellow") {
        _this.style.backgroundColor = "#ffff00"
    } else if (colorVal == "green") {
        _this.style.backgroundColor = "#008000"
    } else if (colorVal == "blue") {
        _this.style.backgroundColor = "#00ffff"
    } else if (colorVal == "purple") {
        _this.style.backgroundColor = "#800080"
    }

    //Updates Shape
    if (shapeChoice == "circle"){
        _this.classList.add("circleItem")
    } else if (shapeChoice == "star") {
        _this.classList.add("starItem")
        _this.classList.remove("btn")
        _this.style.backgroundColor = "transparent"
    } else if (shapeChoice == "coin") {
        _this.classList.remove("btn")
        _this.classList.add("coinImg")
        _this.style.backgroundColor = "transparent"
    } else if (shapeChoice == "heart") {
        _this.classList.add("heartItem")
        _this.classList.remove("btn")
    } else if (shapeChoice == "smiley") {
        _this.classList.remove("btn")
        _this.classList.add("smileyItem")
    } else if (shapeChoice == "alien") {
        _this.classList.remove("btn")
        _this.classList.add("alienItem")
        _this.style.backgroundColor = "transparent"
    } else if (shapeChoice == "robot") {
        _this.classList.remove("btn")
        _this.classList.add("robotItem")
        _this.style.backgroundColor = "transparent"
    } else if (shapeChoice == "butterfly") {
        _this.classList.remove("btn")
        _this.classList.add("butterflyItem")
        _this.style.backgroundColor = "transparent"
    }
};

//Updates the color of future tokens and clears the token board
function updateColor() {
    colorVal = document.querySelector("#colorDrop").value;

    resetBtn();
};

//Blowout Button Functionality
let blowoutBtn = document.querySelector("#blowoutBtn");
blowoutBtn.addEventListener("click", ()=> {
    let buttonsNodelist = document.querySelectorAll(".btn");
    let btnArray = Array.from(buttonsNodelist);
    let i = 0;
    (function allIn() {
        setTimeout(function () {
            if (i<btnArray.length ) {
                allIn()
                changeColor(btnArray[i]);
                i++;    
            }   
        }, 150)
    })();
    confetti.start();
    bodyC.style.backgroundColor = "black";
            newFireWorkStar(200, 200);
            newFireWorkStar(400, 400);
            newFireWorkStar(600, 300);
            newFireWorkStar(500, 100);
            newFireWorkStar(800, 500);
            newFireWorkStar(800, 100);
            newFireWorkStar(900, 200);
            newFireWorkStar(1100, 400);
            newFireWorkStar(1100, 100);
            newFireWorkStar(100, 1000);
            newFireWorkStar(1, 1);
    i = 0;
});

