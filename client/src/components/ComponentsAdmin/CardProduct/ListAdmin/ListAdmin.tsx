import { useEffect } from 'react';
import styles from './ListAdmin.module.css';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchEntries } from '../../../../redux/thunkActions';
import { Spinner } from '@chakra-ui/react';
import CardAdmin from '../CardAdmin/CardAdmin';

export default function List() {
  const {entries, isLoading} = useAppSelector((store) => store.productSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spinner
          thickness='5px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      ) : (
        <div className={styles.wrapper}>
          {entries.length
            ? entries?.map((entry: { id: any; title: string; image: string; manufacturer: string; composition: string; hairType: string; size: string; createdAt: Date; updatedAt: Date; }) => <CardAdmin key={entry.id} entry={entry} />)
            : null}
        </div>
      )}
    </>
  )
}
