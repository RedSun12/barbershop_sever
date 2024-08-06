import React, { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { accessToken } from '../../axiosInstance';

export default function BusketPage() {
  const dispatch = useDispatch();
  const user = useAppSelector((store) => store.userSlice.user);
  const entries = useAppSelector((store) => store.busketSlice.entries)
  // console.log('ENTRIES !!!!!!!!!!!!', entries)
  // const busketOrder = useAppSelector((store) => store)
  // console.log('ORDER!!!!!', busketOrder)
  
  // const basket = useSelector((state: RootState) => state);
  const userId = user?.id;

  // console.log('basket!!!!!!!', basket);
  // console.log('user!!!!!!!!', userId);
  // let test = false;

  useEffect(() => {
    if (user) {
      dispatch(fetchBusket(userId));
    }
  }, [user]);
  
  const handleRemoveFromBasket = (idProduct: number) => {
    dispatch(removeFromBusket(idProduct));
  };

  const handleBuyOrder = (idUser: number) => {
    dispatch(buyOrder(idUser));
  }
  
  // console.log('asdadsads', basket)
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Корзина</h1>
      <div className={styles.cards}>
        {entries?.length ? (
          <div>
          {entries.map((el) => (
            <Card
              key={el?.id}
              className={styles.oneCard}
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: '100%', sm: '200px' }}
                src={el.image}
                alt="Product photo"
              />
              <Stack>
                <CardBody>
                  <Button
                    variant="solid"
                    colorScheme="white"
                    onClick={() => handleRemoveFromBasket(el.id)}
                  >
                    ❌
                  </Button>

                  <Text color="black" py="3">
                    Производитель: {el.manufacturer}
                  </Text>
                  <Text color="black" py="2">
                    Тип волос: {el.hairType}
                  </Text>
                </CardBody>

                <Heading>
                  <div className={styles.title}>{el.title}</div>
                </Heading>
              </Stack>
            </Card>
            ))}
            <Button onClick={() => handleBuyOrder(user?.id)}>Оформить заказ</Button>
          </div>
        ) : (
          <>
            <h3>Корзина пуста</h3>
          </>
        )}
      </div>
    </div>
  );
}