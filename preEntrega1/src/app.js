import express from "express";
import { cartRouter } from "./Routes/cart.route.js";
import { productRouter } from "./Routes/products.route.js";
const port = 8080

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto:", port);
});


app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);