
function resetBtn() {
    location.reload();
}
// function addEvents(item){
//     item.addEventListener("click", makeGrid(item));
// }
let tokenSize = document.querySelectorAll(".tokenItem");
tokenSize.forEach(item => item.addEventListener("click", () => {
    resetGrid();
    makeGrid(item.value);
}));
const btnArea = document.querySelector('.btnArea');
function resetGrid(){
    btnArea.innerHTML = "";
}
function makeGrid(size){
    for(let i = 0; i < size; i++){
        const btn = document.createElement('DIV');
        btn.classList.add('btn');
        btnArea.appendChild(btn);
        btn.addEventListener("click", ()=> {
            changeColor(btn);
        })
    }
}
makeGrid(10);

//Color Generation - Array of Possible Colors
let Colors = {};
Colors.names = {
    aqua: "#00ffff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    brown: "#a52a2a",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
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
    khaki: "#f0e68c",
    lightblue: "#add8e6",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
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
    silver: "#c0c0c0",
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

function changeColor(_this) {
    _this.style.backgroundColor = Colors.random();
    _this.style.borderColor = "transparent";
    _this.style.borderRadius = "100px";
}

//addMin
//displaySet
//subMin
//startTimer

const addMin = document.querySelector(".addMin");
const displaySet = document.querySelector(".displaySet");
const subMin = document.querySelector(".subMin");
const startTimerBtn = document.querySelector(".startTimer");

addMin.addEventListener("click", () => addMinFunc());
subMin.addEventListener("click", () => subMinFunc());
let defaultMin = 5;
function addMinFunc(){
    defaultMin++;
    updateSetMin();
    return defaultMin;
}
function subMinFunc(){
    defaultMin--;
    if(defaultMin < 0){
        defaultMin = 0;
    }
    updateSetMin();
    return defaultMin;
}
function updateSetMin(){
    displaySet.innerHTML = `${defaultMin}:00`;
}
updateSetMin();
