import styles from './CardAdmin.module.css';
import {
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
  Input,
} from '@chakra-ui/react';
import { Entry } from '../../../../types/statesTypes';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchDelEntry, fetchEditEntry } from '../../../../redux/thunkActions';
import { useState } from 'react';

type MainCardProps = {
  entry: Entry;
};

export default function CardAdmin({ entry }: MainCardProps) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Entry>>({});
  const dispatch = useAppDispatch();

  const deleteHandler = async (): Promise<void> => {
    dispatch(fetchDelEntry(entry.id));
  };

  const editHandler = () => {
    setEditing(true);
    setFormData({
      title: entry.title,
      image: entry.image,
      manufacturer: entry.manufacturer,
      composition: entry.composition,
      hairType: entry.hairType,
      size: entry.size,
    });
  };

  const saveHandler = () => {
    dispatch(fetchEditEntry({ id: entry.id, formData }));
    setEditing(false);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.wrapper}>
      <Card bgColor='#313133' className={styles.container} maxW='sm'>
        <CardBody className={styles.body}>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="title" value={formData.title || ''} onChange={changeHandler} />
            ) : (
              <Heading size='md'>{entry?.title}</Heading>
            )}
            {/* <Heading size='md'>{entry?.title}</Heading> */}
          </Stack>
          <Box boxSize='sm'>
            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
            {/* <Text>{entry?.image}</Text> */}
          </Box>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="manufacturer" value={formData.manufacturer || ''} onChange={changeHandler} />
            ) : (
              <Text>{entry?.manufacturer}</Text>
            )}
            {/* <Text>{entry?.manufacturer}</Text> */}
          </Stack>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="composition" value={formData.composition || ''} onChange={changeHandler} />
            ) : (
              <Text>{entry?.composition}</Text>
            )}
            {/* <Text>{entry?.composition}</Text> */}
          </Stack>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="hairType" value={formData.hairType || ''} onChange={changeHandler} />
            ) : (
              <Text>{entry?.hairType}</Text>
            )}
            {/* <Text>{entry?.hairType}</Text> */}
          </Stack>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="size" value={formData.size || ''} onChange={changeHandler} />
            ) : (
              <Text>{entry?.size}</Text>
            )}
            {/* <Text>{entry?.size}</Text> */}
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
            {editing ? (
              <Button onClick={saveHandler} variant='ghost' colorScheme='blue'>
                Сохранить
              </Button>
            ) : (
              <Button onClick={editHandler} variant='ghost' colorScheme='blue'>
                Редактировать
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}
