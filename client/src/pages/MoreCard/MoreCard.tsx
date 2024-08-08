import styles from './MoreCard.module.css';
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Image,
  Box,
  Button,
} from '@chakra-ui/react';
import { useAppSelector } from '../../redux/hooks';
// import { addToBusket, fetchDelEntry } from '../../redux/thunkActions';
import { useNavigate, useParams } from 'react-router-dom'; 
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { Entries } from '../../types/statesTypes';
import axiosInstance from '../../axiosInstance';

export default function MoreCard() {
  const [more, setMore] = useState()
  const {id} = useParams();
  const navigate = useNavigate();
  
  // const entry = useAppSelector((store) => store.productSlice.entries);
  // const entryNew = entry.filter((el)=> el.id === Number(id))[0];
  // const response = axiosInstance.get<Entries>(`${import.meta.env.VITE_API}/more/${id}`);
  
  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}more/${id}`);
      setMore(data);
    })();
  }, []);
  console.log(more)

  const clickMore = (id: number) => {
    navigate(`/product`)
  }

  // setMore(entryNew)
  // console.log(more)

    // await axiosInstance.get(`${import.meta.env.VITE_API}/more/${id}`);
    // setServices(services.filter((service) => service.id !== id));
    // import.meta.env.VITE_API

  // console.log(id)
  // console.log(entryProduct)
  
  return (
    <div className={styles.wrapper}>
      <Button
        width={'50px'}
        position={'absolute'}
        right={'10px'}
        variant="solid"
        colorScheme="white"
        onClick={clickMore}
      >
        ❌
      </Button>
      <Text fontSize={'50px'}>Подробнее о товаре</Text>
      <Card sx={{ boxShadow: "none", background: "transparent", padding: 0 }} className={styles.container}>
        <CardBody className={styles.body}>
          <Stack mt='3' spacing='3'>
            {/* <Box boxSize='sm'> */}
              <Image className={styles.image} borderRadius={'7px'} objectFit={'cover'} width={'100%'} minHeight={'500px'} maxHeight={'500px'} src={`http://localhost:3100/${more?.image}`} alt='PhotoProduct' />
            {/* </Box> */}
          </Stack>
          <Stack paddingLeft={'20px'}>
            <Stack mt='3' spacing='3'>
              <Heading fontSize={'35px'}>{more?.title}</Heading>
            </Stack>
            <Box className={styles.gapBlock}>
              <Text className={styles.gapEl1} mt='3' spacing='3'>Производитель: . . . . .</Text>
              <Stack className={styles.gapEl2} mt='3' spacing='3'>
                <Text>{more?.manufacturer}</Text>
              </Stack>
              <Text className={styles.gapEl1} mt='3' spacing='3'>Состав: . . . . . . . . . . . . .</Text>
              <Stack className={styles.gapEl2} mt='3' spacing='3'>
                <Text>{more?.composition}</Text>
              </Stack>
              <Text className={styles.gapEl1} mt='3' spacing='3'>Тип волос: . . . . . . . . . .</Text>
              <Stack className={styles.gapEl2} mt='3' spacing='3'>
                <Text>{more?.hairType}</Text>
              </Stack>
              <Text className={styles.gapEl1} mt='3' spacing='3'>Размер: . . . . . . . . . . . . .</Text>
              <Stack className={styles.gapEl2} mt='3' spacing='3'>
                <Text>{more?.size}</Text>
              </Stack>
              <Text className={styles.gapEl1} mt='3' spacing='3'>Цена: . . . . . . . . . . . . . . .</Text>
              <Stack className={styles.gapEl2} mt='3' spacing='3'>
                <Text>{more?.price} ₽</Text>
              </Stack>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <div className={styles.footer}>
          <Footer />
      </div>
    </div>
  )
}
