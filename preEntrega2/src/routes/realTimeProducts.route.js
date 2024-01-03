import { Router } from "express";
import { getIo } from "../socket.js";
import ProductManager from "../dao/managers/ProductManager.js";
const router = Router();
const productManager = new ProductManager("./src/files/products.json");

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.render("realTimeProducts", {
        products
    });
});
router.post("/", async (req, res) => {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    const prods = await productManager.getProducts();
    const io = getIo();
    io.emit("actualizarProductos", prods);
    console.log("Se agrego")

});
router.delete("/", async (req, res) => {
    try {
        const id = req.body;
        await productManager.deleteProduct(id);
        const prods = await productManager.getProducts();
        getIo().emit("actualizarProductos", prods);
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export { router as realTimeproductsRouter }