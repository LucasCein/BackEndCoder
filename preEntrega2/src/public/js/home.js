document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('button[id]');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('id');
            addToCart(productId);
        });
    });
});

function addToCart(productId) {
    fetch('/api/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Aquí puedes agregar alguna notificación o actualización de la interfaz
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
