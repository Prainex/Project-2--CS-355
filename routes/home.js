var express = require('express');
var router = express.Router();
const fs = require("fs");
const postDBFileName = "./model/postDB.json";

function readpostDB(){
    let data = fs.readFileSync(postDBFileName, "utf-8");
    return JSON.parse(data);
}

