//Create a variable to store the current mode
//'b' = black, 'bg' = black gradual and 'm' = multicoloured
let mode = 'b';
//Assign button to variable and add evenet listener
const button = document.querySelector('#new-grid-btn');
button.addEventListener('click', newGrid);
//Assign radio buttons to a variable and add event listener
const radioButtons = document.querySelectorAll("input[type='radio']");
radioButtons.forEach(button => button.addEventListener('click', changeMode));
//Set grid container to a variable
const grid = document.querySelector('.grid-container');
//Create the grid
createGrid(16);


//Create a function that creates a grid with a number of 
//rows and columns equal to gridSize parameter passed
function createGrid(gridSize){
    //Clear grid container
    while (grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
    //Create a number of rows based on gridSize
    for (i=1;i<=gridSize;i++){
        //Create a row based on gridSize and append it to the grid
        createRow(gridSize);
    }
}

//Create a function that creates a row with a number of 
//grid squares based on gridSize
function createRow(gridSize){
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

//Create a function that returns a colour value as a string
function getColour(currentColour){
    //Switch mode and return the appropriate colour
    switch(mode){
        case 'b': //Black mode - return black
            return 'rgba(0, 0, 0)';
        case 'bg':
            //Return currentColour if colour is already opaque black 
            if (currentColour === 'rgb(0, 0, 0)') return currentColour;
            //Other wise get array of rbga values of background
            let rgbaArray = currentColour.split(',');
            //If the length is not 4 then there is no alpha value, so it is white or multicoloured,
            //so return faintest black
            if (rgbaArray.length < 4){
                return 'rgba(0, 0, 0, .1)';
            } //Otherwise increment the alpha value by .1
            else{  
                //Manipulate the array to get the alpha value as a number
                let alphaValue = parseFloat(rgbaArray[3].split('').splice(2,2).join(''));
                //Increment the alpha value by 10%
                alphaValue += 0.1;
                //Return black with new alpha value
                return `rgba(0, 0, 0, ${alphaValue})`;
            }
        case 'm': //Multicoloured mode - chose colour at random
            const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return (`rgba(${red}, ${green}, ${blue})`);
    }
}

//Create a callback function that is activated when the mouse hovers over
//a grid square
function onHover(){
    this.style.background = getColour(this.style.background);
}

//Create a callback function that is activated when the button is clicked
//and prompts the user for a grid size and uses this to create a new grid.
function newGrid(){
    let gridSize = parseInt(prompt('Please enter new grid size.\n (1-100)', '16'));
    //End function if the input is NaN.
    if (isNaN(gridSize)) {
        return;
    }
    else if (gridSize < 1) gridSize = 1;
    else if (gridSize > 100) gridSize = 100;
    createGrid(gridSize);
}

//Create a callback function to change the mode when the radio buttons are clicked
function changeMode(){
    mode = this.value;
}
