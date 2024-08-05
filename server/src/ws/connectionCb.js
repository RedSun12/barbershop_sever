//! === 3 ===

const { User, Message } = require('../../db/models');

//* структура даных для всех пользователей подключенных к чату
const map = new Map();

const connectionCb = (socket, request, userFromJWT) => {
  map.set(userFromJWT.id, { ws: socket, user: userFromJWT });

  map.forEach(({ ws }) => {
    ws.send(
      JSON.stringify({
        type: 'SET_USERS_FROM_SERVER',
        payload: [...map.values()].map(({ user }) => user),
      })
    );
  });

  // console.log(map);

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('message', async (data) => {
    const { type, payload, selectChat } = JSON.parse(data);
    let chatId = 0;

    switch (type) {
      case 'ADD_MESSAGE_FROM_CLIENT':
        {
          console.log(JSON.parse(data));
          if (!userFromJWT.isAdmin) {
            chatId = userFromJWT.id;
          } else {
            chatId = selectChat;
          }

          const newMessage = await Message.create({
            text: payload,
            authorId: userFromJWT.id,
            chatId,
          });
          const messageWithUser = await Message.findByPk(newMessage.id, {
            include: { model: User, attributes: ['username', 'id'] },
          });
          // console.log('messageWithUser', messageWithUser);
          map.forEach(({ ws }) => {
            ws.send(
              JSON.stringify({
                type: 'ADD_MESSAGE_FROM_SERVER',
                payload: messageWithUser,
              })
            );
          });
        }
        break;

      case 'TYPING_FROM_CLIENT':
        map.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              type: 'CLIENT_TYPING_FROM_SERVER',
              payload: userFromJWT,
            })
          );
        });
        break;

      case 'STOP_TYPING_FROM_CLIENT':
        map.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              type: 'TYPING_FROM_SERVER_STOP',
            })
          );
        });
        break;

      default:
        break;
    }
  });

  socket.on('close', () => {
    map.delete(userFromJWT.id);
    map.forEach(({ ws }) => {
      ws.send(
        JSON.stringify({
          type: 'SET_USERS_FROM_SERVER',
          payload: [...map.values()].map(({ user }) => user),
        })
      );
    });
  });
};

module.exports = connectionCb;

//! далее пишем кастомный хук на клиенте
