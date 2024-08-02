import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusket, removeFromBusket } from '../../redux/thunkActions';
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
  console.log('ENTRIES !!!!!!!!!!!!', entries)
  
  const basket = useSelector((state: RootState) => state);
  const userId = user?.id;

  // console.log('basket!!!!!!!', basket);
  // console.log('user!!!!!!!!', userId);
  // let test = false;

  useEffect(() => {
    // if (accessToken) {
    //   console.log('ТОКЕН ЕСТЬ!!!!', accessToken)
    // }
    if (user) {
      // console.log('gjjnijnijnijnijn', dispatch(fetchBusket(userId)))
      dispatch(fetchBusket(userId));
    }
    // console.log('USER!!!', user)
    // console.log('ACCESS!!!!!', accessToken)
  }, [user]);
  
  const handleRemoveFromBasket = (idProduct: number) => {
    dispatch(removeFromBusket(idProduct));
  };
  
  // console.log('asdadsads', basket)
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Корзина</h1>
      <div className={styles.cards}>
        {entries?.length ? (
          entries.map((el) => (
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
          ))
        ) : (
          <>
            <h3>Корзина пуста</h3>
            <button onClick={()=> {
              test = !test
              console.log("ZAAAASSAAA!!!@@")
              }}>1111111</button>
          </>
        )}
      </div>
    </div>
  );
}