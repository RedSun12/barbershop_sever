import YandexMaps from "../../components/YandexMaps/YandexMaps"
import styles from './Contacts.module.css';
import BarbershopPhoto from "../../components/BarbershopPhoto/BarbershopPhoto";
import BarbershopAddress from "../../components/BarbershopAddress/BarbershopAddress";
import React, { useEffect, useState } from 'react';


export default function Contacts() {
  const [loadingVisible, setLoadingVisible] = useState(true); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.map}>
      {loadingVisible && (
        <div className="loading-screen">
          <div className="loader">
            <img src='/load1.png' alt="Loading" className="loading-image" /> 
            <img src='/load2.png' alt="Loading" className="loading-image spinning" /> 
          </div>
        </div>
      )}
      <BarbershopPhoto />
      <div className={styles.horizontalWrapper}>
        <YandexMaps />
        <BarbershopAddress />
      </div>
    </div>
  )
}
