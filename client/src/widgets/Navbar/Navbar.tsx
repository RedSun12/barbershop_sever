import { setAccessToken } from '../../axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBusket, fetchLogoutUser } from '../../redux/thunkActions';
import AuthForm from '../../components/AuthForm/AuthForm';
import './Navbar.css';
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
import { useDispatch } from 'react-redux';

export default function Navbar() {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const dispatchAll = useDispatch();
  // const user = useAppSelector((store) => store.userSlice.user);
  const entries = useAppSelector((store) => store.busketSlice.entries);
  const userId = user?.id;

  console.log(entries)

  useEffect(() => {
    if (user) {
      dispatch(fetchBusket(userId));
    }
    // console.log(entries)
  }, [user]);

  const clickHome = () => {
    navigate('/');
  };

  const clickBusket = () => {
    navigate('/busket');
  };

  const clickService = () => {
    navigate('/services');
  };

  const clickProduct = () => {
    navigate('/product')
  }

  const clickContact = () => {
    navigate('/contact')
  }

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

  // console.log(entries)
  return (
    <>
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
            height={'45px'}
            rounded={'30'}
            bg={'rgba(241, 241, 241, 0.52)'}
            alignItems={'center'}
            justifyContent={'space-between'}
            backdropFilter={'blur(12.5px)'}
          >
            <Flex alignItems={'center'}>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      height={'39px'}
                      width={'60px'}
                      isActive={isOpen}
                      as={Button}
                      rounded={'20px'}
                      ml={'4px'}
                      color={'white'}
                      bg={'#141414'}
                      marginLeft={'5px'}
                    >
                      {isOpen ? '✕' : '☰'}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={clickHome}>На главную</MenuItem>
                      <MenuItem onClick={clickService}>Услуги</MenuItem>
                      <MenuItem onClick={clickProduct}>Товары</MenuItem>
                      <MenuItem onClick={clickContact}>Контакты</MenuItem>
                      <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
              <Text ml={'16px'} textShadow={'#0F0F0F 1px 0 10px'}></Text>
                {/* <Link to="/contact">Контакты</Link>
                <Link to="/product" style={{ margin: '0 10px' }}>Товары</Link>
                <Link to="/busket" style={{ margin: '0 10px' }}>Корзина {entries.length}</Link>
              </Text>
              {/* <Button
                ml={'7px'}
                width={'20px'}
                border={'1px'}
                rounded={'50%'}
                bg={'transparent'}
                color={'#000000'}
              >
                <ArrowDownIcon height={'31px'}></ArrowDownIcon>
              </Button> */}
              <Text ml={'16px'} textShadow={'#0F0F0F 1px 0 10px'}></Text>
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              fontSize={'13px'}
              fontWeight={'600'}
            >
              <Text 
              textShadow={'#0F0F0F 1px 0 10px'}>
                <Link 
                className='barbcent'
                style={{color: 'black', textAlign: 'center', alignItems: 'center', display: 'flex', paddingLeft: '120px',  fontWeight: '900', }}
                to="/">БАРБЕРШОП<br/>СЕВЕР</Link>
              </Text>
            </Flex>
            <Flex alignItems={'center'}>
              <Text
                mr={'14px'}
                fontWeight={'500'}
                textShadow={'#0F0F0F 1px 0 10px'}
              >
                {user.id === 1 ? <Link to="/admin" style={{ margin: '0 10px', color: 'black' }}>Панель администратора</Link> : null}
                {/* <Link to="/admin" style={{ margin: '0 10px', color: 'black' }}>Панель администратора</Link> */}
                {/* <Link to="/services" style={{ margin: '0 10px' }}>Услуги</Link> */}
              </Text>
              {entries.length ? (
              <div className='baskBtn'>
                <Link to="/busket" style={{alignItems: "center", paddingLeft: "10px", paddingRight: "15px", display: "flex", margin: '0px', padding: "0px"}}>
                  <img
                    src="/box_alt.svg"
                    alt="Loading"
                    className="baskimg"
                  />
                  {/* {'&#160'} */}
                  <Text className="textBus" marginLeft={'15px'} fontSize={'20px'}>
                    {entries.length}
                  </Text>
                </Link>
              </div>
              ) : (
                <div className='baskBtn'>
                  <Link to="/busket" style={{margin: '0px', padding: "0px"}}>
                    <img
                      src="/box_alt.svg"
                      alt="Loading"
                      className="baskimg"
                    />
                  </Link>
                </div>
              )}
              <Button
                bg={'white'}
                height={'45px'}
                rounded={'29px'}
                boxShadow={'3xl'}
              >
                <a
                  style={{color: 'black'}}
                  href="https://www.yclients.com"
                >
                  Мои записи
                </a>
                <div className="image-container">
                  <img
                    src="/3.svg"
                    alt="Loading"
                    className="loading-image2 main-image2"
                  />
                  <img
                    src="/4.svg"
                    alt="Loading"
                    className="loading-image2 overlay-image2 img"
                  />
                </div>
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
              {/* <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      height={'39px'}
                      width={'60px'}
                      isActive={isOpen}
                      as={Button}
                      rounded={'20px'}
                      ml={'4px'}
                      color={'white'}
                      bg={'#141414'}
                      marginLeft={'5px'}
                    >
                      {isOpen ? '✕' : '☰'}
                    </MenuButton>
                    <MenuList>
                    <MenuItem onClick={clickHome}>На главную</MenuItem>
                    <MenuItem> <AuthForm title="Войти" type="signin" /></MenuItem>
                    <MenuItem> <AuthForm title="Зарегистрироваться" type="signup" /> </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu> */}
              <Text ml={'16px'} textShadow={'#0F0F0F 1px 0 10px'} style={{display: 'flex'}}>
              <AuthForm title="Войти" type="signin" />
              <AuthForm title="Зарегистрироваться" type="signup" />
              <Link 
              className='bezRegBtn'
              to="/">На главную</Link>
              <Link 
              className='bezRegBtn'
              to="/contact">Контакты</Link>
              </Text>
              {/* <Button
                ml={'7px'}
                width={'20px'}
                border={'1px'}
                rounded={'50%'}
                bg={'transparent'}
                color={'#000000'}
              >
                <ArrowDownIcon height={'31px'}></ArrowDownIcon>
              </Button> */}
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
              <Link 
                className='barbcent'
                style={{color: 'black', textAlign: 'center', alignItems: 'center', display: 'flex', marginLeft: '-130px',  fontWeight: '900', }}
                to="/">БАРБЕРШОП<br/>СЕВЕР</Link>
              </Text>
            </Flex>
            <Flex alignItems={'center'}>
              <Text
                mr={'14px'}
                fontWeight={'500'}
                textShadow={'#0F0F0F 1px 0 10px'}
              >
                {/* <Link to="/services">Услуги</Link> */}
              </Text>
              {/* <Button
                rounded={'300px'}
                bg={'white'}
                boxShadow={'xl'}
                height={'45px'}
                mr={'27px'}
              >
                <PlusSquareIcon></PlusSquareIcon>
              </Button> */}
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
                  Записаться online
                </a>
                <div className="image-container">
                  <img
                    src="/3.svg"
                    alt="Loading"
                    className="loading-image2 main-image2"
                  />
                  <img
                    src="/4.svg"
                    alt="Loading"
                    className="loading-image2 overlay-image2 img"
                  />
                </div>
              </Button>
            </Flex>
          </Flex>
        </Center>
      )}
    </>
  );
}
