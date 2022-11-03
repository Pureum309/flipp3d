const express = require('express')

const app = express()

const port = 3000;

//directory to flash page
const indexPath = __dirname + '/pages/index.html'

//directory to login page
const LoginPath = __dirname + '/pages/login.html'
const GamePath = __dirname + '/pages/game.html'
const LeaderPath = __dirname + '/pages/leaderboard.html'

// load images and css files
app.use(express.static(__dirname))

//stores users
const users = [
    {
        username: "Can",
        password: "1234!"
    }
]
console.log(users)

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

app.get('/leaderboard', (req,res)=>{
    res.sendFile(LeaderPath)
})

app.post('/gamepage', (req, res)=>{
        const userData = req.body
        console.log(userData)
        const foundUser = users.find(person => person.username == userData.username)
        if(foundUser){
            if(foundUser.password === userData.password){
            res.sendFile(GamePath)
            } else {
                res.end("Username or password incorrect")
            }
        } else{
            res.end("User Not Found")
        }
    })

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})