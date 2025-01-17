var express = require('express');
var router = express.Router();
const fs = require("fs");
const questionDBFileName ="./model/questions.json";

function readQuestionDB(){
    let data = fs.readFileSync(questionDBFileName, "utf-8");
    return JSON.parse(data);
}

router.get('/', (req, res) => {
    try {
        // Read questions from the JSON file
        const questions = readQuestionDB();
        
        // Render the quiz.ejs template and pass the questions data
        res.render('quiz', { questions });
        console.log(req.body);
    } catch (err) {
        console.error('Error reading questions:', err);
        res.status(500).send('An error occurred while loading the quiz.');
    }
});


module.exports = router;