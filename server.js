const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve static files for the images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Mock data for images
const imageData = [
    { image: '/images/cat.png', answer: 'Cat' },
    { image: '/images/car.png', answer: 'Car' },
    { image: '/images/dog.png', answer: 'Dog' },
];

let currentIndex = 0;

// API to get a random image
app.get('/api/getImage', (req, res) => {
    currentIndex = (currentIndex + 1) % imageData.length;
    res.json(imageData[currentIndex]);
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
