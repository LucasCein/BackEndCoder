import fs from 'fs'
export default class ProductManager {
    constructor(url) {
        this.products = [];
        this.path = url
    }

    async getProducts(limit) {
        if (fs.existsSync(this.path)) {
            try {
                if(limit){
                    const data = await fs.promises.readFile(this.path, 'utf-8')
                    this.products = JSON.parse(data).slice(0, limit)
                }
                else{
                    const data = await fs.promises.readFile(this.path, 'utf-8')
                    this.products = JSON.parse(data)
                }
            } catch (err) {
                console.log(err)
            }

        }
        return this.products

    }

    async addProduct(producto) {
        await this.getProducts()
        if (this.products.length > 0) {
            producto.id = this.products[this.products.length - 1].id + 1
        }
        else {
            producto.id = 1
        }
        let { title, description, price, thumbnail, code, stock, category,status } = producto
        if (!title || !description || !price || !code || !stock || !category || !status) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        if (this.products.some((product) => product.id === producto.id)) {
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
            id: producto.id++,
            status: true,
            category
        };
        this.products.push(newProduct);
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            console.log('Se ha agregado el producto')
        } catch(err) {
            console.log(err)
        }

    }

    async getProductById(id) {
        try{
            await this.getProducts()
            if(this.products.length === 0){
                console.log("Not found")
                return
            }
            else{
                const product = this.products.find(product => product.id == id)
                if(!product){
                    return {
                        error: 'No se encontro el producto'
                    }
                }
                return product
            }
        }catch(err){
            console.log(err)
        }
    }
    async updateProduct(id, update){
        await this.getProducts()
        const index = this.products.findIndex(product => parseInt(product.id) == parseInt(id))
        if(index === -1){
            console.log("Not found")
            return
        }
        this.products[index] = {...this.products[index], ...update}
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            console.log('Se ha actualizado el producto')
        }catch(err){
            console.log(err)
        }
    }
    async deleteProduct(id){
        await this.getProducts()
        const index = this.products.findIndex(product => product.id == id)
        if(index === -1){
            console.log("Not found")
            return
        }
        this.products.splice(index, 1)
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            console.log('Se ha eliminado el producto')
        }catch(err){
            console.log(err)
        }
    }

}

