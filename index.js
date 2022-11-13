const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db')
var path = require('path')


//creates table only if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name varchar(15), password varchar(15) )')
db.run('CREATE TABLE IF NOT EXISTS scores(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name varchar(15), score integer )')

const app = express()

const port = 3000;

//directory to flash page
const indexPath = __dirname + '/pages/index.html'

//directory to login page
const LoginPath = __dirname + '/pages/login.html'
const GamePath = __dirname + '/pages/game.html'
const LeaderPath = __dirname + '/pages/leaderboard.html'

//Directory to about page

const AboutUsPath = __dirname + '/pages/aboutus.html'

// load images and css files
app.use(express.static(__dirname))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

//console logs current users row
db.each("SELECT * FROM users", (err, row) => {
    console.log(row);
});

//console logs current scores row
db.each("SELECT * FROM scores", (err, row) => {
    console.log(row);
});

//encodes form data
app.use(express.urlencoded({
    extended: true
  }))

app.get('/', (req,res)=>{
    res.sendFile(indexPath)
})

app.get('/login', (req,res)=>{
    res.sendFile(LoginPath)
})

app.get('/quickstart', (req,res)=>{
    res.sendFile(GamePath)
})

app.get('/aboutus', (req, res) => {
    res.sendFile(AboutUsPath)
})

var leaderboardRoute = require('./pages/leaderboard')
app.use('/leaderboard', leaderboardRoute)

// app.get('/leaderboard', (req,res)=>{
//     db.each("SELECT * FROM scores", (err, row) => {
//         console.log(row);
//     });
    
//     res.sendFile(LeaderPath, {test: "test text"})
// })

app.get('/gamepage', (req, res)=>{
   
        const userData = req.body
        console.log(userData)
        foundUsers = []
        
        db.all("SELECT * FROM users WHERE user_name = ?", [userData.username], (err, foundUser) => {
            // console.log('---');
            // console.log(row); 
            foundUsers.push(foundUser)
            console.log('----')
            console.log(foundUsers.length +'+'+ userData.password)
            if (foundUser){
                for (i = 0; i < foundUsers.length; i++){
                    for (j = 0; j < foundUsers[i].length; j++){
                        if(foundUsers[i][j].password === userData.password) {
                            console.log('++++++')
                        }
                    }
                }
            }
        });

        // if(foundUsers){
        //     if(foundUsers[0][0].password === userData.password) {
        //         res.sendFile(GamePath)
        //     } else {
        //         res.send('invalid log in')
        //     }
        // }

        // if(foundUser){
        //     if(foundUser.password === userData.password){
        //     res.sendFile(GamePath)
        //     } else {
        //         res.sendFile(LoginPath)
        //     }
        // } else{
            res.end()
        // }
    })


app.post('/leaderboard', (req, res)=>{
    const userName = req.body.userName;
    const score = req.body.score;

    db.run(`INSERT INTO scores(user_name, score) values (?,?)`, [userName, score]);

    res.redirect('/leaderboard');

    res.end()
})

app.post('/signup', (req, res)=>{
    // const newuserData = req.body
    // // console.log(newuserData)
    // users.push(newuserData)
    // res.sendFile(LoginPath)
    // console.log(users)
    const username = req.body.username
    const password = req.body.password
    
    // Adds new user. ? is a placeholder, if data exists run name and age array. Array values must match the placement
    db.run(`INSERT INTO users (user_name, password) values (?,?)`, [username, password])
    
    // Shows the table
    db.each("SELECT * FROM users", (err, row) => {
        console.log(row);
});

    res.sendFile(LoginPath)

})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
