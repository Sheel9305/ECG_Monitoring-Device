// Import required modules
const express = require('express');
const cors = require('cors');

// Create an instance of the Express application
const app = express();
const port = 3000;

// Middleware to allow CORS
app.use(cors());

// Sample ECG data (this should be populated with actual data from your ESP32)
let ecgData = [];

// Endpoint to receive ECG data from ESP32
app.post('/ecg-data', (req, res) => {
    req.on('data', chunk => {
        // Append incoming data to ecgData
        ecgData.push(JSON.parse(chunk));
    });
    req.on('end', () => {
        res.status(200).send('Data received');
    });
});

// Endpoint to send ECG data
app.get('/ecg-data', (req, res) => {
    res.json(ecgData); // Send ECG data as JSON
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
