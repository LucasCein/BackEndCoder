import ProductManager from "./ProductManager.js";

const product=new ProductManager('./products.json')
const env = async () => {
    await product.addProduct({
        title: 'Escuadra',
        description: 'Escuadra de 2.5mm',
        price: 123.45,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    })
    await product.addProduct({
        title: 'Calculadora',
        description: 'Calculadora de 2.5mm',
        price: 123.45,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    })
    console.log(await product.getProducts())
    // console.log('producto por id:',await product.getProductById(1))
    // await product.updateProduct(1,{
    //     title: 'Calculadora',
    //     description: 'Calculadora de 2.5mm',
    //     price: 123.45,
    //     thumbnail: 'Sin imagen',
    //     code: 'abc123',
    //     stock: 25
    // })
    // await product.deleteProduct(1)
}
env()