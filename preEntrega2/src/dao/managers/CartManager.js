import fs from 'fs'
import path from 'path';
import __dirname from '../../utils.js';
export default class CartManager {
    constructor(url) {
        this.carts = [];
        this.path = path.join(__dirname,`/files/${url}`)
    }
    async getCarts(limit) {
        if (fs.existsSync(this.path)) {
            try {
                if(limit){
                    const data = await fs.promises.readFile(this.path, 'utf-8')
                    this.carts = JSON.parse(data).slice(0, limit)
                }
                else{
                    const data = await fs.promises.readFile(this.path, 'utf-8')
                    this.carts = JSON.parse(data)
                }
            } catch (err) {
                console.log(err)
            }

        }
        return this.carts

    }

    async addCart(cart) {
        await this.getCarts()
        if (this.carts.length > 0) {
            cart.id = this.carts[this.carts.length - 1].id + 1
        }
        else {
            cart.id = 1
        }
        let {products} = cart
        console.log(cart.id)
        if (!products) {
            console.log("El carrito debe contener al menos 1 producto");
            return;
        }
        if (this.carts.includes(cart)) {
            console.log("El carrito ya existe");
            return;
        }
        const newCart = {
            id: cart.id++,
            products
        };
        this.carts.push(newCart)
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
            console.log('Se ha agregado el carrito')
        } catch(err) {
            console.log(err)
        }
    }
    

    async getCartById(id) {
        try{
            await this.getCarts()
            if(this.carts.length === 0){
                console.log("Not found")
                return
            }
            else{
                const cart = this.carts.find(cart => cart.id == id)
                if(!cart){
                    return {
                        error: 'No se encontro el producto'
                    }
                }
                return cart
            }
        }catch(err) {
            console.log(err)
        }
    }
    async addProdToCart(cid, pid){
        await this.getCarts()
        const index = this.carts.findIndex(cart => cart.id == cid)
        if(index === -1){
            console.log("No se ha encontrado el carrito")
            return
        }
        let products=this.carts[index].products
        console.log(products)
        console.log(pid)
        if(pid){
            if(!products.some(product => product.product == pid)){
                let prodCart={
                    product:parseInt(pid),
                    quantity:1
                }
                this.carts[index].products=[...this.carts[index].products, prodCart]
            }
            else{
                let indexProd=products.findIndex(product => product.product == pid)
                this.carts[index].products[indexProd].quantity++
            }
        }
        else{
            console.log("El carrito no contiene productos")
            return
        }
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
            console.log('Se ha actualizado el carrito')
        }catch(err){
            console.log(err)
        }
    }
    async deleteCartById(id) {
        await this.getCarts()
        const index = this.carts.findIndex(cart => cart.id === id)
        if(index === -1){
            console.log("Not found")
            return
        }
        this.carts = this.carts.filter(cart => cart.id !== id)
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
            console.log('Se ha eliminado el carrito')
        } catch(err) {
            console.log(err)
        }
    }


}