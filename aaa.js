import React, { useEffect, useState } from 'react';
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
  Show,
} from '@chakra-ui/react';
import useChat from '../../hooks/useChat';
import { useAppSelector } from '../../redux/hooks';
import { text } from '@fortawesome/fontawesome-svg-core';
import { color } from 'framer-motion';

// Компонент ChatMessage
function ChatMessage({ message, loggedUser }) {

  const isAdmin = loggedUser.id === message.User?.id;
  const bgColor = isAdmin ? 'blue.100' : 'gray.200';
  const alignSelf = isAdmin ? 'flex-end' : 'flex-start';

  return (
    <VStack align={alignSelf} mt={2} mb={2} w="100%">
      <HStack spacing={3} align={alignSelf === 'flex-end' ? 'flex-end' : 'flex-start'}>
        <Avatar name={message.User?.username} size="sm" />
        <Box maxW="75%" borderWidth="1px" borderRadius="lg" overflow="hidden" p={3} bg={bgColor} boxShadow="md">
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
  console.log('asdasdasd', messages)
  let showMessage = messages.filter((item) => item.chatId === loggedUser.id);
  if (selectChatId && loggedUser.isAdmin) {
    showMessage = messages.filter((item) => item.chatId === selectChatId);
  }
  return (
    <Box overflowY="auto" height="65vh" p={4} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="stretch">
        {showMessage.map((message) => (
          <ChatMessage message={message} key={message.id} loggedUser={loggedUser} />
        ))}
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
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" variant="solid" colorScheme="blue" type="submit">
              Отправить
              {/* <SendIcon /> */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Box>
  );
}

// Компонент UsersList
// function UsersList({ users }) {
//   return (
//     <VStack align="stretch" spacing={3} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
//       <Heading as="h6" size="sm" mb={2}>
//         Пользователи онлайн
//       </Heading>
//       {users.map((user) => (
//         <HStack key={user.id} spacing={2} align="center">
//           <Tooltip label="Онлайн">
//             <Avatar name={user.username} size="sm" />
//           </Tooltip>
//           <Text>{user.username}</Text>
//         </HStack>
//       ))}
//     </VStack>
//   );
// }

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

function MessageGroup({ messages, loggedUser, setSelectChatId }) {
  if (!loggedUser.isAdmin) return;

  const groupMessage = messages.reduce((arr, item) => {
    if (arr.find((el) => el.id === item.chatId) || item.User.isAdmin) return arr;
    arr.push({ userName: item.User.username, id: item.chatId });
    return arr;
  }, []);


  return (
    <ul style={{ color: 'black' }}>
      {groupMessage.length &&
        groupMessage.map((item) => (
          <li key={item.id} onClick={() => setSelectChatId(item.id)} style={{ cursor: 'pointer' }}>
            {item.userName} - ({item.id})
          </li>
        ))}
    </ul>
  );
}

export default function ChatPage() {
  // const { user: loggedUser } = useContext(UserContext);
  const { user: loggedUser } = useAppSelector((store) => store.userSlice);
  const { messages, users, typing, submitMessage, socketRef } = useChat();
  const [selectChatId, setSelectChatId] = useState<Number | null>(null);

  const cardBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'whiteAlpha.900');
  console.log(users, messages, loggedUser);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center">
        <Heading py={4} size="2xl" color={textColor}>
          Чат
        </Heading>
        <Box w="full" p={4} bg={cardBg} borderRadius="lg" boxShadow="xl">
          <HStack spacing={4} align="flex-start">
            <Box w="25%" p={4}>
              {/* <UsersList users={users.filter((el) => el.id !== loggedUser.id)} /> */}
              <MessageGroup messages={messages} loggedUser={loggedUser} setSelectChatId={setSelectChatId} />
            </Box>
            <Divider orientation="vertical" />
            <Box w="75%" p={4}>
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
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}