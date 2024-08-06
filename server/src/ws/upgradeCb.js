//! === 2 === websocket server

const cookieParser = require('cookie-parser');
const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');

require('dotenv').config();

//! WSS
//* clientTracking: false - сами отслеживаем клиентов
//* noServer: true - отдельный порт нам не нужен (wss на том же порту, что и express сервер)
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

const upgradeCb = (request, socket, head) => {
  socket.on('error', (err) => console.log(err));

  cookieParser()(request, {}, () => {
    try {
      const token = request.cookies.refreshToken;

      const { user } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      //* убираем слушатель ошибки, тк мы в блоке try соединение уже установлено
      socket.removeListener('error', () => {});

      wss.handleUpgrade(request, socket, head, (ws) => {
        //* испускаем событие 'connection' и передаем пользователя
        //* на всс сервере прослущивается событие
        wss.emit('connection', ws, request, user);
        
      });
    } catch (error) {
      console.log('ERRRRR:', error);
      socket.write('HTTP/1.1 401 Unathorized\r\n\r\n');
      socket.destroy();
    }
  });
};

module.exports = { upgradeCb, wss };
