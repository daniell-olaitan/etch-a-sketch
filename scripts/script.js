function app() {

}

function getNumberOfGrids() {
    let numberOfGrids;

    while (true) {
        numberOfGrids = prompt('Insert the number of grids (maximum of 100)');
        if (typeof numberOfGrids === 'number' && numberOfGrids >= 1 &&
            numberOfGrids <= 100 || numberOfGrids === null) {
            return numberOfGrids;
        }
    }
}

function selectColor(colors) {
}

function toggleGridLine(grids) {
    grids.forEach((grid) => {
        grid.classList.toggle('grid-line');
    });
}

function clearSketchBoard(grids, defaultColor) {
    grids.forEach((grid) => {
        paintGrid(grid, defaultColor);
    });
}

function paintGrid(grid, color) {
    grid.style.backgroundColor = color;
}

function drawGrids(sketchBoard, numberOfGrids, defaultColor) {
    let grid;
    const gridFragment = document.createDocumentFragment();
    const gridDimension = sketchBoard.style.height / numberOfGrids;
    
    for (let i = 0; i < numberOfGrids; i++) {
        for (let j = 0; j < numberOfGrids; j++) {
            grid = document.createElement('div');
            grid.style.backgroundColor = defaultColor;
            grid.style.width = gridDimension;
            grid.style.height = gridDimension;
            gridFragment.appendChild(grid);
        }
    }

    sketchBoard.innerHTML = '';
    sketchBoard.appendChild(gridFragment);

    // placeGrids(sketchBoard, grids);
}

// function createGrids(numberOfGrids, defaultColor) {
//     const fragment = document.createDocumentFragment();
//     let grid;
//     const gridDimension = Math.sqrt(grids.chi
    
//     for (let i = 0; i < numberOfGrids; i++) {
//         for (let j = 0; j < numberOfGrids; j++) {
//             grid = document.createElement('div');
//             grid.style.backgroundColor = defaultColor;
//             fragment.appendChild(grid);
//         }
//     }

//     return fragment;
// }

// function placeGrids(sketchBoard, grids) {
    
    
//     grids.children.forEach((grid) => {
        

// }