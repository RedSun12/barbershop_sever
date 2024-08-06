import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import axiosInstance from '../../axiosInstance';
const { VITE_API } = import.meta.env;

export default function Footer() {
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

      function loadScript() {
        var script = document.createElement('script');
        script.src = 'https://w1168615.yclients.com/widgetJS';
        script.charset = 'UTF-8';
        document.body.appendChild(script);
      } 

      useEffect(() => {
        loadScript();
      }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img className={styles.image} src={'./logoFooter2.png'} alt="Логотип Север" />
                    <div className={styles.name}>БАРБЕРШОП СЕВЕР</div>
                </div>
                <div className={styles.contact}> 
                    <nav className={styles.navigation}>
                        <ul>
                            <li><Link to='/'><strong>Главная</strong></Link></li>
                            <li><Link to='/services'>Услуги</Link></li>
                            <li ><Link to='/product'>Товары</Link></li>
                            <li><Link to='/contact'>Контакты</Link></li>
                            <a href="w1168615.yclients.com/widgetJS" className="ms_booking" onClick={loadScript()}>Записаться</a>
                        </ul>
                    </nav>
                    <div className={styles.info}>
                        <ul>
                            <li className={styles.item}><strong>Контакты</strong></li>
                            <li className={styles.item}>barbershopsever@mail.ru</li>
                            <li className={styles.item}>{contacts.telephone}</li>
                            <li className={styles.item}><Link to='/instagram'>наш instagram</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}