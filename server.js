require('dotenv').config({path:__dirname+'/config/.env'})
const express = require('express')
const app= express() 
const mongoose = require ('mongoose')
app.use(express.json())
const PORT= process.env.PORT
const URL=process.env.MONGO_URL

mongoose.connect(`${URL}/databaseusers`,()=>{
    console.log('connected')
})
const User = require('./model/User')


app.get('/',(req,res)=>{
    User.find()
    .then(users=>res.send(users))
    .catch((err=>console.log(err)))
})

app.post('/add',(req,res)=>{  
    const {name,age,rank }=req.body
    const newUser= new User({name,age,rank})
    newUser.save()
    .then(user=>res.send(user))
    .catch((err=>console.log(err))) 
    })

app.put('/update/:_id',(req,res)=>{  
    const ID=req.params._id
    const {name,age,rank }=req.body
    User.findByIdAndUpdate(ID,{$set:{name,age,rank}})
    .then(users=>res.send(users))
    .catch((err=>console.log(err)))  
    })

app.delete('/delete/:_id',(req,res)=>{
    const ID=req.params._id
    User.findByIdAndRemove(ID)
    .then(users=>res.send(users))
    .catch((err=>console.log(err)))
    })


app.listen(PORT,(error)=>{
    if (error) console.log('serveur is not running')
    else console.log (`sever is running on port : ${PORT}`)
})