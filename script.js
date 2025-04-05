const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();
const weedImg = new Image();
img.src = 'title.png'; // Path to the background image
weedImg.src = 'weed.png'; // Path to the tumbleweed image

// Variables to store the tumbleweed's state
let tumbleweeds = [];
let tumbleweedSpeed = 2;  // Speed at which the tumbleweed rolls
let tumbleweedTimer = 0;  // Timer to control the delay before a new tumbleweed appears

// Wait until the background image is loaded
img.onload = function() {
  // Resize canvas to maintain 16:10 aspect ratio
  resizeCanvas();
  draw();
};

// Wait until the tumbleweed image is loaded
weedImg.onload = function() {
  // Start the interval to animate tumbleweeds
  setInterval(createTumbleweed, 5000); // Every 5 seconds, a new tumbleweed comes in
};

// Resize the canvas based on window size
function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Maintain a 16:10 aspect ratio
  let canvasWidth = width;
  let canvasHeight = Math.floor(width * 10 / 16);

  if (canvasHeight > height) {
    canvasHeight = height;
    canvasWidth = Math.floor(height * 16 / 10);
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Redraw the background image to fit the resized canvas
  draw();
}

// Draw the image on the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear any existing canvas content
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the background image
  
  // Draw each tumbleweed
  for (let i = 0; i < tumbleweeds.length; i++) {
    const tw = tumbleweeds[i];
    tw.update();
    tw.draw();
  }
}

// Tumbleweed class for each tumbleweed object
class Tumbleweed {
    constructor(x, y) {
      this.x = x; // Horizontal position (starting from left)
      this.y = y; // Vertical position, initially near the bottom
      this.size = Math.random() * 60 + 80; // Slightly bigger tumbleweed (80 to 140 px)
      this.angle = 0; // Initial rotation angle
      this.amplitude = 30; // Lower amplitude for more gentle bounce
      this.frequency = 0.05; // Slower vertical oscillation
    }
  
    update() {
      // Move the tumbleweed horizontally
      this.x += tumbleweedSpeed;
  
      // Spin the tumbleweed (rotate)
      this.angle += 0.1; // Speed of rotation
  
      // Make it bounce up and down more gently at a higher position on the screen
      this.y = canvas.height - 100 + Math.sin(this.x * this.frequency) * this.amplitude; // Adjusted vertical position
    }
  
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y); // Move to the tumbleweed's position
      ctx.rotate(this.angle); // Rotate the tumbleweed
      ctx.drawImage(weedImg, -this.size / 2, -this.size / 2, this.size, this.size); // Draw the tumbleweed image
      ctx.restore();
    }
  
    // Check if the tumbleweed has gone off the screen
    isOffScreen() {
      return this.x > canvas.width + this.size;
    }
  }
  

// Create a new tumbleweed and add it to the list
function createTumbleweed() {
  // Only create a new tumbleweed if there's a delay
  if (tumbleweedTimer === 0) {
    const startY = canvas.height - 30; // Start near the bottom of the screen
    const newTumbleweed = new Tumbleweed(-50, startY); // Start off the screen (left side)
    tumbleweeds.push(newTumbleweed);

    // Set the timer to wait 3 seconds before the next tumbleweed
    tumbleweedTimer = 3;  // 3-second delay

    // Decrease the timer each second
    setInterval(() => {
      if (tumbleweedTimer > 0) {
        tumbleweedTimer--;
      }
    }, 1000);
  }
}

// Remove off-screen tumbleweeds
function removeOffScreenTumbleweeds() {
  tumbleweeds = tumbleweeds.filter(tw => !tw.isOffScreen());
}

// Handle closing the popup
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const canvasContainer = document.getElementById('canvas-container');
const backgroundMusic = document.getElementById('background-music');

// Add a click event to close the popup and start the audio
popupImage.addEventListener('click', () => {
  // Hide the popup
  popup.style.display = 'none';

  // Show the canvas content
  canvasContainer.style.visibility = 'visible';

  // Start the audio playback when the user clicks the image (after modal is closed)
  backgroundMusic.play();

  // Trigger fade-in effect for the body
  document.body.classList.add('fade-in');
});

// Adjust canvas size when window is resized
window.addEventListener('resize', resizeCanvas);

// Adjust canvas size when fullscreen changes
document.addEventListener('fullscreenchange', resizeCanvas);
document.addEventListener('webkitfullscreenchange', resizeCanvas);
document.addEventListener('mozfullscreenchange', resizeCanvas);
document.addEventListener('msfullscreenchange', resizeCanvas);

// Update the canvas and remove off-screen tumbleweeds
function animate() {
  draw();
  removeOffScreenTumbleweeds(); // Remove tumbleweeds that have gone off the screen
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();

const actionButton = document.getElementById('action-button');
const hoverSound = document.getElementById('hover-sound');
const clickSound = document.getElementById('click-sound');
const fadeDiv = document.getElementById('fade-to-black');

if (!actionButton || !fadeDiv) {
  console.error('Error: Missing required elements.');
}

actionButton.addEventListener('mouseenter', () => {
  hoverSound.play();  // Play hover sound when the user hovers over the button
});

actionButton.addEventListener('click', () => {
  clickSound.play();  // Play click sound when the button is clicked

  // Start the fade-out effect
  fadeDiv.style.transition = 'opacity 1s ease-in-out';  // Set the transition property dynamically
  fadeDiv.style.opacity = 1;  // Set opacity to 1 to make the fade effect

  console.log('Fade-out started');

  // After the fade-out completes (1s), redirect to the new page
  setTimeout(() => {
    console.log('Fade-out completed, redirecting...');
    window.location.href = "page2.html";  // Replace with your target URL
  }, 1000);  // Wait for the transition duration before redirecting (1s)
});



// Get elements
const howButton = document.getElementById('how-button');
const creditsButton = document.getElementById('credits-button');
const howPopup = document.getElementById('how-popup');
const creditsPopup = document.getElementById('credits-popup');
const howCloseButton = document.getElementById('how-close-button');
const creditsCloseButton = document.getElementById('credits-close-button');
const hoverSound2 = document.getElementById('hover-sound2');
const paperSound = document.getElementById('sounds/click.mp3');
const paper2Sound = document.getElementById('sounds/click2.mp3');
const signSound = document.getElementById('sounds/click.mp3');
const sign2Sound = document.getElementById('sounds/click2.mp3');

// Sound for hover effect (common for both buttons)
[howButton, creditsButton].forEach(button => {
  button.addEventListener('mouseenter', () => {
    hoverSound.play(); // Play hover sound
  });
});

// Click sound for both buttons
howButton.addEventListener('click', () => {
  new Audio('sounds/click.mp3').play(); // Play sound on click for 'How' button
  openHowPopup(); // Open the 'How' popup
});

creditsButton.addEventListener('click', () => {
  new Audio('sounds/click.mp3').play(); // Play sound on click for 'Credits' button
  openCreditsPopup(); // Open the 'Credits' popup
});

// Open the 'How' popup
function openHowPopup() {
  howPopup.classList.remove('hidden'); // Show the 'How' popup
  howPopup.style.bottom = '0'; // Slide it up
}

// Open the 'Credits' popup
function openCreditsPopup() {
  creditsPopup.classList.remove('hidden'); // Show the 'Credits' popup
  creditsPopup.style.bottom = '0'; // Slide it up
}

// Close the 'How' popup
howCloseButton.addEventListener('click', () => {
  new Audio('sounds/click2.mp3').play(); // Play sound when closing 'How' popup
  closeHowPopup();
});

// Close the 'Credits' popup
creditsCloseButton.addEventListener('click', () => {
  new Audio('sounds/click2.mp3').play(); // Play sound when closing 'Credits' popup
  closeCreditsPopup();
});

// Function to close the 'How' popup
function closeHowPopup() {
  howPopup.style.bottom = '-100%'; // Slide it down
  setTimeout(() => {
    howPopup.classList.add('hidden'); // Hide the popup after slide
  }, 500); // Wait for animation to complete
}

// Function to close the 'Credits' popup
function closeCreditsPopup() {
  creditsPopup.style.bottom = '-100%'; // Slide it down
  setTimeout(() => {
    creditsPopup.classList.add('hidden'); // Hide the popup after slide
  }, 500); // Wait for animation to complete
}













  





