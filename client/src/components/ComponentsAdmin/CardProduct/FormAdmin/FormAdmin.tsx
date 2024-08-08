import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './FormAdmin.module.css';
import { Input, Button } from '@chakra-ui/react';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchAddEntry } from '../../../../redux/thunkActions';
import { Inputs } from '../../../../types/types';


export default function FormAdmin() {
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState<Inputs>({ title: '', manufacturer: '', composition: '', hairType: '', size: '', price: 0 });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: FormEvent<any>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('image', e.currentTarget.image.files);
    dispatch(fetchAddEntry(formData));
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>Добавь товар:</h3>
      <div className={styles.inputs}>

        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='title'
          value={inputs.title}
          placeholder='Название'
        />
        <div className={styles.pad}></div>
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='image'
          placeholder='Фото'
          type='file'
          className={styles.inImage}
          accept="image/*"
        />
        <div className={styles.pad}></div>
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='manufacturer'
          value={inputs.manufacturer}
          placeholder='Производитель'
        />
        <div className={styles.pad}></div>
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='composition'
          value={inputs.composition}
          placeholder='Состав'
        />
        <div className={styles.pad}></div>
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='hairType'
          value={inputs.hairType}
          placeholder='Тип волос'
        />
        <div className={styles.pad}></div>
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='size'
          value={inputs.size}
          placeholder='Объем'
        />
        <div className={styles.pad}></div>
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='price'
          value={inputs.price}
          placeholder='Стоимость'
        />
      </div>
      <div className={styles.btns}>
        <Button type='submit' colorScheme='blue'>
          Создать
        </Button>
      </div>
    </form>
  );
}
