import mongoose, { model, Mongoose, Schema } from 'mongoose'

const UserSchema=new Schema({
    email    :  { type : String , unique : true },
    password :  { type : String }
})

const ContentSchema = new Schema({
    title   :   { type : String },
    body    :   { type : String },
    link    :   { type : String },
    tags    :   [ { type : mongoose.Types.ObjectId, ref : 'Tag'} ],
    userId  :   { type : mongoose.Types.ObjectId, ref :  'user', required : true}
})


export const ContentModel=model('content',ContentSchema)
export const UserModel = model('user',UserSchema)