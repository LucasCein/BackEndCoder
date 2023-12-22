import express from "express";
import { cartRouter } from "./routes/cart.route.js";
import { productRouter } from "./routes/products.route.js";
import __dirname from "./utils.js";
import { engine } from "express-handlebars"
import { getIo, initIo } from "./socket.js";
import { realTimeproductsRouter } from "./routes/realTimeProducts.route.js";
import { cartDBRouter } from "./routes/cartDB.route.js";
import { productDBRouter } from "./routes/productsDB.route.js";
import mongoose from "mongoose";
import { chatRouter } from "./routes/chat.route.js";
const port = 8080

const app = express();
const MONGO="mongodb+srv://lucascein12:Lcatlas12@cluster0.wjo9u8h.mongodb.net/BackCoder"
const connection=mongoose.connect(MONGO)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const httpServer = app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto:", port);
});

initIo(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use("/api/carts", cartDBRouter);
app.use("/api/products", productDBRouter);
app.use("/realtimeproducts", realTimeproductsRouter)
app.use("/chat",chatRouter)

const io = getIo(httpServer);

let messages=[]

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.on('addProduct', (newProd) => {
        fetch('http://localhost:8080/realtimeproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProd)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    })
    socket.on('deleteProduct', (id) => {
        fetch('http://localhost:8080/realtimeproducts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(response => {
                if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
                    return response.json();
                } else {
                    throw new Error('Respuesta no es JSON');
                }
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    })


    socket.on("chat-message",(data)=>{
        messages.push(data)
        io.emit("messages",messages)
    })

    socket.on("new-user",(username)=>{
        socket.emit("messages",messages)
        socket.broadcast.emit("new-user",username)
    })
});
