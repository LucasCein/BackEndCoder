
import { Schema, model } from 'mongoose'

const collection="carts"

const cartSchema=new Schema({
    products:[]
})

export const cartModel=model(collection,cartSchema)