import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Form.module.css';
import { Input, Button } from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAddEntry } from '../../redux/thunkActions';
import { Inputs } from '../../types/types';


export default function Form() {
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState<Inputs>({ title: '', image: '', manufacturer: '', composition: '', hairType: '', size: '' });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // userId: DataTypes.INTEGER,
  // title: DataTypes.STRING,
  // image: DataTypes.STRING,
  // manufacturer: DataTypes.STRING,
  // composition: DataTypes.TEXT,
  // hairType: DataTypes.TEXT,
  // size: DataTypes.STRING,

  // title,
  // image,
  // manufacturer,
  // composition,
  // hairType,
  // size,

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAddEntry(inputs));
    setInputs({ title: '', image: '', manufacturer: '', composition: '', hairType: '', size: '' });
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>Добавь своего кита:</h3>
      <div className={styles.inputs}>

      <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='title'
          value={inputs.title}
          placeholder='Название'
        />
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='image'
          value={inputs.image}
          placeholder='Фото'
        />
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='manufacturer'
          value={inputs.manufacturer}
          placeholder='Производитель'
        />
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='composition'
          value={inputs.composition}
          placeholder='Состав'
        />
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='hairType'
          value={inputs.hairType}
          placeholder='Тип волос'
        />
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='size'
          value={inputs.size}
          placeholder='Объем'
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
