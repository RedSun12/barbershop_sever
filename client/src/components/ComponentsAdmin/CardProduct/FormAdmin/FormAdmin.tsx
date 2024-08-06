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
    // formData.append('title', e.currentTarget.title.value);
    formData.append('image', e.currentTarget.image.files);
    // formData.append('user', user.id);
    // console.log('CURRENT', e.target);
    // console.log('formDATA!!!', formData);
    // for(const [k,v] of formData) {
    //   console.log(k, v)
    // }
    dispatch(fetchAddEntry(formData));
    // setInputs({ title: '', manufacturer: '', composition: '', hairType: '', size: '', price: 0 });
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
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='image'
          // value={inputs.image}
          placeholder='Фото'
          type='file'
          height={'100px'}
          accept="image/*"
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
