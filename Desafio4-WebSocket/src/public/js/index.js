const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    addDeleteButtonListeners();
});

const addDeleteButtonListeners = () => {
    const deleteButtons = document.getElementsByClassName('delete');
    Array.from(deleteButtons).forEach(button => {
        button.addEventListener('click', () => {
            socket.emit('deleteProduct', button.id);
        });
    });
};

socket.on('actualizarProductos', (productos) => {
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = productos.map(p => `<li>${p.title} - $${p.price} <button id="${p.id}" class="delete">Eliminar</button></li>`).join('');

    // Añadir event listeners a cada botón de eliminación después de actualizar la lista
    addDeleteButtonListeners();
});

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const newProduct = {
        title,
        price
    };
    socket.emit('addProduct', newProduct);
    form.reset();
});



