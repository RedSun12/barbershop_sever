import { useState } from 'react';
import styles from './FormServices.module.css';
import { Input, Button } from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
const { VITE_API } = import.meta.env;

export default function FormServiсes({ setServices, services }) {
  const [inputs, setInputs] = useState({ name: '', price: '' });
  console.log(inputs);
  const onSubmitHandlet = async (event) => {
    event.preventDefault();
    const newPost = {
      name: inputs.name,
      price: inputs.price,
      foto: '1сервис.png',
    };
    const { data } = await axiosInstance.post(
      `${import.meta.env.VITE_API}/service/`,
      newPost
    );
    setServices([...services, data]);
    setInputs({ name: '', price: '' });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandlet} className={styles.wrapper}>
        <h3 className={styles.head}>Создание услуги</h3>
        <div className={styles.inputs}>
          <Input
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, name: e.target.value }))
            }
            borderColor="#3f3e3e"
            name="name"
            value={inputs.name}
            placeholder="название услуги"
          />
          <Input
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, price: e.target.value }))
            }
            borderColor="#3f3e3e"
            name="price"
            value={inputs.price}
            placeholder="прайс"
          />
        </div>
        <div className={styles.btns}>
          <Button type="submit" colorScheme="blue">
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
}
