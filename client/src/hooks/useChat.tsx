/* eslint-disable no-unused-vars */
//! === 4 ===
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useAppSelector } from '../redux/hooks';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const { user } = useAppSelector(store => store.userSlice);

  const socketRef = useRef(null);

  useEffect(() => {
    axiosInstance('/api/v1/messages/').then(({ data }) => setMessages(data));
  }, []);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3100');
    const socket = socketRef.current;

    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'SET_USERS_FROM_SERVER':
          setUsers(payload);
          break;

        case 'ADD_MESSAGE_FROM_SERVER':
          setMessages((prev) => [...prev, payload]);
          break;

        //! useEffect в MessageForm для установки и очистки елемента с выводом строки typing
        case 'CLIENT_TYPING_FROM_SERVER':
          setTyping(payload);
          break;

        case 'TYPING_FROM_SERVER_STOP':
          setTyping(false);
          break;
        default:
          break;
      }
    };
    return () => {
      socketRef?.current?.close()
    }
  }, []);

  const submitMessage = (input, loggedUser, selectChat = 0) => {
    const socket = socketRef.current;
    if (selectChat && loggedUser.isAdmin) {
      socket.send(
        JSON.stringify({
          type: 'ADD_MESSAGE_FROM_CLIENT',
          payload: input,
          selectChat: selectChat,
        })
      );
    } else {
      socket.send(
        JSON.stringify({ type: 'ADD_MESSAGE_FROM_CLIENT', payload: input })
      );
    }
  };
  return {
    messages,
    users,
    typing,
    submitMessage,
    socketRef,
  };
}
