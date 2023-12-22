import { Schema, model } from 'mongoose'

const collection="products"

const productSchema=new Schema({
    title:String,
    description:String,
    code:String,
    price:Number,
    status:Boolean,
    stock:Number,
    category:String,
    thumbnails:[String]
})

export const productModel=model(collection,productSchema)

