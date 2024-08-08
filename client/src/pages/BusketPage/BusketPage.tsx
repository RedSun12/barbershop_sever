import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyOrder, fetchBusket, removeFromBusket } from '../../redux/thunkActions';
import styles from './BusketPage.module.css';
import {
  Card,
  CardBody,
  Heading,
  Stack,
  CardFooter,
  Text,
  Image,
  Button,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { accessToken } from '../../axiosInstance';
import Footer from '../../components/Footer/Footer';

export default function BusketPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const user = useAppSelector((store) => store.userSlice.user);
  const entries = useAppSelector((store) => store.busketSlice.entries)
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  // console.log('ENTRIES !!!!!!!!!!!!', entries)
  // const busketOrder = useAppSelector((store) => store)
  // console.log('ORDER!!!!!', busketOrder)
  
  // const basket = useSelector((state: RootState) => state);
  // const entries = useAppSelector((store) => store.busketSlice.entries);
  const userId = user?.id;

  useEffect(() => {
    if (user) {
      dispatch(fetchBusket(userId));
    }
    // console.log(entries)
  }, [user]);
  
  const handleRemoveFromBasket = (idProduct: number) => {
    dispatch(removeFromBusket(idProduct));
  };

  const handleBuyOrder = (idUser: number) => {
    dispatch(buyOrder(idUser));
  };

  const handleClick = (onOpenFunc, imageId, open, close) => {
    onOpenFunc();
    return (
        <Modal isOpen={open} onClose={close}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Image
                className={styles.image}
                objectFit="cover"
                borderRadius={'7px'}
                maxW={{ base: '100%', sm: '200px' }}
                src={`http://localhost:3100/${imageId}`}
                alt="Product photo"
              />
              {/* {console.log('!!!!!!')} */}
            </ModalBody>
  
          </ModalContent>
        </Modal>
    )
  };
  
  return (
    <div className={styles.wrapper}>
        {loadingVisible && (
          <div className="loading-screen">
            <div className="loader">
              <img src="/load1.png" alt="Loading" className="loading-image" />
              <img
                src="/load2.png"
                alt="Loading"
                className="loading-image spinning"
              />
            </div>
          </div>
        )}
      <h1 className={styles.header}>Корзина</h1>
      <Text fontSize={'50px'}>Корзина</Text>
      {/* <h1 className={styles.header}>Корзина</h1> */}
      <div className={styles.cards}>
        {entries?.length ? (
          <div className={styles.box}>
            <Text>
            {/* const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
); */}
              Стоимось заказа: {entries.reduce((acc: any, el: { price: any; }) => acc + el.price, 0)} ₽
            </Text>
            <div className={`${styles.more}`} onClick={() => handleBuyOrder(user?.id)}>
              Оформить заказ
            </div>
            {/* <Button position={'absolute'} right={'50px'} onClick={() => handleBuyOrder(user?.id)}>Оформить заказ</Button> */}
            <div className={styles.container}>
          {entries.map((el) => (
            <div>
            <Card
              sx={{ boxShadow: "none", minWidth: "100vh", border: "none", borderRadius: 0, background: "transparent", padding: 0 }}
              bgColor='#313133'
              maxW='sm'
              key={el?.id}
              className={styles.oneCard}
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                className={styles.image}
                objectFit="cover"
                borderRadius={'7px'}
                maxW={{ base: '100%', sm: '200px' }}
                src={`http://localhost:3100/${el?.image}`}
                alt="Product photo"
                onClick={() => handleClick(onOpen, el.image, isOpen, onClose)}
              />
              <Stack>
                <CardBody>
                  <Button
                    position={'absolute'}
                    right={'10px'}
                    variant="solid"
                    colorScheme="white"
                    onClick={() => handleRemoveFromBasket(el.id)}
                  >
                    ❌
                  </Button>
                <Heading>
                  <div className={styles.title}>{el.manufacturer} {el.title}</div>
                </Heading>

                  <Text color="black" py="3">
                    {el.title} - {el.size}
                  </Text>
                  <Text color="black" py="2">
                    {el.hairType}
                  </Text>
                  <Text color="black" py="2">
                    {el.composition}
                  </Text>
                  <Text color="black" py="2">
                    Цена: {el.price} ₽
                  </Text>
                </CardBody>

              </Stack>
            </Card>
            {el.id !== entries.length ? (
              <div>
                <br />
                <Divider sx={{ borderBottomWidth: '0.58px' }} borderColor="gray.300" />
                <br />
              </div>
            ) : (
              <div></div>
            )}
              {/* <div className={styles.space}></div> */}
              </div>
            ))}
            </div>
          </div>
        ) : (
          <>
          <Text fontSize={'20px'}>Корзина пуста</Text>
            {/* <h2></h2> */}
          </>
        )}
      </div>
      <div className={styles.footer}>
        {/* <Footer /> */}
      </div>
    </div>
  );
}