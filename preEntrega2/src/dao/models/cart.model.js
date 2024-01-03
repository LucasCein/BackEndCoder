import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const collection = "carts";

const cartSchema = new Schema({
    products: {
        type:[
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    }
});

export const cartModel = model(collection, cartSchema);
