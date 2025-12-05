const jwt = require('jsonwebtoken');
const { io } = require('../../../../http');

const { InMemorySessionStore } = require('../../sessionSocket/sessionStore');

const sessionStore = new InMemorySessionStore();

io.use((socket, next) => {
  const token =
    socket.handshake.headers['x-access-token'] || socket.handshake.auth.token;
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: 'Token não identificado.' });
  }
  jwt.verify(token, 'mysecret', function (err, decoded) {
    if (err || !decoded) {
      return res.status(500).send({
        auth: false,
        message: 'Falha para autenticar o token!',
      });
    }
    const session = sessionStore.findSession(token);
    try {
      if (session) {
        socket.sessionID = token;
        socket.userID = session?.userID;
      } else {
        socket.sessionID = token;
        socket.userID = decoded.userId;
      }
      next();
    } catch (err) {}
    return true;
  });
});
