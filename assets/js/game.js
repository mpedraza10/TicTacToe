function resetGameStatus() {
    gameIsOver = false;
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span> !';
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gameBoardItem = gameFieldElements[gameBoardIndex];
            gameBoardItem.textContent = '';
            gameBoardItem.classList.remove('disable');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert("Please set custom player name to start a new game!");
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';    
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if (gameIsOver) {
        return;
    }

    const selectedField = event.target
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;
    
    if (gameData[selectedRow][selectedColumn] > 0) {
        alert("Please select and empty field");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disable');
    
    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerId = checkForGameOver();
    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();    
}

function checkForGameOver() {
    // Checking the rows to see if someone won
    for (let i = 0; i < 3; i++) {
        if (
            gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][1] === gameData[i][2]
        ) {        
            return gameData[i][0];
        }
    }    
    // Checking the cols to see if someone won
    for (let i = 0; i < 3; i++) {
        if (
            gameData[0][i] > 0 && 
            gameData[0][i] === gameData[1][i] && 
            gameData[0][i] === gameData[2][i]
        ) {        
            return gameData[0][i];
        }
    }
    // Checking the diagonal top left to bottom right
    if (
        gameData[0][0] > 0 && 
        gameData[0][0] === gameData[1][1] && 
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }
    // Checking the diagonal bottom left to top right
    if (
        gameData[2][0] > 0 && 
        gameData[2][0] === gameData[1][1] && 
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }

    // Check for draw
    if (currentRound === 9) {
        return -1;
    }

    return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = 'block';

    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;        
    } else {
        gameOverElement.firstElementChild.textContent = "It's a draw!";
    }
}