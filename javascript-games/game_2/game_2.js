// --- SELECTORS ---
const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');
const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
const colorBoxContainer = document.querySelector('#colorBoxContainer');
let colorBoxes; // We will select these after they are created

// --- GAME STATE VARIABLES ---
let currentStreak = 0;
let bestStreak = 0;
let pickedColor;
let colors = [];
let numBoxes = 6; // Default to Hard mode
let isGameOver = false;



// --- INITIALIZATION ---
// This function runs when the script loads
function init() {
    loadBestStreak();
    setupModeButtons();
    setupControlButtons();
    resetGame();
}

// Load best streak from localStorage
function loadBestStreak() {
    const temp = localStorage.getItem('highBestStreak');
    if (temp != null) { // Fixed typo: tenp -> temp
        bestStreak = parseInt(temp);
    } else {
        bestStreak = 0;
    }
    displayStreaks();
}

// Update the streak numbers on the page
function displayStreaks() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}

// --- BUTTON/CONTROL SETUP ---
function setupControlButtons() {
    newRoundBtn.addEventListener('click', resetGame);
    resetStreakBtn.addEventListener('click', resetStreaks);
}

function setupModeButtons() {
    easyBtn.addEventListener('click', function() {
        if (numBoxes === 3) return; // Already on Easy
        numBoxes = 3;
        easyBtn.classList.add('selected');
        hardBtn.classList.remove('selected');
        resetGame();
    });

    hardBtn.addEventListener('click', function() {
        if (numBoxes === 6) return; // Already on Hard
        numBoxes = 6;
        hardBtn.classList.add('selected');
        easyBtn.classList.remove('selected');
        resetGame();
    });

    // Set default selected button (Hard)
    hardBtn.classList.add('selected');
}

// --- GAME LOGIC ---

// Resets the game for a new round
function resetGame() {
    isGameOver = false;
    messageDisplay.textContent = "Pick a c// Creates the 3 or 6 color boxes dynamicallolor!";
//     newRoundBtn.textContent = "New Colors";
//
//     // 1. Create the color boxes in HTML
//     setupColorBoxes();
//
//     // 2. Generate new colors
//     colors = generateRandomColors(numBoxes);
//
//     // 3. Pick a winning color from the array
//     pickedColor = pickWinningColor();
//
//     // 4. Update the display with the winning color
//     colorDisplay.textContent = pickedColor;
//
//     // 5. Assign colors and click listeners to boxes
//     colorBoxes.forEach((box, index) => {
//         box.style.backgroundColor = colors[index];
//         box.classList.remove('fade'); // Ensure box is not faded
//         box.addEventListener('click', handleColorClick);
//     });
//
//     displayStreaks();
 }
    function setupColorBoxes() {
        colorBoxContainer.innerHTML = ''; // Clear old boxes

        // Create new boxes
        for (let i = 0; i < numBoxes; i++) {
            const box = document.createElement('div');
            box.classList.add('color-box');
            colorBoxContainer.appendChild(box);
        }

        // Adjust grid layout for Easy mode (3 boxes)
        if (numBoxes === 3) {
            colorBoxContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            // On small screens, this might look better:
            // colorBoxContainer.style.maxWidth = '480px';
        } else {
            colorBoxContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            // colorBoxContainer.style.maxWidth = 'initial';
    }

    // Re-select the newly created boxes
    colorBoxes = document.querySelectorAll('.color-box');
}

// This function runs when a color box is clicked
function handleColorClick(event) {
    if (isGameOver) return; // Stop if game is already won

    const clickedColor = event.target.style.backgroundColor;

    if (clickedColor === pickedColor) {
        // --- WIN ---
        messageDisplay.textContent = "Correct!";
        newRoundBtn.textContent = "Play Again?";
        isGameOver = true;
        changeColorsToWinner(pickedColor);
        updateStreak(true);
    } else {
        // --- LOSE (Try Again) ---
        event.target.classList.add('fade'); // Hide the wrong box
        messageDisplay.textContent = "Try Again";
        updateStreak(false);
    }

    displayStreaks();
}

// --- STREAK LOGIC ---

// Update streaks after a guess
function updateStreak(didWin) {
    if (didWin) {
        currentStreak++;
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
            localStorage.setItem('highBestStreak', bestStreak.toString());
        }
    } else {
        currentStreak = 0;
    }
}

// Reset streaks when "Reset Streak" button is clicked
function resetStreaks() {
    currentStreak = 0;
    bestStreak = 0;
    localStorage.setItem('highBestStreak', '0');
    displayStreaks();
}

// --- HELPER FUNCTIONS ---

// When you win, change all boxes to the winning color
function changeColorsToWinner(color) {
    colorBoxes.forEach(box => {
        box.classList.remove('fade');
        box.style.backgroundColor = color;
    });
}

// Generates one random "rgb(r, g, b)" string
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256); // Fixed typo: Math.radom -> Math.random
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Generates an array of 'num' random colors
function generateRandomColors(num) {
    const arr = [];
    for (let i = 0; i < num; i++) { // Fixed: Infinite loop
        arr.push(generateRandomColor());
    }
    return arr;
}

// Picks one color from the 'colors' array to be the winner
function pickWinningColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

// --- START THE GAME ---
init();