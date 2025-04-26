
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos desde /public
app.use(express.static(__dirname + '/public'));

// Conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Un usuario se conectó');

    socket.on('mensajeChat', (mensaje) => {
        io.emit('mensajeChat', mensaje);
    });

    socket.on('inicioDibujo', (data) => {
        socket.broadcast.emit('inicioDibujo', data);
    });

    socket.on('dibujando', (data) => {
        socket.broadcast.emit('dibujando', data);
    });

    socket.on('limpiarPizarra', () => {
        io.emit('limpiarPizarra');
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se desconectó');
    });
});

// Escuchar en el puerto proporcionado por Render o 3000 local
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
