const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let ecgData = [];

app.post('/ecg-data', (req, res) => {
    req.on('data', chunk => {
        ecgData.push(JSON.parse(chunk));
    });
    req.on('end', () => {
        res.status(200).send('Data received');
    });
});

app.get('/ecg-data', (req, res) => {
    res.json(ecgData);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
