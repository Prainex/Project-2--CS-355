var express = require('express');
var router = express.Router();
const fs = require("fs");
const userDBFileName = "./model/userDB.json";
const questions = './model/questions.json';

function readUserDB() {
    let data = fs.readFileSync(userDBFileName, "utf-8");
    return JSON.parse(data);
}

function writeUserDB(users){
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync(userDBFileName, data, "utf-8");
}



// // Original Author
// router.get('/login', function(req, res) {
//     res.render('login');
// });


// Suggested function below
router.get('/login', function(req, res) {
    res.render('login', { errorMessage: null });
});


// Original Author
// router.get('/signup', function(req, res) {
//     res.render('signup');
// });


// Suggested function below
router.get('/signup', function(req, res) {
    res.render('signup', { errorMessage: null });
});


// // Original Author
// router.post("/login/submit", (req, res) => {
//     let userDB = readUserDB();
//     const { username, password } = req.body;

//     for(let user of userDB){
//         if(user.username === username && user.password === password){
//             res.render('home');
//         }
//         else{
//             console.log("missing 1 or more conditions");
//         }
//     }
//     console.log(req.body);    
// });


// Suggested function below
router.post("/login/submit", (req, res) => {
    let userDB = readUserDB();
    const { username, password } = req.body;
    let flag = false;
    let specific_user;

    for (let user of userDB){
        if(user.username === username && user.password === password){
            flag = true;
            specific_user = user
        }
    }


    if (flag) {
        res.render('userOptions', { specific_user });
    } else {
        res.render('login', { errorMessage: "Invalid username or password" });
    }
});


// Original Author
// router.post("/signup/submit", (req, res) => {
//     let userDB = readUserDB();

//     const { username, password, fullname, email } = req.body;
//     let newUser = {username: `${username}`, password: `${password}`, fullname: `${fullname}`, email: `${email}`};
//     for (let user of userDB){
//         if (user.username === username){
//             console.log('can\'t use the username, it\'s already in use');
//         }
//         else{
//             res.render('home');
//             userDB.push(newUser);
//             writeUserDB(userDB);
//         }
//     }

//     console.log(req.body);
// });


// Suggested function below
router.post("/signup/submit", (req, res) => {
    let userDB = readUserDB();
    let flag = false;
    const { name, username, password } = req.body;

    for (let user of userDB){
        if(user.username === username){
            flag = true;
        }
    }

    if(flag){
        res.render('signup', { errorMessage: "Username already exists" });
    }

    else{
        userDB.push({ name, username, password, highest_score: 0 });
        writeUserDB(userDB);
        res.render('login', { errorMessage: null });
    }
});


// Suggested info here. From here on there is no Original Author below

function readQuestions() {
    let data = fs.readFileSync(questions, "utf-8");
    return JSON.parse(data);
}


function questionCount(){
    let questions1 = fs.readFileSync(questions, "utf-8");
    let questions2 = JSON.parse(questions1);
    let count = 0;

    questions2.forEach((item) =>{
        count++;
    })
    return count;
}


// router.post("/login/submit/userOptions", (req, res) =>{
//     const {num_questions, time_limit} = req.body;
//     let array = [];
//     let totalQuestions = questionCount() - 1;

//     // Making sure it generates unique random number
//     while(array.length < num_questions){

//         let randomQuestion = Math.floor(Math.random() * totalQuestions);
//         if (!array.includes(randomQuestion)) {
//             array.push(randomQuestion);
//         }

//     }

//     let questionObj = readQuestions();
//     let select_question = [];
    
//     for(let i = 0; i < array.length; i++){
//         select_question.push(questionObj[array[i]]);
//     }
    
//     res.render('quiz', {questions: select_question});

// })


router.post("/login/submit/userOptions", (req, res) => {
    const { num_questions, time_limit } = req.body;
    let array = [];
    let totalQuestions = questionCount();

    // Ensure unique random question indices
    while (array.length < num_questions) {
        let randomQuestion = Math.floor(Math.random() * totalQuestions);
        if (!array.includes(randomQuestion)) {
            array.push(randomQuestion);
        }
    }

    let questionObj = readQuestions();
    let selectedQuestions = array.map((index) => questionObj[index]);

    // Prepare initial data for rendering
    const actual_answers = selectedQuestions.map((q) => q.answer);
    const user_response = []; // Initialize user responses

    res.render('quiz', {questions: selectedQuestions, time_limit: time_limit});
});


router.post('/login/submit/userOptions/quiz', (req, res) => {
    res.render('results');
});



module.exports = router;