import styles from './MainCard.module.css';
import {
  Avatar,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Image,
  Box,
} from '@chakra-ui/react';
import { Entry } from '../../types/statesTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToBusket, fetchDelEntry } from '../../redux/thunkActions';
import { useNavigate } from 'react-router-dom'; 
type MainCardProps = {
  entry: Entry;
  // userId: number;
};

export default function MainCard({ entry }: MainCardProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);
  const navigate = useNavigate();
  
  const clickMore = (id: number) => {
    navigate(`/more/${id}`)
  }

  const deleteHandler = async (): Promise<void> => {
    dispatch(fetchDelEntry(entry.id));
  };

  const buyHandler = async (): Promise<void> => {
    dispatch(addToBusket({ idUser: user.id, idProduct: entry.id }));
  };
  return (
    <div className={styles.wrapper}>
      <Card sx={{ boxShadow: "none", background: "transparent", padding: 0 }} bgColor='#313133' className={styles.container} maxW='sm'>
        <CardBody sx={{ padding: 0 }} className={styles.body}>
          {/* <Box> */}
          <Image className={styles.image} borderRadius={'7px'} objectFit={'cover'} overflow={'hidden'} width={'100%'} height={'370px'} src={`http://localhost:3100/${entry?.image}`}/>
          <Stack>
            {/* <Heading size='md'>{entry?.title}</Heading> */}
            <Text className={styles.text}>{entry?.title} {entry?.manufacturer} </Text>
          </Stack>
            {/* <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' /> */}
            {/* <Text>{entry?.image}</Text> */}
          {/* </Box> */}
          <Stack>
            <Text className={styles.text} color={'#BCBCBC'}>{entry?.title} - {entry?.size}</Text>
          </Stack>
          <Stack>
            <Text className={styles.text}>{entry?.price} ₽</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter className={styles.footertext} padding={'0'} marginTop={'10px'}>
          <ButtonGroup spacing='2'>
            <div className={`${styles.allButton} ${styles.more}`} onClick={() => clickMore(entry.id)}>
              Подробнее
            </div>
            <div className={`${styles.allButton} ${styles.buy}`} onClick={buyHandler}>
              Купить
            </div>
            {/* <Button onClick={clickMore} sx={{ boxShadow: "none", background: "transparent", padding: 0 }}>
              Подробнее
            </Button> */}
            {/* <Button variant='solid' colorScheme='green' onClick={buyHandler}>
              Купить
            </Button> */}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}
