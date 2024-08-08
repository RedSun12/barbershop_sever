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
import { fetchDelEntry, fetchEditEntry, fetchEntries } from '../../../../redux/thunkActions';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MainCardProps = {
  entry: Entry;
};

export default function CardAdmin({ entry }: MainCardProps) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Entry>>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const clickMore = () => {
    navigate('/more')
  }
  const deleteHandler = async (): Promise<void> => {
    dispatch(fetchDelEntry(entry.id));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const editHandler = () => {
    setEditing(true);
    setFormData({
      title: entry.title,
      image: entry.image,
      manufacturer: entry.manufacturer,
      composition: entry.composition,
      hairType: entry.hairType,
      size: entry.size,
      price: entry.price,
    });
  };

  const saveHandler = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title || '');
    formDataToSend.append('manufacturer', formData.manufacturer || '');
    formDataToSend.append('composition', formData.composition || '');
    formDataToSend.append('hairType', formData.hairType || '');
    formDataToSend.append('size', formData.size || '');
    formDataToSend.append('price', formData.price || 0);
    if (fileInputRef.current?.files?.[0]) {
      formDataToSend.append('image', fileInputRef.current.files[0]);
    }
    dispatch(fetchEditEntry({ id: entry.id, formData: formDataToSend }));
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
              <Input type="text" name="title" defaultValue={entry?.title} onChange={changeHandler} />
            ) : (
              <Heading size='md'>{entry?.title}</Heading>
            )}
          </Stack>
          <Box>
          {editing ? (
              <Input type='file' name="image" ref={fileInputRef} onChange={changeHandler} height='70px' fontSize='14px' accept="image/*"/>
            ) : (
              <Image objectFit={'cover'} overflow={'hidden'} width={'300px'} height={'230px'} src={`http://localhost:3100/${entry?.image}`}/>
            )}
          </Box>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="manufacturer" defaultValue={entry?.manufacturer} onChange={changeHandler} />
            ) : (
              <Text>{entry?.manufacturer}</Text>
            )}
          </Stack>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="composition" defaultValue={entry?.composition} onChange={changeHandler} />
            ) : (
              <Text>{entry?.composition}</Text>
            )}
          </Stack>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="hairType" defaultValue={entry?.hairType} onChange={changeHandler} />
            ) : (
              <Text>{entry?.hairType}</Text>
            )}
          </Stack>
          <Stack mt='3' spacing='3'>
            {editing ? (
              <Input type="text" name="size" defaultValue={entry?.size} onChange={changeHandler} />
            ) : (
              <Text>{entry?.size}</Text>
            )}
            {editing ? (
              <Input type="text" name="price" defaultValue={entry?.price} onChange={changeHandler} />
            ) : (
              <Text>{entry?.price}</Text>
            )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button onClick={clickMore} variant='solid' colorScheme='blue'>
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
