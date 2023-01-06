const sio = io();

sio.on('connect_error', (e) => {
    console.log(e.message)
})

sio.on('connect', () => {
    console.log('connected');
    sio.emit('sum', { numbers: [2, 3] }, (result) => {
        console.log(result);
    }); //jeśli sio ma 3 argument to chce uzyskać response od servera
});

sio.on('disconnect', () => {
    console.log('disconnected');
})

//broadcast function
sio.on('client_count', (count) => {
    console.log(count + " connected clients")
})