document.addEventListener("DOMContentLoaded", function () {
    // Play Button: Fade Out and Redirect
    document.getElementById("play-button").addEventListener("click", function () {
        document.body.style.transition = "opacity 1s";
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "https://your-game-url.com";
        }, 1000);
    });

    // Instructions Button: Show Popup
    document.getElementById("instructions-button").addEventListener("click", function () {
        document.getElementById("instructions-popup").style.display = "block";
    });

    // Close Button: Hide Popup
    document.getElementById("close-btn").addEventListener("click", function () {
        document.getElementById("instructions-popup").style.display = "none";
    });

    // Button Hover Effects
    document.getElementById("play-button").addEventListener("mouseover", function () {
        this.src = "play2.png";
    });
    document.getElementById("play-button").addEventListener("mouseout", function () {
        this.src = "play.png";
    });

    document.getElementById("instructions-button").addEventListener("mouseover", function () {
        this.src = "how2.png";
    });
    document.getElementById("instructions-button").addEventListener("mouseout", function () {
        this.src = "how.png";
    });

    // Function to Create a Tumbleweed
    function createTumbleweed() {
        let tw = document.createElement("img");
        tw.src = "weed.png";
        tw.classList.add("tumbleweed");
        tw.style.left = "-10%";
        document.getElementById("game-container").appendChild(tw);

        // Remove tumbleweed after animation
        setTimeout(() => tw.remove(), 5000);
    }

    // Generate a Tumbleweed Every 5 Seconds
    setInterval(createTumbleweed, 5000);
});
