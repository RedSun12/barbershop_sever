import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Form.module.css';
import { Input, Button } from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAddEntry } from '../../redux/thunkActions';
import { Inputs } from '../../types/types';


export default function Form() {
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState<Inputs>({ title: '', manufacturer: '', composition: '', hairType: '', size: '', price: 0 });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('imageGroup', e.target.image.value);
    formData.append('user', user.id);
    console.log('HGFGFFFFFFFFF', formData)
    // const queryString = new URLSearchParams(formData).toString()
    dispatch(fetchAddEntry(inputs));
    if (res.status === 200) {
      setInputs({ title: '', manufacturer: '', composition: '', hairType: '', size: '', price: 0 });
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>Добавить товар:</h3>
      <div className={styles.inputs}>

      <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='title'
          value={inputs.title}
          placeholder='Название'
        />
        <Input
          // onChange={changeHandler}
          borderColor='#3f3e3e'
          name='image'
          // value={inputs.image}
          placeholder='Фото'
          type="file"
          height='50px'
          fontSize='14px'
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
