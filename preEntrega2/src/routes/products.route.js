import { Router } from "express";
import { getIo } from "../socket.js";
import ProductManager from "../dao/managers/ProductManager.js";
const router = Router();
const productManager = new ProductManager("./src/files/products.json");

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.render("home", {
        products
    });
});

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = await productManager.getProductById(id);
    res.send({
        status: "success",
        msg: "Ruta get products con id:", id,
        product
    });
});

router.post("/", async (req, res) => {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.send({
        status: "success",
        msg: "Ruta post products",
        newProduct
    });
});

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = req.body;
    const updatedProduct = await productManager.updateProduct(id, product);
    res.send({
        status: "success",
        msg: "Ruta put products con id:", id,
        updatedProduct
    });
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    const deletedProduct = await productManager.deleteProduct(id);
    res.send({
        status: "success",
        msg: "Ruta delete products con id:", id,
        deletedProduct
    });
});
export { router as productRouter }