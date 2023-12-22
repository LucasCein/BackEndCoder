import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";


const router = Router();

router.get("/:cid", async (req, res) => {
    const id = req.params.cid;
    const cart = await cartModel.find({_id: id});
    res.send({
        status: "success",
        msg: "Ruta get carts con id:", id,
        cart
    });
});

router.post("/", async (req, res) => {
    const cart = req.body;
    const newCart = await cartModel.create(cart);
    res.send({
        status: "success",
        msg: "Ruta post carts",
        newCart
    });
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = parseInt(req.params.pid); // Asegúrate de que pid sea un número

    // Primero, intenta incrementar la cantidad si el producto ya existe en el carrito
    const result = await cartModel.updateOne(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.quantity": 1 } }
    );

    // Si el producto no estaba en el carrito, añádelo
    if (result.nModified === 0) {
        await cartModel.updateOne(
            { _id: cid },
            { $push: { products: { product: pid, quantity: 1 } } }
        );
    }

    // Obtén el carrito actualizado para enviarlo en la respuesta
    const updatedCart = await cartModel.findById(cid);

    res.send({
        status: "success",
        msg: "Producto agregado o actualizado en el carrito",
        cart: updatedCart
    });
});


export { router as cartDBRouter }