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

type MainCardProps = {
  entry: Entry;
  // userId: number;
};

export default function MainCard({ entry }: MainCardProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);

  const deleteHandler = async (): Promise<void> => {
    dispatch(fetchDelEntry(entry.id));
  };

  const buyHandler = async (): Promise<void> => {
    dispatch(addToBusket({ idUser: user.id, idProduct: entry.id }));
  };
  return (
    <div className={styles.wrapper}>
      <Card bgColor='#313133' className={styles.container} maxW='sm'>
        <CardBody className={styles.body}>
          <Stack mt='3' spacing='3'>
            <Heading size='md'>{entry?.title}</Heading>
          </Stack>
          <Box boxSize='sm'>
            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
            {/* <Text>{entry?.image}</Text> */}
          </Box>
          <Stack mt='3' spacing='3'>
            <Text>{entry?.manufacturer}</Text>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Text>{entry?.composition}</Text>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Text>{entry?.hairType}</Text>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Text>{entry?.size}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Подробнее
            </Button>
            <Popover placement='top'>
              <PopoverTrigger>
                <Button variant='ghost' colorScheme='blue'>
                  Удалить
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  Вы действительно хотите удалить запись?
                </PopoverHeader>
                <PopoverBody>
                  <Button
                    onClick={deleteHandler}
                    variant='ghost'
                    colorScheme='blue'
                  >
                    Удалить
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Button variant='solid' colorScheme='green' onClick={buyHandler}>
              Купить
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}
