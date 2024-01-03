import { Router } from "express";
import { productModel } from "../dao/models/products.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const { limit, page, sort, category, available } = req.query;
    const options = {
        limit: parseInt(limit) || 5,
        page: parseInt(page) || 1,
        sort: sort === 'asc' ? { price: 1 } : { price: -1 },
        lean: true
    };

    let queryFilters = {};
    if (category) {
        queryFilters.category = category;
    }
    if (available) {
        queryFilters.available = available === 'true';
    }

    let result = {};

    if (Object.keys(queryFilters).length) {

        let aggregateResult = await productModel.aggregate([
            { $match: queryFilters },
            { $sort: { price: sort === 'asc' ? 1 : -1 } }
        ]);


        result.docs = aggregateResult;

    } else {

        result = await productModel.paginate({}, options);

    }

    res.render("home", {
        products: result,
        sort: sort
    });
});


router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = await productModel.find({ _id: id });
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
    const updatedProduct = await productModel.updateOne({ _id: id }, product);
    res.send({
        status: "success",
        msg: "Ruta put products con id:", id,
        updatedProduct
    });
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    const deletedProduct = await productModel.deleteOne({ _id: id });
    res.send({
        status: "success",
        msg: "Ruta delete products con id:", id,
        deletedProduct
    });
});
export { router as productDBRouter }