import express from "express";
import z, { string } from 'zod'
import bcrypt from 'bcrypt'
import { ContentModel, UserModel } from "../db";
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from "../config";
import { middleware } from "./middleware";


const Router = express()

Router.post('/signup',async function(req,res){
    const inputFormat = z.object({
        email : z.string().email(),
        password : z.string().min(8).max(40)
    })

    const checkInputs = inputFormat.safeParse(req.body) // safeParse check the input format and return {success:boolean,data:(msg),error}

    if(!checkInputs.success){
        res.status(403).send({
            msg:"you enter wrong inputs",
            error: checkInputs.error
        })
    }

    const email = req.body.email
    const password = req.body.password
    const hashedPassword= await bcrypt.hash(password,5)

    try {
        await UserModel.create({
            email : email,
            password : hashedPassword
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            msg:"db crashed"

        })
    }
    res.status(200).send({
        msg : "you're successfully logged in"
    })
    
})

Router.post('/signin',async function(req,res){
    const {email,password}=req.body
  
    const response=await UserModel.findOne({
        email:email
    })

    

    if(!response?.email ){
        res.status(403).send({
            msg:"incorrect credential"
        })
        return 
    }
    
    console.log(response.email," ", response.password)
    const unhasedPassword = await bcrypt.compare(password,response.password as string) // (as string) just assume it that it is present and convert into string
    
    if(!unhasedPassword){
        res.status(403).send({
            msg:"password is incorrect"
        })
        return
    }

    console.log(response.email , "  " , response.password)
    const token = jwt.sign({
            id:response._id
    },JWT_PASSWORD)
    
    console.log(token)
    res.send({
        token:token
        
    })
})

// add a middleware for every content route should be authenticated  
Router.post('/content',middleware ,async function(req,res){
    const link = req.body.link
    const title = req.body.title

    try{
        await ContentModel.create({
        title,
        link,
        // @ts-ignore
        userId:req.userId,
        tag: []
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            msg : "maybe database crashed while putting the data in Content Table`"
        })
    }
    
    res.status(200).send({
        msg:"your content added into db"
    })
})

Router.get('/content', middleware, async function(req,res){
    // @ts-ignore
    const id=req.userId
    const response = await ContentModel.find({
        userId:id
    }).populate("userId","email") // populate is basically get this id is which userid to belong it
    res.send({
        response
    })
})

Router.delete('/content',middleware,async function(req,res){
    const _id = req.body.contentId
    
    try{
        await ContentModel.deleteMany({
            _id,
            // @ts-ignore
            userId:req.userId
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            msg:"content not deleted"
        })
        return
    }
    res.status(200).send({
        msg:"content is deleted",
        id:_id
    })

})
export const credentialRoutes = Router