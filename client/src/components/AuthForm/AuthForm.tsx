import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './AuthForm.module.css';
import {
  Input,
  Text,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAuthUser } from '../../redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';

// Типы данных для инпутов и пропсов
type Inputs = {
  username?: string;
  usersurname?: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  title: string;
  type: 'signin' | 'signup';
};

// Основной компонент
export default function AuthForm({ title, type = 'signin' }: AuthFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Inputs>({
    username: '',
    usersurname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid(inputs.email)) {
      setError('Неверный формат email');
      return;
    }

    if (inputs.password.length < 8) {
      setError('Пароль должен быть не менее 8 символов');
      return;
    }

    setError('');

    try {
      const result = await dispatch(fetchAuthUser({ inputs, type })).then(
        unwrapResult
      );
      setAccessToken(result.accessToken);
      navigate('/');
    } catch (error) {
      console.error('Authentication failed:', error);
      if (error.response && error.response.status === 401) {
        setError('Неверный email или пароль');
      } else {
        setError('Произошла ошибка при авторизации');
      }
    }
  };

  return (
    <>
      {type === 'signin' && (
        <>
          <Text
          paddingLeft={'10px'}
            fontSize={'16px'}
            fontWeight={'bold'}
            className={styles.linkText}
            onClick={onOpen}
            cursor="pointer"
          >
            Вход
          </Text>
          <Modal
            isCentered
            className={styles.wrapper}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalContent>
              <ModalHeader color={'black'}>Вход</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <FormControl>
                  <FormLabel color={'black'}>Email:</FormLabel>
                  <Input
                    color={'black'}
                    ref={initialRef}
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    type="email"
                    name="email"
                    value={inputs?.email}
                    placeholder="Эл.почта"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel color={'black'}>Пароль:</FormLabel>
                  <Input
                    color={'black'}
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    type="password"
                    name="password"
                    value={inputs?.password}
                    placeholder="Пароль"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button onClick={submitHandler} colorScheme="blue" mr={3}>
                  Войти
                </Button>
                <Button onClick={onClose}>Отмена</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
      {type === 'signup' && (
        <>
          <Text
            fontSize={'16px'}
            fontWeight={'bold'}
            onClick={onOpen}
            cursor="pointer"
            className={styles.btnreg}
          >
            Регистрация
          </Text>
          <Modal
            isCentered
            className={styles.wrapper}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalContent>
              <ModalHeader color={'black'}>Регистрация</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <FormControl>
                  <FormLabel color={'black'}>Имя пользователя:</FormLabel>
                  <Input
                    color={'black'}
                    ref={initialRef}
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    name="username"
                    value={inputs.username}
                    placeholder="Имя пользователя"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={'black'}>Фамилия пользователя:</FormLabel>
                  <Input
                    color={'black'}
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    name="usersurname"
                    value={inputs.usersurname}
                    placeholder="Фамилия пользователя"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel color={'black'}>Email:</FormLabel>
                  <Input
                    color={'black'}
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    type="email"
                    name="email"
                    value={inputs.email}
                    placeholder="Эл.почта"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel color={'black'}>Пароль:</FormLabel>
                  <Input
                    color={'black'}
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    type="password"
                    name="password"
                    value={inputs.password}
                    placeholder="Пароль"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button className={styles.btnreg} onClick={submitHandler} colorScheme="blue" mr={3}>
                  Регистрация
                </Button>
                <Button onClick={onClose}>Отмена</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}