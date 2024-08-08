import { useState } from 'react';
import styles from './FormServicesAdmin.module.css';
import { Input, Button } from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
const { VITE_API } = import.meta.env;
// const multer = require("multer");
// const upload = multer({ dest: 'public/image/' })

export default function FormServicesAdmin({ setServices, services }) {
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    comment: '',
    foto: null,
  });
  console.log(inputs, 'asasdasd');
  const onSubmitHandlet = async (event) => {
    event.preventDefault();
    console.log(event);
    const formData = new FormData(event.target);
    formData.append('foto', event.target.foto.value);
    // console.log(event.target)
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    formData.append('name', inputs.name);
    formData.append('price', inputs.price);
    formData.append('comment', inputs.comment);
    // console.log(inputs.name)
    // formData.append('user', user.id);
    // const newPost = {
    //   name: inputs.name,
    //   price: inputs.price,
    //   foto: inputs.photo,
    // };
    const res = await axiosInstance.post(`${VITE_API}/service`, formData, {
      headers: headers,
    });
    if (res.status === 200) {
      setServices((prev) => [...prev, res.data]);
      setInputs({ name: '', price: '', comment: '' });
    }
    // setServices([...services, data]);
    // setInputs({ name: '', price: '', photo: '' });
  };

  // const changeHandler = (e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleFileChange = (e) => {
    setInputs((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  return (
    <div className={styles.box}>
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

          <div className={styles.inputFileWrapper}>
            <label htmlFor="file-upload" className={styles.inputFileLabel}>
              Загрузить фото
              <input
                id="file-upload"
                type="file"
                className={styles.inputFile}
                name="foto"
                onChange={handleFileChange}
              />
            </label>
          </div>
          
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
          <Input
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, comment: e.target.value }))
            }
            borderColor="#3f3e3e"
            name="comment"
            value={inputs.comment}
            placeholder="комментарий"
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
  );
}
