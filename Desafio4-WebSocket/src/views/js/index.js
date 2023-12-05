
const socket = io();

socket.on('actualizarProductos', (productos) => {
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = productos.map(p => `<li>${p.nombre} - $${p.precio}</li>`).join('')
})