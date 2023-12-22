import { Router } from "express";
import { productModel } from "../dao/models/products.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await productModel.find();
    res.send({
        status: "success",
        msg: "Ruta get products",
        products
    });
});

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = await productModel.find({_id: id});
    res.send({
        status: "success",
        msg: "Ruta get products con id:", id,
        product
    });
});

router.post("/", async (req, res) => {
    const product = req.body;
    const newProduct = await productModel.create(product);
    res.send({
        status: "success",
        msg: "Ruta post products",
        newProduct
    });
});

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = req.body;
    const updatedProduct = await productModel.updateOne({_id: id}, product);
    res.send({
        status: "success",
        msg: "Ruta put products con id:", id,
        updatedProduct
    });
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    const deletedProduct = await productModel.deleteOne({_id: id});
    res.send({
        status: "success",
        msg: "Ruta delete products con id:", id,
        deletedProduct
    });
});
export { router as productDBRouter }