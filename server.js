const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.post('/button-click', (req, res) => {
    const { response } = req.body;
    if (response === 'Yes') {
        console.log('User clicked Yes');
    } else if (response === 'No') {
        console.log('User clicked No');
    }
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
