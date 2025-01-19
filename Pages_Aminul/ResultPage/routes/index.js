const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const dataPath = path.join(__dirname, '../information.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const questions = JSON.parse(data);
            res.render('index', { questions });
        }
    });
});

module.exports = router;
