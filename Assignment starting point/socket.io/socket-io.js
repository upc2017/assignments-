exports.init = function (io) {

    // the chat namespace
    const chat = io
        .of('/chat')
        .on('connection', function (socket) {
            try {
                /**
                 * it creates or joins a room
                 */
                socket.on('create or join', function (room, userId) {
                    socket.join(room);
                    chat.to(room).emit('joined', room, userId);
                });

                socket.on('chat', function (room, userId, chatText) {
                    chat.to(room).emit('chat', room, userId, chatText);
                });

                socket.on('disconnect', function () {
                    console.log('someone disconnected');
                });
            } catch (e) {
            }
        });

    // the canvas namespace
    const canvas = io
        .of('/canvas')
        .on('connection', function (socket) {
            try {
                socket.on('join', function (room, userId, imageUrl) {
                    socket.join(room);
                    canvas.to(room).emit('joined', room, userId, imageUrl);
                });

                socket.on('draw', function (room, userId, canvasWidth, canvasHeight, prevX, prevY, currX, currY, color, thickness) {
                    canvas.to(room).emit('drawToEveryone', room, userId, canvasWidth, canvasHeight, prevX, prevY, currX, currY, color, thickness);
                });

                socket.on('clear', function (room, userId, ctx) {
                    canvas.to(room).emit('clear', room, userId, ctx);
                });

                socket.on('disconnect', function () {
                    console.log('someone disconnected');
                });
            } catch (e) {
            }
        });
}
