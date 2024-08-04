import YandexMaps from "../../components/YandexMaps/YandexMaps";
import BarbershopPhoto from "../../components/BarbershopPhoto/BarbershopPhoto";
import BarbershopAddress from "../../components/BarbershopAddress/BarbershopAddress";
import { useEffect, useState } from 'react';
import './Contacts.module.css';

export default function Contacts() {
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="map">
      {loadingVisible && (
        <div className="loading-screen">
          <div className="loader">
            <img src='/load1.png' alt="Loading" className="loading-image" />
            <img src='/load2.png' alt="Loading" className="loading-image spinning" />
          </div>
        </div>
      )}
      <div className="vertical-wrapper">
        <BarbershopPhoto />
        <div className="horizontal-wrapper">
          <YandexMaps />
          <BarbershopAddress />
        </div>
      </div>
    </div>
  );
}
