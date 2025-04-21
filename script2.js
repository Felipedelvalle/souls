// Game variables
let score = 0;
let moleInterval;
let gameOver = false;
let holes = [];
let totalMoles = 9;
let moleSpeed = 1499; // Slower for easier game
let gameDuration = 30; // 30 seconds for the game
let countdownInterval;
let timerInterval;

// Select DOM elements
const startPopup = document.getElementById("startPopup");
const gameContent = document.getElementById("gameContent");
const scoreDisplay = document.getElementById("score");
const gameOverPopup = document.getElementById("gameOverPopup");
const finalScoreDisplay = document.getElementById("finalScore");
const backgroundMusic = document.getElementById("backgroundMusic");
const grid = document.getElementById("grid");
const playSound = new Audio('sounds/play2.wav'); // Game finish sound
const timerProgress = document.getElementById("timerProgress");
const countdownImgs = {
    3: document.getElementById("countdown3"),
    2: document.getElementById("countdown2"),
    1: document.getElementById("countdown1"),
    go: document.getElementById("countdownGo")
};

// Select buttons for hover and click effects
const playAgainButton = document.getElementById("playAgainButton");
const goToSiteButton = document.getElementById("goToSiteButton");
const hoverSound = new Audio('sounds/hover.mp3');
const clickSound = new Audio('sounds/click.mp3');

// Set up holes
for (let i = 1; i <= totalMoles; i++) {
    let hole = document.createElement("div");
    hole.classList.add("hole");
    hole.id = `hole${i}`;
    grid.appendChild(hole);
    holes.push(hole);
}

// Play hover sound on button hover
playAgainButton.onmouseover = goToSiteButton.onmouseover = function () {
    hoverSound.play();
};

// Play click sound on button click
playAgainButton.onmousedown = goToSiteButton.onmousedown = function () {
    clickSound.play();
};

// Start the game when clicking on the popup
startPopup.addEventListener("click", () => {
    clickSound.play();
    startGame();
});

// Start the game
function startGame() {
    // Hide the fade-in screen and show game content
    document.getElementById("fadeInScreen").style.display = "none";
    gameContent.style.display = "block";

    // Start background music
    backgroundMusic.play();

    // Start countdown
    startCountdown();

    // Hide the game over popup (if it was visible from the last round)
    gameOverPopup.style.display = "none";

    // Reset score
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Start countdown sequence
function startCountdown() {
    let count = 3;
    countdownImgs[3].style.display = "block";
    countdownInterval = setInterval(() => {
        countdownImgs[count].style.display = "none"; // Hide the current number
        count--;

        if (count > 0) {
            countdownImgs[count].style.display = "block"; // Show next number
        } else if (count === 0) {
            countdownImgs["go"].style.display = "block"; // Show "GO!"
            clearInterval(countdownInterval);
            startMolePopping(); // Start the game after countdown
            startTimer(); // Start the game timer
        }
    }, 1000);
}

// Start the timer bar
function startTimer() {
    let timeLeft = gameDuration;
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            timeLeft--;
            timerProgress.style.width = `${(timeLeft / gameDuration) * 100}%`;
        }
    }, 1000);
}

// Start the mole popping logic
function startMolePopping() {
    moleInterval = setInterval(() => {
        let molesToPop = Math.floor(Math.random() * 8) + 4; // Pop 2 to 8 moles randomly
        let poppedMoles = [];
        for (let i = 0; i < molesToPop; i++) {
            let randomHole = Math.floor(Math.random() * holes.length);
            let mole = holes[randomHole].querySelector('.mole');
            if (!mole) {
                mole = document.createElement("div");
                mole.classList.add("mole");
                holes[randomHole].appendChild(mole);
            }

            // Reset mole's clicked state each time it pops up
            mole.clicked = false;
            mole.style.display = "block";
            poppedMoles.push(mole);

            mole.onclick = () => {
                if (!mole.clicked) { // Check if the mole has not been clicked yet
                    hitMole(mole); // Mole hit
                    mole.clicked = true; // Mark the mole as clicked
                }
            };
        }

        // Hide the moles after a random time
        setTimeout(() => {
            poppedMoles.forEach(mole => {
                mole.style.display = "none";
                mole.clicked = false; // Reset clicked state when mole goes down
            });
        }, moleSpeed);
    }, 1500); // Pop moles every 2 seconds.
}

// Hit mole function
function hitMole(mole) {
    // Increase score
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;

    // Play hit sound for each mole hit
    let hitSoundInstance = new Audio('sounds/hit.wav');
    hitSoundInstance.play();

    // === Particle burst effect ===
    const particle = document.createElement('div');
    particle.classList.add('particle-effect');

    // Position particle relative to the mole's parent (.hole)
    const rect = mole.getBoundingClientRect();
    const parentRect = mole.parentElement.getBoundingClientRect();
    const offsetX = rect.left - parentRect.left;
    const offsetY = rect.top - parentRect.top;

    particle.style.left = `${offsetX + mole.offsetWidth / 2 - 30}px`;
    particle.style.top = `${offsetY + mole.offsetHeight / 2 - 30}px`;

    mole.parentElement.appendChild(particle);

    // Remove particle after animation (0.5s)
    setTimeout(() => {
        particle.remove();
    }, 500);

    // Reset mole animation and slide it down
    mole.style.animation = "none";
    setTimeout(() => {
        mole.style.display = "none";
        mole.style.animation = "slideUpDown 1s ease-in-out forwards";
    }, 10);
}


// End the game
function endGame() {
    gameOver = true;
    clearInterval(moleInterval);
    playSound.play(); // Play end sound

    // Show game over popup
    gameOverPopup.style.display = "block";
    finalScoreDisplay.textContent = `Final Score: ${score}`;

    // Trigger confetti
    triggerConfetti();
}

// Trigger confetti effect
function triggerConfetti() {
    // Simple confetti using JS
    const confettiContainer = document.createElement('div');
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 200; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.style.position = 'absolute';
        confettiPiece.style.width = '10px';
        confettiPiece.style.height = '10px';
        confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiPiece.style.top = `${Math.random() * window.innerHeight}px`;
        confettiPiece.style.left = `${Math.random() * window.innerWidth}px`;
        confettiPiece.style.animation = `confettiAnimation ${Math.random() * 2 + 3}s infinite`;
        confettiContainer.appendChild(confettiPiece);
    }
}

// Handle playAgainButton click (reload the page)
playAgainButton.addEventListener("click", () => {
  window.location.reload(); // Reloads the page completely
});

// Handle go to site button with fade-out effect
goToSiteButton.addEventListener("click", () => {
  // Apply fade-out effect to the game content
  gameContent.classList.add('fade-out');  // This will fade out the game content
  gameOverPopup.classList.add('fade-out');  // This will fade out the game content
  
  // Wait for the fade-out transition to finish before redirecting
  setTimeout(() => {
      window.location.href = "index.html"; // Replace with your credits site URL
  }, 2000);
});

// Set the default cursor as hammer.png for the body (already set in CSS)
document.body.style.cursor = "url('hammer.png') 16 93, auto"; 

// On mouse down, change the cursor to hammer2.png
document.body.addEventListener("mousedown", function() {
    document.body.style.cursor = "url('hammer2.png') 16 93, auto"; 
});

// On mouse up, revert back to hammer.png
document.body.addEventListener("mouseup", function() {
    document.body.style.cursor = "url('hammer.png') 16 93, auto"; 
});

document.addEventListener("DOMContentLoaded", function() {
  // Log all the elements with position 'absolute' or 'fixed'
  const elements = document.querySelectorAll("*");
  elements.forEach(element => {
      const style = window.getComputedStyle(element);
      if (style.position === "absolute" || style.position === "fixed") {
          console.log("Overlay detected:", element);
      }
  });
});

// Set the default cursor for the body and game content area
document.body.style.cursor = "url('hammer.png') 16 93, auto";

// On mouse down, change the cursor to hammer2.png
document.addEventListener("mousedown", function() {
    document.body.style.cursor = "url('hammer2.png') 16 93, auto"; 
});

// On mouse up, revert back to hammer.png
document.addEventListener("mouseup", function() {
    document.body.style.cursor = "url('hammer.png') 16 93, auto"; 
});

