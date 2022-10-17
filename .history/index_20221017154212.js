const express = require('express')

const app = express()

app.get('/', (req,res)=>{
    res.send("Welcom to my homepage")
})

app.get('/about', (req,res)=>{
    console.log(req.query) //http://localhost:3000/about?name=sarah
    res.send("Welcome to my about page")
})

app.listen(3000)