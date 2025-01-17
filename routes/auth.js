var express = require('express');
var router = express.Router();
const fs = require("fs");
const userDBFileName = "./model/userDB.json";

function readUserDB() {
    let data = fs.readFileSync(userDBFileName, "utf-8");
    return JSON.parse(data);
}

function writeUserDB(users){
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync(userDBFileName, data, "utf-8");
}

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post("/login/submit", (req, res) => {
    let userDB = readUserDB();
    const { username, password } = req.body;

    for(let user of userDB){
        if(user.username === username && user.password === password){
            res.render('home');
        }
        else{
            console.log("missing 1 or more conditions");
        }
    }
    console.log(req.body);    
});

router.post("/signup/submit", (req, res) => {
    let userDB = readUserDB();

    const { username, password, fullname, email } = req.body;
    let newUser = {username: `${username}`, password: `${password}`, fullname: `${fullname}`, email: `${email}`};
    for (let user of userDB){
        if (user.username === username){
            console.log('can\'t use the username, it\'s already in use');
        }
        else{
            res.render('home');
            userDB.push(newUser);
            writeUserDB(userDB);
        }
    }

    console.log(req.body);
});

module.exports = router;