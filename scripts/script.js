function app() {
    const sketchBoard = document.querySelector('#sketch-board');
    const sketchBoardStyle = getComputedStyle(sketchBoard);
    const menu = document.querySelector('#menu');
    const colorPalette = document.querySelector('#set-color-btn');
    const defaultGridColor = sketchBoardStyle.backgroundColor;
    let numberOfGrids = 16;
    let activeButton;
    const gridColor = {
        name: 'plain',
        color: colorPalette.value
    };

    drawGrids(sketchBoard, numberOfGrids, defaultGridColor);
    sketchBoard.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('grid')) {
            paintGrid(event.target, gridColor);
        }
    });

    menu.addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'grid-number-btn':
                deactivateButton(activeButton);
                numberOfGrids = getNumberOfGrids();
                if (numberOfGrids === null) {
                    break;
                }
                
                drawGrids(sketchBoard, numberOfGrids, defaultGridColor);
                break;

            case 'rainbow-btn':
                deactivateButton(activeButton);
                gridColor.name = 'rainbow';
                gridColor.value = 0;
                gridColor.color = ['#e81416', '#ffa500', '#faeb36',
                        '#79c314', '#487de7', '#4b369d', '#70369d'
                    ];

                event.target.classList.add('selected-btn');
                activeButton = event.target;
                break;

            case 'clear-btn':
                clearSketchBoard(sketchBoard.children, defaultGridColor, gridColor);
                break;

            case 'eraser-btn':
                deactivateButton(activeButton);
                gridColor.name = 'plain';
                gridColor.color = defaultGridColor

                event.target.classList.add('selected-btn');
                activeButton = event.target;
                break;

            case 'gridline-toggle-btn':
                toggleGridLine(sketchBoard.children);
                break;
        }
    });

    colorPalette.addEventListener('input', (event) => {
        deactivateButton(activeButton);
        gridColor.name = 'plain';
        gridColor.color = event.target.value;
    });
}

function getNumberOfGrids() {
    let numberOfGrids;

    while (true) {
        const userInput = prompt('Insert the number of grids (maximum of 100)');

        if (userInput === null) {
            return null;
        }
        
        numberOfGrids = parseInt(userInput);
        if (typeof numberOfGrids === 'number' && !isNaN(numberOfGrids) && 
            numberOfGrids >= 1 && numberOfGrids <= 100 || numberOfGrids) {
            return numberOfGrids;
        }
    }
}

function toggleGridLine(grids) {
    Array.from(grids).forEach((grid) => {
        grid.classList.toggle('grid-line');
    });
}

function clearSketchBoard(grids, defaultGridColor, gridColor) {
    const color = gridColor.color;
    const name = gridColor.name;
    
    gridColor.name = 'plain';
    gridColor.color = defaultGridColor;
    
    Array.from(grids).forEach((grid) => {
        paintGrid(grid, gridColor);
    });

    gridColor.name = name;
    gridColor.color = color;
}

function paintGrid(grid, gridColor) {
    if (gridColor.name === 'plain') {
        grid.style.backgroundColor = gridColor.color;
    } else {
        grid.style.backgroundColor = gridColor.color[gridColor.value];
        if (gridColor.value === 6) {
            gridColor.value = 0;
        } else {
            gridColor.value++;
        }
    }
}

function drawGrids(sketchBoard, numberOfGrids, defaultGridColor) {
    let grid;
    const gridFragment = document.createDocumentFragment();
    const gridDimension = sketchBoard.offsetHeight / numberOfGrids;
    
    for (let i = 0; i < numberOfGrids; i++) {
        for (let j = 0; j < numberOfGrids; j++) {
            grid = document.createElement('div');
            grid.style.backgroundColor = defaultGridColor;
            grid.style.width = gridDimension + 'px';
            grid.style.height = gridDimension + 'px';
            grid.className = 'grid';
            gridFragment.appendChild(grid);
        }
    }

    sketchBoard.innerHTML = '';
    sketchBoard.appendChild(gridFragment);
}

function deactivateButton(activeButton) {
    if (activeButton && activeButton.classList.contains('selected-btn')) {
        activeButton.classList.remove('selected-btn');
    }
}

app();