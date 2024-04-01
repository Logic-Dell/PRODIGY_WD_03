const displayStatus = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Output messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

displayStatus.innerHTML = currentPlayerTurn();

const winningConditions = [                                                       
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayStatus.innerHTML = currentPlayerTurn();
}

function results() {
    let won = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            won = true;
            break;
        }
    }

    if(won) {
        displayStatus.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    
    const draw = !gameState.includes("");
    if(draw){
        displayStatus.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
}

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    cellPlayed(clickedCell, clickedCellIndex);
    results();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    displayStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClicked));
document.querySelector('.game-restart').addEventListener('click', restartGame)