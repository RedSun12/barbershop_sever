import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import {
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Divider,
  Avatar,
  Tooltip,
  useColorModeValue,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { FaComments } from 'react-icons/fa';
import useChat from '../../hooks/useChat';
import { useAppSelector } from '../../redux/hooks';

// Компонент ChatMessage
function ChatMessage({ message, loggedUser }) {
  const isAdmin = loggedUser.id === message.User?.id;
  const bgColor = isAdmin ? 'blue.100' : 'gray.200';
  const alignSelf = isAdmin ? 'flex-end' : 'flex-start';

  return (
    <VStack align={alignSelf} mt={2} mb={2} w="100%">
      <HStack spacing={3} align={alignSelf === 'flex-end' ? 'flex-end' : 'flex-start'}>
        <Avatar name={message.User?.username} size="sm" />
        <Box 
          maxW="75%" 
          borderWidth="1px" 
          borderRadius="lg" 
          overflow="hidden" 
          p={3} 
          bg={bgColor} 
          boxShadow="md" 
          wordBreak="break-word"
        >
          <Text fontSize="sm" color="gray.500">
            {message.User?.username}
          </Text>
          <Text color="black">{message.text}</Text>
        </Box>
      </HStack>
    </VStack>
  );
}

// Компонент MessagesList
function MessagesList({ messages, loggedUser, selectChatId }) {
  const showMessage = loggedUser.isAdmin && selectChatId
    ? messages.filter(item => item.chatId === selectChatId)
    : messages.filter(item => item.chatId === loggedUser.id);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [showMessage]);

  return (
    <Box overflowY="auto" height="50vh" p={4} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="stretch">
        {showMessage.map(message => (
          <ChatMessage message={message} key={message.id} loggedUser={loggedUser} />
        ))}
        <div ref={messagesEndRef} />
      </VStack>
    </Box>
  );
}

// Компонент MessageForm
function MessageForm({ submitHandler, socketRef, loggedUser, selectChatId }) {
  const [input, setInput] = useState('');
  const changeHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;
    socket.send(JSON.stringify({ type: 'TYPING_FROM_CLIENT' }));

    const time = setTimeout(() => {
      socket.send(JSON.stringify({ type: 'STOP_TYPING_FROM_CLIENT' }));
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [input]);

  return (
    <Box
      as="form"
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler(input, loggedUser, selectChatId);
        setInput('');
      }}
    >
      <FormControl>
        <InputGroup size="md">
          <Input
            placeholder="Введите сообщение"
            value={input}
            onChange={changeHandler}
            color="black"
            bg="white"
            borderColor="gray.300"
            _focus={{ borderColor: 'blue.500' }}
          />
          <InputRightElement width="5.5rem" >
            <Button h="1.75rem" size="sm" variant="solid" colorScheme="blue" type="submit" mr="0.5rem"  >
              Отправить
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Box>
  );
}

// Компонент ChatComponent
function ChatComponent({ submitHandler, messages, loggedUser, socketRef, selectChatId }) {
  return (
    <Box>
      <MessagesList messages={messages} loggedUser={loggedUser} selectChatId={selectChatId} />
      <MessageForm
        submitHandler={submitHandler}
        socketRef={socketRef}
        loggedUser={loggedUser}
        selectChatId={selectChatId}
      />
    </Box>
  );
}

// Компонент MessageGroup
function MessageGroup({ messages, loggedUser, setSelectChatId }) {
  if (!loggedUser.isAdmin) return null;

  const groupMessage = messages.reduce((arr, item) => {
    if (arr.find(el => el.id === item.chatId) || item.User.isAdmin) return arr;
    arr.push({ userName: item.User.username, id: item.chatId });
    return arr;
  }, []);

  return (
    <ul style={{ color: 'black' }}>
      {groupMessage.length &&
        groupMessage.map(item => (
          <li key={item.id} onClick={() => setSelectChatId(item.id)} style={{ cursor: 'pointer' }}>
            {item.userName} - ({item.id})
          </li>
        ))}
    </ul>
  );
}

// Компонент ChatPage
export default function ChatPage() {
  const { user: loggedUser } = useAppSelector(store => store.userSlice);
  const { messages, users, typing, submitMessage, socketRef } = useChat();
  const [selectChatId, setSelectChatId] = useState(Number | null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const cardBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'whiteAlpha.900');
  
  return (
    <Box position="fixed" bottom="5" right="5" zIndex="999">
      <IconButton
        icon={<FaComments style={{ fontSize: '25px' }}/>}
        isRound
        size="lg"
        colorScheme="teal"
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={styles.button} // Класс для применения анимации
      />
      <Collapse in={isChatOpen} animateOpacity>
        <Box width="450px" p={4} bg={cardBg} borderRadius="md" boxShadow="md" mt={3}>
          <VStack spacing={4} align="stretch">
            <Heading size="md" color={textColor}>
              Чат
            </Heading>
            {loggedUser.isAdmin && (
              <MessageGroup messages={messages} loggedUser={loggedUser} setSelectChatId={setSelectChatId} />
            )}
            <ChatComponent
              submitHandler={submitMessage}
              messages={messages}
              loggedUser={loggedUser}
              socketRef={socketRef}
              selectChatId={selectChatId}
            />
            {typing && typing.id !== loggedUser.id && (
              <Text mt={2} color={textColor}>
                {typing.username} печатает...
              </Text>
            )}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}