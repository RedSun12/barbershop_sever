import styles from './FormServicesUpdate.module.css';
import axiosInstance from '../../../axiosInstance';
import { useEffect, useRef, useState } from 'react';
import FormServicesAdmin from '../FormServicesAdmin/FormServicesAdmin';
const { VITE_API } = import.meta.env;

export default function FormServicesUpdate() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    comment: '',
    foto: null,
  });
  const [expanded, setExpanded] = useState({});

  // const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`${VITE_API}/service`);
      setServices(data);
    })();
  }, [editing]);

  // console.log(editing)

  const changeHandler = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
      console.log('asdsdfsfsfd', formData)
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formDataEdit = new FormData(e.target);
    formDataEdit.append('name', formData.name);
    formDataEdit.append('price', formData.price);
    formDataEdit.append('comment', formData.comment);
    // console.log(formData)
    // console.log(fileInputRef.current);
    if (formData.foto) {
      formDataEdit.append('foto', formData.foto);
    }
    console.log(formDataEdit)
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const res = await axiosInstance.put(
      `${VITE_API}service/${editing}`,
      formData,
      { headers: headers }
    );
    console.log('RESPONSE!!!!!!', res);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`${VITE_API}/service/${id}`);
    setServices(services.filter((service) => service.id !== id));
  };

  const handleEdit = (service) => {
    setEditing(service.id);
    setFormData({
      name: service.name,
      price: service.price,
      comment: service.comment,
    });
  };

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <>
      <div className={styles.container}>
        {services.map((el) => (
          <div key={el.id} className={styles.serviceCard}>
            <img
              src={`http://localhost:3100/${el?.foto}`}
              alt="foto"
              className={styles.serviceImage}
            />
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
                  id="foto"
                  type="file"
                  name="foto"
                  onChange={changeHandler}
                  accept="image/*"
                  // ref={fileInputRef}
                />
                <input
                  type="text"
                  name="comment"
                  value={formData.comment}
                  onChange={changeHandler}
                />
                <button className={styles.button} type="submit">
                  Сохранить
                </button>
              </form>
            ) : (
              <div className={styles.serviceText}>
                <p>{el.name}</p>
                <p>{el.price}р.</p>
                <div
                  className={`${styles.expandableComment} ${
                    expanded[el.id] ? styles.expanded : ''
                  }`}
                >
                  <p className={styles.commentText}>{el.comment}</p>
                </div>
                <button
                  className={styles.readMoreButton}
                  onClick={() => toggleExpand(el.id)}
                >
                  {expanded[el.id] ? 'Скрыть' : 'Читать дальше'}
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleEdit(el)}
                >
                  Редактировать
                </button>
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
  );
}
