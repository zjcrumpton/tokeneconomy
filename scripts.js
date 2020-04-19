//Global Variables and on load declarations
const tokenSize = document.querySelectorAll(".tokenItem");
const btnArea = document.querySelector('.btnArea');
let gridVal = document.querySelector("#tokenSize").value;
let colorVal = document.querySelector("#colorDrop").value;
let bodyC = document.querySelector("body");
//Creates default animation choice
let aniChoice = "none";
let shapeChoice = "circle";
//Keeps track of total amount of tokens possible to earn, default is 10
let tokenTotal = 10;
//keeps track of how many tokens have actually been earned, default is 0, no tokens earned at beginning
let tokenScore = 0;

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
    console.log(aniChoice)
    aniChoice = document.querySelector("#aniSelect").value;
    console.log(aniChoice)
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
const displaySet = document.querySelector(".displaySet");
const subMin = document.querySelector(".subMin");
const startTimerBtn = document.querySelector(".startTimer");
const pauseTimerBtn = document.querySelector(".pauseTimer");
const digitTable = document.querySelector(".digitTable");
const addSec = document.querySelector(".addSec");
const displaySetSec = document.querySelector(".displaySetSec");
const subSec = document.querySelector(".subSec");

addMin.addEventListener("click", () => addMinFunc());
subMin.addEventListener("click", () => subMinFunc());
addSec.addEventListener("click", () => addSecFunc());
subSec.addEventListener("click", () => subSecFunc());
let timer = null;
startTimerBtn.addEventListener("click", () => {

    if(timer == null){
        timer = startTimer(4, ".digitTable", function() {alert("Done!");});
    }
    else{
        startTimerBtn.addEventListener("click", () => {
            timer.resume();
        })
    }
    pauseTimerBtn.addEventListener("click", () => {
        timer.pause();
    });

    
});

let setMin = 1;
let setSec = 0;
function addMinFunc(){
    setMin++;
    updateSetMin();
    return setMin;
}
function subMinFunc(){
    setMin--;
    if(setMin < 0){
        setMin = 0;
    }
    updateSetMin();
    return setMin;
}
function updateSetMin(){
    displaySet.innerHTML = `${setMin}m`;
}
updateSetMin();
function addSecFunc(){
    setSec += 10;
    if(setSec > 60){
        setSec = 60;
    }
    updateSetSec();
    return setSec;
}
function subSecFunc(){
    setSec -= 10;
    if(setSec < 0){
        setSec = 0;
    }
    updateSetSec();
    return setSec;
}
function updateSetSec(){
    displaySetSec.innerHTML = `${setSec}s`;
}
updateSetMin();

function startTimer(seconds, container, oncomplete) {
    let startTime, timer, obj, ms = seconds*1000,
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
        s = (s < 10 ? "0" : "")+s;
        display.innerHTML = m+":"+s;
        if( now == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            if( oncomplete) oncomplete();
        }
        return now;
    };
    obj.resume();
    return obj;
}


//Color Option Functionality - Checks for selected color/shape and changes token color/shape to the correct selection
function changeColor(_this) {
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
    } else if (shapeChoice == "coin") {
        _this.classList.add("coinItem")
    } else if (shapeChoice == "heart") {
        _this.classList.add("heartItem")
        _this.classList.remove("btn")
        if (tokenScore == tokenTotal) {
            _this.classList.add("heartBeat")
        }
    } else if (shapeChoice == "smileyItem") {
        _this.classList.add("smileyItem")
    } else if (shapeChoice == "burst") {
        _this.classList.add("burstItem")
    } else if (shapeChoice == "alien") {
        _this.classList.add("alienItem")
    }
};

//Updates the color of future tokens and clears the token board
function updateColor() {
    colorVal = document.querySelector("#colorDrop").value;
    resetBtn();
};

