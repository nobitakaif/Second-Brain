import { NextFunction, Request , Response } from "express"
import  jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config"

export const middleware=(req: Request,res: Response ,next: NextFunction)=>{
    const token = req.headers["authorization"]
    if(!token){
        res.status(411).send({
            msg:"token is not present!!"
        })
    }
    const decodecToken = jwt.verify(token as string ,JWT_PASSWORD)
    if(decodecToken){
        // here typescript give you error, right now we are avoiding this, eventually we'll fixed it
        // we're send to thier id to the next routes
        // @ts-ignore
        req.userId=decodecToken.id
        next()
    }else{
        res.status(411).send({
            msg:"invalid token"
        })
    }
}