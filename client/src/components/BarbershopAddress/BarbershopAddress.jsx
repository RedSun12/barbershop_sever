import styles from './BarbershopAddress.module.css';
import insta from '../../assets/1.png';
import telega from '../../assets/2.png';
import wc from '../../assets/4.png';
import axiosInstance from '../../axiosInstance';
import { useEffect, useState } from 'react';
const { VITE_API } = import.meta.env;

export default function BarbershopAddress() {
  const [contacts, setContacts] = useState({
    adress: '',
    telephone: '',
  });

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`${VITE_API}/foto/contact/`);
      setContacts(data[0]);
    })();
  }, []);

  return (
    <div className={styles.contactInfo}>
      <h1 className={styles.heading}>Контактная информация</h1>
      <p className={styles.manager}>{contacts.adress}</p>
      <a className={styles.phone}>{contacts.telephone}</a>
      <div className={styles.ss}>
        <img src={insta} alt="Instagram" className={styles.image} />
        <img src={telega} alt="Telegram" className={styles.image} />
        <img src={wc} alt="WeChat" className={styles.image} />
      </div>
    </div>
  );
}

