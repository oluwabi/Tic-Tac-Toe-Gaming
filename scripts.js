const board_el = document.querySelector('#board');
const cell_el = document.querySelectorAll('#board .cell');
const winRolls = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentTurn;

const winningText = document.querySelector('[outcomeMessage]');
const winningMessageElement = document.getElementById('gameMessage');
const restartButton = document.getElementById('restartButton');

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    board_el.classList.remove('turn-x', 'turn-o');

    for (let cell of cell_el) {
        cell.classList.remove('x', 'o');
        // putting the condition that makes you click only once in each cell
        cell.addEventListener('click', fillCell, { once: true });
    }

    // creating the random turn selection either x or o if the random is above 0.5 it is x otherwise it will be o turn
    currentTurn = Math.round(Math.random(0, 1)) == 1 ? 'x' : 'o';
    board_el.classList.add('turn-' + currentTurn);
    winningMessageElement.classList.remove('show')
}

function fillCell() {
    this.classList.add(currentTurn);

    if (checkWin()) {
        const restart = winningText.innerText = currentTurn.toUpperCase() + "is the winner!";

        if (restart) startGame();
        winningMessageElement.classList.add('show');
    } else if (checkForDraw()) {
        const restart = winningText.innerText ="its a draw!";

        if (restart) startGame();
        winningMessageElement.classList.add('show');
    } else {
        currentTurn = currentTurn == 'x' ? 'o' : 'x';
        board_el.classList.remove('turn-o', 'turn-x');
        board_el.classList.add('turn-' + currentTurn);
        
    }
    
}

function checkWin() {
    return winRolls.some(winRolls => {
        return winRolls.every(w => {
            if (cell_el[w].classList.contains(currentTurn)) {
                return true;
            }

            return false;
        });
    });
}

function checkForDraw() {
    return [...cell_el].every(w => {
        if (
            w.classList.contains('x') ||
            w.classList.contains('o')
        ) {
            return true;
        }

        return false;
    });
}