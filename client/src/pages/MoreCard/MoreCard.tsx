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
} from '@chakra-ui/react';
import { useAppSelector } from '../../redux/hooks';
// import { addToBusket, fetchDelEntry } from '../../redux/thunkActions';
import { useParams } from 'react-router-dom'; 
import Footer from '../../components/Footer/Footer';

export default function MoreCard() {
  const {id} = useParams();
  
  const entry = useAppSelector((store) => store.productSlice.entries);
  const entryProduct = entry.filter((el)=> el.id === Number(id))[0]

  // console.log(id)
  // console.log(entryProduct)
  
  return (
    <div className={styles.wrapper}>
      <Card sx={{ boxShadow: "none", background: "transparent", padding: 0 }} className={styles.container} maxW='sm'>
        <CardBody className={styles.body}>
          <Stack mt='3' spacing='3'>
            <Box boxSize='sm'>
              <Image className={styles.image} borderRadius={'7px'} objectFit={'cover'} overflow={'hidden'} width={'100%'} height={'600px'} src={`http://localhost:3100/${entryProduct?.image}`} alt='PhotoProduct' />
            </Box>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Heading size='md'>{entryProduct?.title}</Heading>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Text>{entryProduct?.manufacturer}</Text>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Text>{entryProduct?.composition}</Text>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Text>{entryProduct?.hairType}</Text>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Text>{entryProduct?.size}</Text>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Text>{entryProduct?.price}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          
        </CardFooter>
      </Card>
      <div className={styles.footer}>
          <Footer />
      </div>
    </div>
  )
}
