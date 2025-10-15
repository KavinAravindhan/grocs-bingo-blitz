// Game State
const gameState = {
    calledNumbers: [],
    allNumbers: Array.from({ length: 75 }, (_, i) => i + 1),
    currentCall: null,
    previousCall: null,
    gameStarted: false,
    callHistory: [],
    isEnding: false
};

// Column ranges for BINGO
const COLUMN_RANGES = {
    B: { min: 1, max: 15, index: 0 },
    I: { min: 16, max: 30, index: 1 },
    N: { min: 31, max: 45, index: 2 },
    G: { min: 46, max: 60, index: 3 },
    O: { min: 61, max: 75, index: 4 }
};

// Get letter for number
function getLetterForNumber(num) {
    if (num >= 1 && num <= 15) return 'B';
    if (num >= 16 && num <= 30) return 'I';
    if (num >= 31 && num <= 45) return 'N';
    if (num >= 46 && num <= 60) return 'G';
    if (num >= 61 && num <= 75) return 'O';
    return '';
}

// Get color class for letter
function getColorClass(letter) {
    return `color-${letter.toLowerCase()}`;
}

// Update game status
function updateGameStatus() {
    const statusElement = document.getElementById('gameStatus');
    const remaining = 75 - gameState.calledNumbers.length;
    
    if (!gameState.gameStarted) {
        statusElement.textContent = 'Ready';
        statusElement.style.color = '#1e9bd6';
    } else if (remaining === 0) {
        statusElement.textContent = 'Complete!';
        statusElement.style.color = '#4caf50';
    } else if (remaining <= 10) {
        statusElement.textContent = 'Final Numbers!';
        statusElement.style.color = '#ff9800';
    } else {
        statusElement.textContent = 'In Progress';
        statusElement.style.color = '#4caf50';
    }
}

// Generate Master Board
function generateMasterBoard() {
    const boardElement = document.getElementById('masterBoard');
    boardElement.innerHTML = '';
    
    for (let i = 1; i <= 75; i++) {
        const cell = document.createElement('div');
        cell.className = 'master-number';
        cell.textContent = i;
        cell.dataset.number = i;
        
        if (gameState.calledNumbers.includes(i)) {
            cell.classList.add('called');
        }
        
        boardElement.appendChild(cell);
    }
}

// Call next number
function callNextNumber() {
    if (gameState.isEnding) return;
    
    const uncalledNumbers = gameState.allNumbers.filter(
        num => !gameState.calledNumbers.includes(num)
    );
    
    if (uncalledNumbers.length === 0) {
        document.getElementById('gameStatus').textContent = 'Complete!';
        document.getElementById('gameStatus').style.color = '#4caf50';
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * uncalledNumbers.length);
    const calledNumber = uncalledNumbers[randomIndex];
    
    gameState.previousCall = gameState.currentCall;
    gameState.currentCall = calledNumber;
    gameState.calledNumbers.push(calledNumber);
    gameState.callHistory.unshift(calledNumber);
    
    // Keep only last 5 in history
    if (gameState.callHistory.length > 5) {
        gameState.callHistory = gameState.callHistory.slice(0, 5);
    }
    
    updateDisplay();
    
    // Animate
    if (window.animateNumberCall) {
        animateNumberCall(calledNumber);
    }
}

// Update Display
function updateDisplay() {
    // Update counters
    document.getElementById('totalCalls').textContent = gameState.calledNumbers.length;
    document.getElementById('previousCall').textContent = 
        gameState.previousCall ? gameState.previousCall : '-';
    
    // Update remaining numbers
    const remaining = 75 - gameState.calledNumbers.length;
    document.getElementById('remainingNumbers').textContent = remaining;
    
    // Update game status
    updateGameStatus();
    
    // Update current call ball
    if (gameState.currentCall) {
        const letter = getLetterForNumber(gameState.currentCall);
        const colorClass = getColorClass(letter);
        
        document.getElementById('ballLetter').textContent = letter;
        document.getElementById('ballNumber').textContent = gameState.currentCall;
        
        const ball = document.getElementById('currentCallBall');
        ball.className = 'current-call-ball ' + colorClass;
    }
    
    // Update master board
    const masterCells = document.querySelectorAll('.master-number');
    masterCells.forEach(cell => {
        const num = parseInt(cell.dataset.number);
        if (gameState.calledNumbers.includes(num)) {
            cell.classList.add('called');
        } else {
            cell.classList.remove('called');
        }
    });
    
    // Update history
    renderHistory();
}

// Render History Balls
function renderHistory() {
    const historyElement = document.getElementById('historyBalls');
    historyElement.innerHTML = '';
    
    gameState.callHistory.forEach(num => {
        const ball = document.createElement('div');
        const letter = getLetterForNumber(num);
        const colorClass = getColorClass(letter);
        
        ball.className = 'history-ball ' + colorClass;
        ball.innerHTML = `
            <div class="history-ball-letter">${letter}</div>
            <div class="history-ball-number">${num}</div>
        `;
        
        historyElement.appendChild(ball);
    });
}

// Start Game
function startGame() {
    gameState.gameStarted = true;
    gameState.calledNumbers = [];
    gameState.currentCall = null;
    gameState.previousCall = null;
    gameState.callHistory = [];
    gameState.isEnding = false;
    
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('resetBtn').style.display = 'block';
    document.getElementById('endBtn').style.display = 'block';
    // Dock
    document.getElementById('startBtnDock').style.display = 'none';
    document.getElementById('nextBtnDock').style.display = 'block';
    document.getElementById('resetBtnDock').style.display = 'block';
    document.getElementById('endBtnDock').style.display = 'block';
    
    generateMasterBoard();
    updateDisplay();
    
    // Start game animation
    if (window.animateGameStart) {
        animateGameStart();
    }
}

// Reset Board
function resetBoard() {
    if (confirm('Reset the board? This will clear all called numbers.')) {
        gameState.calledNumbers = [];
        gameState.currentCall = null;
        gameState.previousCall = null;
        gameState.callHistory = [];
        gameState.gameStarted = false;
        gameState.isEnding = false;
        
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none';
        document.getElementById('endBtn').style.display = 'none';
        // Dock
        document.getElementById('startBtnDock').style.display = 'block';
        document.getElementById('nextBtnDock').style.display = 'none';
        document.getElementById('resetBtnDock').style.display = 'none';
        document.getElementById('endBtnDock').style.display = 'none';
        
        // Clear ball display
        document.getElementById('ballLetter').textContent = '';
        document.getElementById('ballNumber').textContent = '';
        document.getElementById('currentCallBall').className = 'current-call-ball';
        
        // Reset master board and counters
        generateMasterBoard();
        updateDisplay();
    }
}

// End Game with Confetti
async function endGame() {
    if (!gameState.gameStarted || gameState.isEnding) return;
    
    gameState.isEnding = true;
    
    // Trigger celebration animation
    if (window.celebrateEndGame) {
        await celebrateEndGame();
    }
    
    // Wait a bit for confetti to finish
    setTimeout(() => {
        // Reset everything
        gameState.calledNumbers = [];
        gameState.currentCall = null;
        gameState.previousCall = null;
        gameState.callHistory = [];
        gameState.gameStarted = false;
        gameState.isEnding = false;
        
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none';
        document.getElementById('endBtn').style.display = 'none';
        // Dock
        document.getElementById('startBtnDock').style.display = 'block';
        document.getElementById('nextBtnDock').style.display = 'none';
        document.getElementById('resetBtnDock').style.display = 'none';
        document.getElementById('endBtnDock').style.display = 'none';
        
        // Clear ball display
        document.getElementById('ballLetter').textContent = '';
        document.getElementById('ballNumber').textContent = '';
        document.getElementById('currentCallBall').className = 'current-call-ball';
        
        // Reset master board and counters
        generateMasterBoard();
        updateDisplay();
    }, 4000); // Wait 4 seconds for confetti to finish
}

// Check if logo exists
function checkLogo() {
    const logoImg = document.getElementById('logoImg');
    logoImg.onerror = function() {
        // Logo doesn't exist, hide it
        this.style.display = 'none';
    };
    logoImg.onload = function() {
        // Logo exists, show it
        this.style.display = 'block';
    };
    logoImg.src = 'logo.svg';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateMasterBoard();
    updateDisplay();
    
    // Check for logo
    checkLogo();
    
    // Event listeners
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('nextBtn').addEventListener('click', callNextNumber);
    document.getElementById('resetBtn').addEventListener('click', resetBoard);
    document.getElementById('endBtn').addEventListener('click', endGame);
    // Dock buttons
    document.getElementById('startBtnDock').addEventListener('click', startGame);
    document.getElementById('nextBtnDock').addEventListener('click', callNextNumber);
    document.getElementById('resetBtnDock').addEventListener('click', resetBoard);
    document.getElementById('endBtnDock').addEventListener('click', endGame);
    
    // Click ball to call number
    document.getElementById('currentCallBall').addEventListener('click', () => {
        if (gameState.gameStarted && !gameState.isEnding) {
            callNextNumber();
        }
    });
    
    // Show history
    document.getElementById('showHistory').addEventListener('click', () => {
        if (gameState.callHistory.length > 0) {
            const historyText = gameState.callHistory
                .map(num => `${getLetterForNumber(num)}-${num}`)
                .join(', ');
            alert('Call History:\n' + historyText);
        } else {
            alert('No call history yet!');
        }
    });
});

