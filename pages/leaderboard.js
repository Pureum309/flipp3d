const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db')

var router = express.Router()

router.get('/', async (req,res)=>{
    // var scores = [];
    // db.each("SELECT * FROM scores ORDER BY score DESC", (err, row) => {
    //     scores.push(row.score);
    //     console.log(row);
    // });

    // console.log(scores);

    var scores = [];
    db.all("SELECT * FROM scores ORDER BY score DESC", [], (err, rows) => {
        if(err) {
            // case error
        }

        var scores = [];
        var names = [];

        for (let i = 0; i < rows.length; i++) {
            names.push(rows[i].user_name);
            scores.push(rows[i].score);
        }
        res.render('leaderboard', {names: names, scores: scores, rankings: rows})
    });
    
    // res.render('leaderboard', {scores: []})
});

module.exports = router;