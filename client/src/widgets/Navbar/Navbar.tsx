import { setAccessToken } from '../../axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogoutUser } from '../../redux/thunkActions';
import AuthForm from '../../components/AuthForm/AuthForm';
import {
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Flex,
  Text,
  Center,
  Button,
  Box,
} from '@chakra-ui/react';
import { ArrowDownIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';

export default function Navbar() {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickHome = () => {
    navigate('/');
  };

  // const clickProduct = () => {
  //   navigate('/product')
  // }

  const clickGame = () => {
    navigate('/profile');
  };

  const clickRegistr = () => {
    navigate('/signup');
  };

  const clickProfile = () => {
    navigate('/profile');
  };

  const logoutHandler = async () => {
    await dispatch(fetchLogoutUser());
    setAccessToken('');
  };

  function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://w1168615.yclients.com/widgetJS';
    script.charset = 'UTF-8';
    document.body.appendChild(script);
  }

  useEffect(() => {
    loadScript();
  }, []);

  return (
    <>
      {/* Add a Box component to act as a spacer for the fixed navbar */}
      <Box height="66px" />
      {user?.username ? (
        <Center>
          <Flex
            position="fixed"
            top="0"
            left="0"
            width="100%"
            zIndex="1000"
            m={0}
            p={0}
            height={'45px'} // Adjusted height for better results
            rounded={'30'}
            bg={'#A1A1A1'}
            alignItems={'center'}
            justifyContent={'space-between'}
            backdropFilter={'blur(12.5px)'}
          >
            <Flex alignItems={'center'}>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      height={'31px'}
                      width={'60px'}
                      isActive={isOpen}
                      as={Button}
                      rounded={'20px'}
                      ml={'4px'}
                      color={'white'}
                      bg={'#141414'}
                    >
                      {isOpen ? '✕' : '☰'}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={clickProfile}>Профиль</MenuItem>
                      <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
              <Text ml={'16px'} textShadow={'#0F0F0F 1px 0 10px'}>
                <Link to="/contact">Контакты</Link>
              </Text>
              <Button
                ml={'7px'}
                width={'20px'}
                border={'1px'}
                rounded={'50%'}
                bg={'transparent'}
                color={'#000000'}
              >
                <ArrowDownIcon height={'31px'}></ArrowDownIcon>
              </Button>
              <Text ml={'16px'} textShadow={'#0F0F0F 1px 0 10px'}></Text>
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              fontSize={'13px'}
              fontWeight={'600'}
            >
              <Text textShadow={'#0F0F0F 1px 0 10px'}>
                <Link to="/">БАРБЕРШОП</Link>
              </Text>
              <Text textShadow={'#0F0F0F 1px 0 10px'}>
                <Link to="/">СЕВЕР</Link>
              </Text>
            </Flex>
            <Flex alignItems={'center'}>
              <Text
                mr={'14px'}
                fontWeight={'500'}
                textShadow={'#0F0F0F 1px 0 10px'}
              >
                <Link to="/product">Товары</Link>
                <Link to="/admin">Админка</Link>
                <Link to="/busket">Корзина</Link>
                <Link to="/services">Услуги</Link>
              </Text>
              <Button
                rounded={'300px'}
                bg={'white'}
                boxShadow={'xl'}
                height={'45px'}
                mr={'27px'}
              >
                <PlusSquareIcon></PlusSquareIcon>
              </Button>
              <Button
                bg={'white'}
                height={'45px'}
                rounded={'29px'}
                boxShadow={'3xl'}
              >
                <a
                  href="w1168615.yclients.com/widgetJS"
                  className="ms_booking"
                  onClick={loadScript()}
                >
                  Записаться онлайн
                </a>
              </Button>
            </Flex>
          </Flex>
        </Center>
      ) : (
        <Center>
          <Flex
            position="fixed"
            top="0"
            left="0"
            width="100%"
            zIndex="1000"
            m={0}
            p={0}
            height={'45px'} // Adjusted height for better results
            rounded={'30'}
            bg={'#A1A1A1'}
            alignItems={'center'}
            justifyContent={'space-between'}
            backdropFilter={'blur(12.5px)'}
          >
            <Flex alignItems={'center'}>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      height={'31px'}
                      width={'60px'}
                      isActive={isOpen}
                      as={Button}
                      rounded={'20px'}
                      ml={'4px'}
                      color={'white'}
                      bg={'#141414'}
                    >
                      {isOpen ? '✕' : '☰'}
                    </MenuButton>
                    <MenuList>
                      <AuthForm title="Войти" type="signin" />
                      <AuthForm title="Зарегистрироваться" type="signup" />
                    </MenuList>
                  </>
                )}
              </Menu>
              <Text ml={'16px'} textShadow={'#0F0F0F 1px 0 10px'}>
                <Link to="/contact">Контакты</Link>
              </Text>
              <Button
                ml={'7px'}
                width={'20px'}
                border={'1px'}
                rounded={'50%'}
                bg={'transparent'}
                color={'#000000'}
              >
                <ArrowDownIcon height={'31px'}></ArrowDownIcon>
              </Button>
              <Text ml={'16px'} textShadow={'#0F0F0F 1px 0 10px'}></Text>
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              fontSize={'13px'}
              fontWeight={'600'}
            >
              <Text textShadow={'#0F0F0F 1px 0 10px'}>
                <Link to="/">БАРБЕРШОП</Link>
              </Text>
              <Text textShadow={'#0F0F0F 1px 0 10px'}>
                <Link to="/">СЕВЕР</Link>
              </Text>
            </Flex>
            <Flex alignItems={'center'}>
              <Text
                mr={'14px'}
                fontWeight={'500'}
                textShadow={'#0F0F0F 1px 0 10px'}
              >
                <Link to="/product">Товары</Link>
                <Link to="/services">Услуги</Link>
              </Text>
              <Button
                rounded={'300px'}
                bg={'white'}
                boxShadow={'xl'}
                height={'45px'}
                mr={'27px'}
              >
                <PlusSquareIcon></PlusSquareIcon>
              </Button>
              <Button
                bg={'white'}
                height={'45px'}
                rounded={'29px'}
                boxShadow={'3xl'}
              >
                <a
                  href="w1168615.yclients.com/widgetJS"
                  className="ms_booking"
                  onClick={loadScript()}
                >
                  Записаться онлайн
                </a>
              </Button>
            </Flex>
          </Flex>
        </Center>
      )}
    </>
  );
}
