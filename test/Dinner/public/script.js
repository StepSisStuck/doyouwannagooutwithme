const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const container = document.querySelector('.container');
const h1 = document.querySelector('h1');

yesBtn.addEventListener('click', () => {
    // Send request to server
    fetch('/api/response?answer=yes');

    // Update UI
    container.innerHTML = `
        <div class="image-container">
            <img src="cute_guy.png" alt="Happy" class="cute-img">
            <div class="floating-heart" style="animation-duration: 0.5s;">💖</div>
        </div>
        <h1 style="color: #4caf50;">Yay! Can't wait! 💚</h1>
        <p>See you later!</p>
    `;

    // Add confetti effect (simple version)
    createConfetti();
});

// Make the No button run away
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton); // For mobile

function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'][Math.floor(Math.random() * 4)];
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { transform: translateY(100vh) rotate(720deg); }
        }
    `;
    document.head.appendChild(style);
}
