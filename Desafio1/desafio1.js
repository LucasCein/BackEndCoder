class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock){ 
        let id_producto=this.products.length
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        if (this.products.some((product) => product.code === code)) {
            console.log("El código ya existe");
            return;
        }
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id:++id_producto
        };
        this.products.push(newProduct);
    }
    getProducts(){
        console.log(this.products);
        return this.products
    }
    getProductById(id){
        const product = this.products.find(product => product.id === id)
        if (!product) {
            console.log("Not found");
            return;
        }
        console.log(product)
        return product
    }

}

const productManager = new ProductManager();
productManager.addProduct("Escuadra", "Escuadra de 3 metros", 200, "Sin imagen", "abc123", 25);
productManager.getProducts();
productManager.getProductById(2);