import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { credentialRoutes } from './routes/credentialRoutes'
import { UserModel } from './db'


// mongodb+srv://mk2818356:nobitakaif2004@cluster0.jeq1u.mongodb.net/
// import z from "zod"

const app= express()
app.use(express.json())

app.use('/api/v1',credentialRoutes)


app.listen(3009,
    function(){
        console.log("server is runnging on port 3000")
    })
