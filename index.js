const express = require('express')

const app = express()

const port = 3000;

//directory to flash page
const indexPath = __dirname + '/pages/index.html'

//directory to login page
const LoginPath = __dirname + '/pages/login.html'
const GamePath = __dirname + '/pages/game.html'

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

app.post('/gamepage', (req, res)=>{
        const userData = req.body
        console.log(userData)
        const foundUser = users.find(person => person.username == userData.username)
        if(foundUser){
            if(foundUser.password === userData.password){
            res.sendFile(GamePath)
            } else {
                res.sendFile(LoginPath)
            }
        } else{
            res.end("User Not Found")
        }
    })

app.post('/signup', (req, res)=>{
    const newuserData = req.body
    // console.log(newuserData)
    users.push(newuserData)
    res.sendFile(LoginPath)
    console.log(users)
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})