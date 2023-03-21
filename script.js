document.addEventListener('DOMContentLoaded', function () {
    // define constants
    const board = document.getElementById('game-board');
    // var ctx = board.getContext("2d");
    const block = this.getElementById('block');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('start-button');
    let score = 0;
    let boardState = [];
    let currentPiece = null;
    let currentPieceType = null;
    let rotationNumber = null;
    let currentPieceX = null;
    let currentPieceY = null;
    let intervalId = null;

    let pieceColor = 'blue';

    const boardHeight = 20;
    const boardWidth = 10;
    board.width = 240;
    board.height = 480;
    const canvasHeight = parseInt(window.getComputedStyle(board).height);
    const canvasWidth = parseInt(window.getComputedStyle(board).width);
    const blockHeight = (canvasHeight / boardHeight);
    const blockWidth = (canvasWidth / boardWidth);
    // block.width = blockWidth;
    // block.height = blockHeight;

    const completedRowScore = 50;
    const tetris = 400;
    const speed = 1000;

    console.log(board.width);
    console.log(board.height);
    // console.log(block.width);
    // console.log(block.height);




    // Define the tetromino shapes and their rotations
    const tetrominoes = {
        I: [
            [
                [1, 1, 1, 1]
            ],
            [
                [1],
                [1],
                [1],
                [1]
            ]
        ],
        I: [
            [
                [1, 1, 1, 1]
            ],
            [
                [1],
                [1],
                [1],
                [1]
            ]
        ],
        O: [
            [
                [1, 1],
                [1, 1]
            ]
        ],
        T: [
            [
                [0, 1, 0],
                [1, 1, 1]
            ],
            [
                [1, 0],
                [1, 1],
                [1, 0]
            ],
            [
                [1, 1, 1],
                [0, 1, 0]
            ],
            [
                [0, 1],
                [1, 1],
                [0, 1]
            ]

        ],
        S: [
            [
                [0, 1, 1],
                [1, 1, 0]
            ],
            [
                [1, 0],
                [1, 1],
                [0, 1]
            ]
        ],
        Z: [
            [
                [1, 1, 0],
                [0, 1, 1]
            ],
            [
                [0, 1],
                [1, 1],
                [1, 0]
            ]
        ],
        J: [
            [
                [1, 0, 0],
                [1, 1, 1]
            ],
            [
                [1, 1],
                [1, 0],
                [1, 0]
            ],
            [
                [1, 1, 1],
                [0, 0, 1]
            ],
            [
                [0, 1],
                [0, 1],
                [1, 1]
            ]
        ],
        L: [
            [
                [0, 0, 1],
                [1, 1, 1]
            ],
            [
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            [
                [1, 1, 1],
                [1, 0, 0]
            ],
            [
                [1, 1],
                [0, 1],
                [0, 1]
            ]
        ]
    };


    // Generate a new tetromino piece
    function newPiece() {
        console.log('New piece');
        const types = Object.keys(tetrominoes);
        const type = types[Math.floor(Math.random() * types.length)];
        console.log('type : ' + type);
        const rotations = tetrominoes[type];
        rotationNumber = Math.floor(Math.random() * rotations.length);
        const rotation = rotations[rotationNumber];
        console.table('CurrentPiece/rotation : ' + rotation);
        currentPieceType = type;
        currentPiece = rotation;
        currentPieceX = Math.floor((boardWidth - currentPiece[0].length) / 2);
        currentPieceY = 0;
        /* switch (type) {
            case 'I':
                pieceColor = 'cyan';
                break;
            case 'O':
                pieceColor = 'yellow';
                break;
            case 'T':
                pieceColor = 'purple';
                break;
            case 'S':
                pieceColor = 'green';
                break;
            case 'Z':
                pieceColor = 'red';
                break;
            case 'J':
                pieceColor = 'blue';
                break;
            case 'L':
                pieceColor = 'orange';
                break;
        } */

        // drawPiece();
    }

    /* function drawPiece() {
        currentPiece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = currentPieceType.backgroundColor;
                    // ctx.fillStyle = currentPiece.color;
                    ctx.fillRect(
                        (currentPiece.x + x) * boardHeight,
                        (currentPiece.y + y) * boardHeight,
                        boardHeight,
                        boardHeight
                    );
                }
            });
        });
    } */

    // Add the current piece to the board
    function addPieceToBoard() {
        console.log('addPieceToBoard')
        for (let row = 0; row < currentPiece.length; row++) {
            for (let col = 0; col < currentPiece[row].length; col++) {
                if (currentPiece[row][col]) {
                    boardState[currentPieceY + row][currentPieceX + col] = currentPieceType;
                }
            }
        }
    }

    // Draw the board based on its current state
    function drawBoard() {
        console.log('draw Board');
        // ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear the canvas
        let html = '';

        for (let row = 0; row < boardHeight; row++) {
            for (let col = 0; col < boardWidth; col++) {
                const value = boardState[row][col];
                const className = value ? `block ${value} tetromino` : 'block';
                html += `<div class="${className}"></div>`;
                // html += `<div class="${className}" style="top: ${row * (blockHeight)}px; left: ${col * (blockWidth)}px;"></div>`;

                /* if (value) {
                    console.log(canvasWidth);
                    console.log(canvasHeight);
                    console.log(blockHeight);
                    console.log(blockWidth);
                    
                    
                    // setBlockColor()
                    ctx.fillStyle = pieceColor;
                    ctx.fillRect(col * blockWidth, row * blockHeight, blockWidth, blockHeight); // draw a rectangle);
                    ctx.strokeStyle = 'black';
                    ctx.strokeRect(col * blockWidth, row * blockHeight, blockWidth, blockHeight); 
                }*/


            }
        }
        board.innerHTML = html;
        console.table(boardState);
    }



    // Remove the current piece from the board
    function removePieceFromBoard() {
        for (let row = 0; row < currentPiece.length; row++) {
            for (let col = 0; col < currentPiece[row].length; col++) {
                if (currentPiece[row][col]) {
                    boardState[currentPieceY + row][currentPieceX + col] = null;
                }
            }
        }
    }



    function checkForCompletedRows() {
        let completeRows = 0;
        for (let y = boardState.length - 1; y >= 0; y--) {
            let rowFilled = true;
            for (let x = 0; x < boardState[y].length; x++) {
                if (boardState[y][x] === null) {
                    rowFilled = false;
                    break;
                }
            }
            if (rowFilled) {
                boardState.splice(y, 1);
                boardState.unshift(new Array(boardWidth).fill(null));
                completeRows++;
                y++;
            }
        }
        if (completeRows > 0) {

            if (completeRows === 4) {
                console.log('Tetris !');
                score += tetris;
            } else {
                console.log(`${completeRows} completed ` + completeRows > 1 ? `rows` : `row`);
                score += completeRows * completedRowScore;
            }
            scoreElement.innerText = `Score: ${score}`;
        }
    }

    // Check if a piece collides with the board or other pieces
    function collidesWithBoard(piece, x, y) {
        for (let row = 0; row < piece.length; row++) {
            for (let col = 0; col < piece[row].length; col++) {
                if (piece[row][col]) {
                    const boardX = x + col;
                    const boardY = y + row;
                    if (boardX < 0 || boardX >= boardWidth || boardY < 0 || boardY >= boardHeight || boardState[boardY][boardX]) {
                        console.log('Collides with board');
                        return true;
                    }
                }
            }
        }
        return false;
    }

    //Drop the piece to the lowest row possible
    function dropPiece() {

        /* let lowestY = 0;
        for (let y = 0; y < currentPiece.length; y++) {
            for (let x = 0; x < currentPiece[y].length; x++) {
                if (currentPiece[y][x]) {
                    let pieceY = currentPieceY + y;
                    while (pieceY + 1 < boardState.length && !boardState[pieceY + 1][currentPieceX + x]) {
                        pieceY++;
                    }
                    let distance = pieceY - currentPieceY;
                    if (distance > lowestY) {
                        lowestY = distance;
                    }
                }
            }
        }
        currentPieceY += lowestY;
        */
        removePieceFromBoard();
        while (!collidesWithBoard(currentPiece, currentPieceX, currentPieceY)) {
            currentPieceY++;
        }

        if (collidesWithBoard(currentPiece, currentPieceX, currentPieceY)) {
            currentPieceY--;
        }

        addPieceToBoard();
        drawBoard();
    }

    // Move the current piece down by one row
    function movePieceDown() {
        removePieceFromBoard();
        currentPieceY++;
        if (collidesWithBoard(currentPiece, currentPieceX, currentPieceY)) {
            currentPieceY--;
            addPieceToBoard();
            newPiece();
            checkForCompletedRows();
            // addPieceToBoard();
        }

        addPieceToBoard();
        drawBoard();
    }

    // Move the current piece left by one column
    function movePieceLeft() {
        removePieceFromBoard();
        currentPieceX--;
        if (collidesWithBoard(currentPiece, currentPieceX, currentPieceY)) {
            currentPieceX++;
        }
        addPieceToBoard();
        drawBoard();
    }
    // Move the current piece right by one column
    function movePieceRight() {
        removePieceFromBoard();
        currentPieceX++;
        if (collidesWithBoard(currentPiece, currentPieceX, currentPieceY)) {
            currentPieceX--;
        }
        addPieceToBoard();
        drawBoard();
    }

    // Rotate the current piece clockwise
    function rotatePieceClockwise() {
        removePieceFromBoard();
        let rotatedPiece = [];

        /* for (let col = 0; col < currentPiece[0].length; col++) {
            const newRow = [];
            for (let row = currentPiece.length - 1; row >= 0; row--) {
                newRow.push(currentPiece[row][col]);
            }
            rotatedPiece.push(newRow);
        } */
        console.log(rotationNumber + '/' + (tetrominoes[currentPieceType].length - 1));

        if (rotationNumber < (tetrominoes[currentPieceType].length - 1)) {
            console.log('possible');
            rotationNumber++;
            rotatedPiece = tetrominoes[currentPieceType][rotationNumber]
        } else {
            console.log('impossible');
            rotationNumber = 0;
            rotatedPiece = tetrominoes[currentPieceType][rotationNumber]
        };

        console.log('rotatedPiece : ' + rotatedPiece);
        if (!collidesWithBoard(rotatedPiece, currentPieceX, currentPieceY)) {
            currentPiece = rotatedPiece;
        }
        addPieceToBoard();
        drawBoard();
    }

    // Handle key events for moving and rotating the current piece
    document.addEventListener('keydown', event => {
        if (event.code === 'ArrowLeft') {
            movePieceLeft();
        } else if (event.code === 'ArrowRight') {
            movePieceRight();
        } else if (event.code === 'ArrowDown') {
            movePieceDown();
        } else if (event.code === 'KeyW') {
            rotatePieceClockwise();
        } else if (event.code === 'ArrowUp') {
            dropPiece();
        }
    });

    startButton.addEventListener('click', startGame);

    // Start the game
    function startGame() {
        console.log('Game starts');
        // startButton.removeEventListener('click', startGame);
        score = 0;
        scoreElement.innerText = `Score: ${score}`;
        boardState = new Array(boardHeight).fill().map(() => new Array(boardWidth).fill(null));
        newPiece();
        drawBoard();
        let currentSpeed = speed;
        intervalId = setInterval(movePieceDown, currentSpeed);
        setInterval(currentSpeed += speed/10, 5000);
    }

});