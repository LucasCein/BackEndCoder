import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";


const router = Router();

router.get("/:cid", async (req, res) => {
    const id = req.params.cid;
    const cart = await cartModel.findOne({_id: id}).populate("products.product");

    // Convertir el documento de Mongoose a un objeto JavaScript plano
    const cartObj = cart.toObject();
    
    res.render("cart", {
        cart: cartObj
    });
});


router.post("/", async (req, res) => {
    const {productId} = req.body;
    const actualCart=await cartModel.findOne({_id:"6595c19c26591b179a1ebc68"});
    actualCart.products.push({product:productId});
    await actualCart.save();
    res.send({
        status: "success",
        msg: "Ruta post carts",
        actualCart
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

router.delete("/api/carts/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = parseInt(req.params.pid); // Asegúrate de que pid sea un número
    const updatedCart = await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
    );
    res.send({
        status: "success",
        msg: "Ruta delete products con id:", cid,
        updatedCart
    });
});

router.put("/api/carts/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = req.body;
    const updatedCart = await cartModel.updateOne({ _id: cid }, cart);
    res.send({
        status: "success",
        msg: "Ruta put carts con id:", cid,
        updatedCart
    });
});
router.put("/api/carts/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = parseInt(req.params.pid); // Asegúrate de que pid sea un número
    const quantity = req.body.quantity;
    const updatedCart = await cartModel.updateOne(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity } }
    );
    res.send({
        status: "success",
        msg: "Ruta put products con id:", cid,
        updatedCart
    });
});

router.delete("/api/carts/:cid", async (req, res) => {
    const cid = req.params.cid;
    const deletedCart = await cartModel.deleteOne({ _id: cid });
    res.send({
        status: "success",
        msg: "Ruta delete carts con id:", cid,
        deletedCart
    });
});
export { router as cartDBRouter }