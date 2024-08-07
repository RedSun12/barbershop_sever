import styles from './FormServicesUpdate.module.css';
import axiosInstance from '../../../axiosInstance';
import { useEffect, useState } from 'react';
import FormServicesAdmin from '../FormServicesAdmin/FormServicesAdmin';
const { VITE_API } = import.meta.env;

export default function FormServicesUpdate() {
  
    const [services, setServices] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '' });
  
    useEffect(() => {
      (async function () {
        const { data } = await axiosInstance.get(`${VITE_API}/service`);
        setServices(data);
      })();
    }, []);
  
    const handleDelete = async (id) => {
      await axiosInstance.delete(`${VITE_API}/service/${id}`);
      setServices(services.filter((service) => service.id !== id));
    };
  
    const handleEdit = (service) => {
      setEditing(service.id);
      setFormData({ name: service.name, price: service.price });
    };
  
    const handleSave = async (id) => {
      await axiosInstance.put(`${VITE_API}/service/${id}`, formData);
      setServices(
        services.map((service) =>
          service.id === id ? { ...service, ...formData } : service
        )
      );
      setEditing(null);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };


  return (
    <>
    <div className={styles.container}>
      {services.map((el) => (
        <div key={el.id} className={styles.serviceCard}>
          <img src={`http://localhost:3100/${el?.foto}`} alt="foto" className={styles.serviceImage} />
          {editing === el.id ? (
            <div className={styles.serviceText}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className={styles.serviceText}>
              <p>{el.name}</p>
              <p>{el.price}</p>
            </div>
          )}
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() =>
                editing === el.id ? handleSave(el.id) : handleEdit(el)
              }
            >
              {editing === el.id ? 'Сохранить' : 'Редактировать'}
            </button>
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => handleDelete(el.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>

    <FormServicesAdmin setServices={setServices} services={services} />
    </>
  )
}
