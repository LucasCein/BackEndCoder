import { Router } from "express";
import CartManager from "../managers/CartManager.js";
const router = Router();
const cartManager = new CartManager("../files/carts.json");


router.get("/:cid", async (req, res) => {
    const id = req.params.cid;
    const cart = await cartManager.getCartById(id);
    res.send({
        status: "success",
        msg: "Ruta get carts con id:",id,
        cart
    });
});

router.post("/", async (req, res) => {
    const cart = req.body;
    const newCart = await cartManager.addCart(cart);
    res.send({
        status: "success",
        msg: "Ruta post carts",
        newCart
    });
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartManager.addProdToCart(cid, pid);
    res.send({
        status: "success",
        msg: "Ruta post carts con id:",cid,
        cart
    });
});

export { router as cartRouter }