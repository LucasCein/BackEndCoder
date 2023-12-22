const socket = io();
let username;


Swal.fire({
    title: 'Identifícate',
    input:"text",
    text: 'Ingrese un nombre de usuario',
    inputValidator: (value) => {
        return !value && 'El nombre de usuario es obligatorio'
    },
    allowOutsideClick: false,
}).then((result) => {
    username = result.value
    socket.emit('new-user', username)
})

const chatInput =document.getElementById('chat-input');
chatInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const message = chatInput.value;
        if(message.trim().length === 0) return;
        socket.emit('chat-message', { username, message });
        chatInput.value = '';
    }
});


const messagesPanel=document.getElementById('messages-panel');
socket.on('messages', (data) => {
    let messages=""
    data.forEach(element => {
        messages += `<b>${element.username}</b>: ${element.message}</br>`
    });
    messagesPanel.innerHTML = messages
});

socket.on("new-user",(username)=>{
    Swal.fire({
        title: `${username} ha ingresado al chat`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
})