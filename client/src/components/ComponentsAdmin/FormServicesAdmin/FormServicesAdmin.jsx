import { useState } from 'react';
import styles from './FormServicesAdmin.module.css';
import { Input, Button } from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
const { VITE_API } = import.meta.env;
// const multer = require("multer");
// const upload = multer({ dest: 'public/image/' })

export default function FormServicesAdmin({ setServices, services }) {
    const [inputs, setInputs] = useState({ name: '', price: '' });
    const onSubmitHandlet = async (event) => {
      event.preventDefault();
      console.log(event)
      const formData = new FormData(event.target);
      formData.append('foto', event.target.foto.value);
      const headers = {
        'Content-Type': 'multipart/form-data', 
        
      }
      formData.append('name', inputs.name);
      formData.append('price', inputs.price);
      console.log(inputs.name)
      // formData.append('user', user.id);
      // const newPost = {
      //   name: inputs.name,
      //   price: inputs.price,
      //   foto: inputs.photo,
      // };
      console.log(formData)
      const res = await axiosInstance.post(
        `${VITE_API}service`,
        formData,
        { headers: headers }
      );
      if (res.status === 200) {
        setServices((prev) => [...prev, res.data]);
        setInputs({ name: '', price: '' });
      }
      // setServices([...services, data]);
      // setInputs({ name: '', price: '', photo: '' });
    };

    // const changeHandler = (e) => {
    //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };

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
            color={'white'}
          />
          <Input
            // onChange={(e) =>
            //   setInputs((prev) => ({ ...prev, foto: e.target.value }))
            // }
            borderColor="#3f3e3e"
            name="foto"
            // value={inputs.foto}
            placeholder="фото"
            type='file'
            color={'white'}
          />
          <Input
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, price: e.target.value }))
            }
            borderColor="#3f3e3e"
            name="price"
            value={inputs.price}
            placeholder="прайс"
            color={'white'}
          />
        </div>
        <div className={styles.btns}>
          <Button type="submit" colorScheme="blue">
            Создать
          </Button>
        </div>
      </form>
    </div>
  )
}
