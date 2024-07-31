import styles from './Services.module.css';
import axiosInstance from '../../axiosInstance';
import { useEffect, useState } from 'react';
import FormServiсes from '../../components/FormServices/FormServiсes';

const { VITE_API } = import.meta.env;

export default function Services() {
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
    <div className={styles.container}>
    {services.map((el) => (
      <div key={el.id} className={styles.serviceCard}>
        <img src={el.foto} alt="foto" className={styles.serviceImage} />
        <div className={styles.serviceDetails}>
          <p>{el.name}</p>
          <p>{el.price}</p>
        </div>
      </div>
    ))}
  </div>
  );
}
