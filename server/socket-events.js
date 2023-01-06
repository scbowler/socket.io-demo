module.exports = io => {
  io.on('connection', socket => {
    // eslint-disable-next-line no-console
    console.log('User connectd!');

    socket.on('message', message => {
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      io.emit('message', { type: 'user-left', text: 'User has left' });
    });
  });
};
