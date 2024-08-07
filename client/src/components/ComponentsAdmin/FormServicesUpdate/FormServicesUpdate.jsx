import styles from './FormServicesUpdate.module.css';
import axiosInstance from '../../../axiosInstance';
import { useEffect, useState } from 'react';
import FormServicesAdmin from '../FormServicesAdmin/FormServicesAdmin';
const { VITE_API } = import.meta.env;

export default function FormServicesUpdate() {
  
    const [services, setServices] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '',comment: '', foto: null });
  
console.log(formData, 'asdasd')

    useEffect(() => {
      (async function () {
        const { data } = await axiosInstance.get(`${VITE_API}/service`);
        setServices(data);
      })();
    }, [editing]);

    // console.log(data)

    const changeHandler = (e) => {
      const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
      // setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = async (e) => {
      e.preventDefault();
      const formDataEdit = new FormData(e.target);
      formDataEdit.append('name', formData.name);
      formDataEdit.append('price', formData.price);
      formDataEdit.append('comment', formData.comment);
      if (formData.foto) {
        formDataEdit.append('foto', e.target.foto.value);
      }
      const headers = {
        'Content-Type': 'multipart/form-data', 
      }
      // console.log('GHHBUHHUBUHBUHBUH!!!!', formData.name)
      // formData.append('foto', e.target.imageGroup.value);
      // formData.append('user', user.id);
      // const queryString = new URLSearchParams(formData).toString()
      // console.log(queryString);
      // console.log(editing)
      const res = await axiosInstance.put(`${VITE_API}/service/${editing}`, formDataEdit, { headers: headers });
      console.log(res)
      // if (res.status === 200) {
      //   navigate('/myCard')
      // }
      setEditing(null);
    };
  
    const handleDelete = async (id) => {
      await axiosInstance.delete(`${VITE_API}/service/${id}`);
      setServices(services.filter((service) => service.id !== id));
    };
  
    const handleEdit = (service) => {
      setEditing(service.id);
      setFormData({ name: service.name, price: service.price, comment: service.comment });
      // console.log(formData);
    };
  
    // const handleSave = async (id) => {
    //   const formDataToSend = new FormData();
    //   console.log('forma', formData)
    //   formDataToSend.append('name', formData.name);
    //   formDataToSend.append('price', formData.price);
    //   if (formData.foto) {
    //     formDataToSend.append('foto', formData.foto);
    //   }
    //   console.log('dsfassdfsdf', formDataToSend);

    //   await axiosInstance.put(`${VITE_API}/service/${id}`, formDataToSend);
    //   setServices(
    //     services.map((service) =>
    //       service.id === id ? { ...service, ...formData } : service
    //     )
    //   );
    //   setEditing(null);
    // };
  
    const handleChange = (e) => {
      const { name, value, type } = e.target;
      if (type === 'file') {
        setFormData({ ...formData, [name]: e.target.files[0] });
      } else {
        setFormData({ ...formData, [name]: value });
      }
      // setFormData({ ...formData, [name]: value });
    };


  return (
<>
      <div className={styles.container}>
        {services.map((el) => (
          <div key={el.id} className={styles.serviceCard}>
            <img src={`http://localhost:3100/${el?.foto}`} alt="foto" className={styles.serviceImage} />
            {editing === el.id ? (
              <form onSubmit={submitHandler} className={styles.serviceText}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                />
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={changeHandler}
                />
                <input
                  type="file"
                  name="foto"
                  onChange={changeHandler}
                  accept="image/*"
                />
                <input
                  type="text"
                  name="comment"
                  value={formData.comment}
                  onChange={changeHandler}
                />
                
                <button className={styles.button} type='submit' >Сохранить</button>
              </form>
            ) : (
              <div className={styles.serviceText}>
                {/* <img src={`http://localhost:3100/${el?.foto}`} alt="foto" /> */}
                <p>{el.name}</p>
                <p>{el.price}</p>
                <p>{el.comment}</p>
                <button className={styles.button} onClick={() => handleEdit(el)}>Редактировать</button>
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => handleDelete(el.id)}
            >
              Удалить
            </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <FormServicesAdmin setServices={setServices} services={services} />
    </>
  )
}
