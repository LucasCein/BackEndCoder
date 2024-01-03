import { Schema, model } from "mongoose";

const collection = "messages";

const messageSchema = new Schema({
    email: String,
    message: String
});

export const messageModel = model(collection, messageSchema);
