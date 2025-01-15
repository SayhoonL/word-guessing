let currentImage = null;
let currentAnswer = null;
let score = 0;

const imageElement = document.getElementById('image');
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const skipBtn = document.getElementById('skipBtn');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');

// Fetch a new image and answer from the backend
async function fetchImage() {
    try {
        const response = await fetch('http://localhost:3000/api/getImage');
        const data = await response.json();
        currentImage = data.image;
        currentAnswer = data.answer;
        imageElement.src = currentImage;
        feedback.textContent = '';
        guessInput.value = '';
    } catch (error) {
        feedback.textContent = 'Error loading image. Try again later.';
    }
}

// Handle the "Submit" button
submitBtn.addEventListener('click', () => {
    const userGuess = guessInput.value.trim().toLowerCase();
    if (userGuess === currentAnswer.toLowerCase()) {
        feedback.textContent = 'Correct!';
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        fetchImage();
    } else {
        feedback.textContent = 'Wrong! Try again.';
    }
});

// Handle the "Skip" button
skipBtn.addEventListener('click', () => {
    feedback.textContent = 'Skipped! No points awarded.';
    fetchImage();
});

// Load the first image on page load
fetchImage();
