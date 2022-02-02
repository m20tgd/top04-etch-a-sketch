//Create a variable to store the number of rows and columns
let gridSize = 16;
//Set grid container to a variable
const grid = document.querySelector('.grid-container');
//Create the grid
createGrid();


//Create a function that creates a grid with a number of 
//rows and columns equal to gridSize
function createGrid(){
    //Create a number of rows based on gridSize
    for (i=1;i<=gridSize;i++){
        //Create a row based on gridSize and append it to the grid
        createRow();
    }
}

//Create a function that creates a row with a number of 
//grid squares based on gridSize
function createRow(){
    //Create new row
    const row = document.createElement('div');
    row.classList.add('grid-row');
    //Create a number of grid squares based on grid size and append to row
    for (j=1;j<=gridSize;j++){
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.addEventListener('mouseover', onHover);
        row.appendChild(square);
    }
    grid.appendChild(row);
}

//Create a callback function that is activated when the mouse hovers over
//a grid square
function onHover(){
    console.log('Hey!');
    this.style.background = 'black';
}


