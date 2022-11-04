const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db')


//creates table only if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name varchar(15), password varchar(15) )')

const app = express()

const port = 3000;

//directory to flash page
const indexPath = __dirname + '/pages/index.html'

//directory to login page
const LoginPath = __dirname + '/pages/login.html'
const GamePath = __dirname + '/pages/game.html'

// load images and css files
app.use(express.static(__dirname))

//console logs current users row
db.each("SELECT * FROM users", (err, row) => {
    console.log(row);
});

//encodes form data
app.use(express.urlencoded({
    extended: false
  }))

app.get('/', (req,res)=>{
    res.sendFile(indexPath)
})

app.get('/login', (req,res)=>{
    res.sendFile(LoginPath)
})

app.get('/gamepage', (req,res)=>{
    res.sendFile(GamePath)
})

app.post('/gamepage', (req, res)=>{
        const userData = req.body
        console.log(userData)
        foundUsers = []
        
        db.all("SELECT * FROM users WHERE user_name = ?", [userData.username], (err, foundUser) => {
            // console.log('---');
            // console.log(row); 
            foundUsers.push(foundUser)
            console.log('----')
            console.log(foundUsers[0][0].password)
        });

        if(foundUsers){
            if(foundUsers[0][0].password === userData.password) {
                res.sendFile(GamePath)
            } else {
                res.send('invalid log in')
            }
        }

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
