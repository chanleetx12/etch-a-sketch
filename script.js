// Default values
const defaultValue = 16;
let activePen = 'black';



// Identify page
const body = document.querySelector('body');
// body.addEventListener('mouseover', (event)=>{
//     if (!event.target.className){
//         console.log(event.target.nodeName);
//     }else{
//         console.log(event.target.className);
//     }
    
// })

// Identify board
const board = document.querySelector('.board');

// Identify buttons
const blackButton = document.querySelector('.black');
const colorButton = document.querySelector('.color');
const eraserButton = document.querySelector('.eraser');
const resetButton = document.querySelector('.reset');

// Button actions
resetButton.addEventListener('click', resetAll);
blackButton.addEventListener('click', () => {
    activePen = 'black';
    selectedPen();
});
colorButton.addEventListener('click', () => {
    activePen = 'color';
    selectedPen();
});
eraserButton.addEventListener('click', () => {
    activePen = 'eraser'
    selectedPen();
})

selectedPen();

// Create a board based on matrix values
function createBoard(matrixValue) {
    for (var i = 0; i < matrixValue * matrixValue; i++) {
        const newBox = document.createElement('div');
        newBox.classList.add('box');
        newBox.style.height = `${board.clientHeight / matrixValue}px`;
        newBox.style.width = `${board.clientWidth / matrixValue}px`;
        board.appendChild(newBox);
    }
};

createBoard(defaultValue);

// Select active button
function selectedPen(){
    if (activePen === 'black') {
        blackButton.classList.add('selected')
        colorButton.classList.remove('selected')
        eraserButton.classList.remove('selected')
    } else if (activePen === 'color') {
        blackButton.classList.remove('selected')
        colorButton.classList.add('selected')
        eraserButton.classList.remove('selected')
    } else if (activePen === 'eraser') {
        blackButton.classList.remove('selected')
        colorButton.classList.remove('selected')
        eraserButton.classList.add('selected')
    }
}

// Draw function
function draw(event) {
    if (mousedown && event.target.className === 'box') {
        if (activePen === 'black') {
            event.target.style.backgroundColor = drawBlack();
        } else if (activePen === 'color') {
            event.target.style.backgroundColor = drawColor();
        } else if (activePen === 'eraser') {
            event.target.style.backgroundColor = eraser();
        }
    }
}

// Button function definitions
function drawBlack() {
    activePen = 'black';
    return '#000000';
};

function drawColor() {
    activePen = 'color';
    let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
};

function eraser() {
    activePen = 'eraser';
    return ''
}

function resetAll() {
    boxes.forEach(box => box.style.backgroundColor = '');
};

// Identify boxes
const boxes = document.querySelectorAll('.box');

// Draw on mousedown and mouse movement at target element
var mousedown = false;
body.addEventListener('mouseup', ()=>{
    mousedown = false;
})
board.addEventListener('mouseup', ()=>{
    mousedown = false;
})
boxes.forEach(box => addEventListener('mousedown', (event)=>{
    mousedown = true;
    draw(event);
}))
boxes.forEach(box => box.addEventListener('mouseup', ()=>{
    mousedown = false;
}))
boxes.forEach(box => box.addEventListener('mouseover', (event)=>{
    if (mousedown){
        draw(event);
    } else{
        return;
    }
}))


