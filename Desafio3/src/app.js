import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
const productManager = new ProductManager("./products.json");

app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});


app.get("/products", async (req, res) => {
    const limit = req.query.limit;
    if(limit){
        const products = await productManager.getProducts(limit);
        res.send(products);
    }
    else{
        const products = await productManager.getProducts();
        res.send(products);
    }
});

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productManager.getProductById(id);
    res.send(product);
});