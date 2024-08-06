import YandexMaps from "../../components/YandexMaps/YandexMaps";
import BarbershopPhoto from "../../components/BarbershopPhoto/BarbershopPhoto";
import BarbershopAddress from "../../components/BarbershopAddress/BarbershopAddress";
import { useEffect, useState } from 'react';
import './Contacts.module.css';
import './Contacts.css';

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
        {/* <div className="horizontal-wrapper">
          <YandexMaps />
          <BarbershopAddress />
        </div> */}
      </div>

      <div className="contentWrapperCont">
        <div className="yandexMap">
          <YandexMaps style={{ height: '750px', width: '850px' }} />
          <div className="overlay"></div>
        </div>
        
        <div className='homeContacts'>
          <p className='headContact'>Контакты:</p>
          <div className='contInf'>
            <p className='bigTextHome'>ТЦ "Лента"</p>
            <p className='smallTextHome'>ул. Победы, д. 138, 2 этаж</p>
          </div>
          <div className='contInfTel'>
            <p className='bigTextHome'>Телефон:</p>
            <p className='smallTextHome'>+7 (915) 915 95 15</p>
          </div>
          <div className='contInfIcon'>
            <p className='bigTextHome'>Наши соцсети:</p>
            <p className='smallTextHome'>
              <a href="https://t.me/ссылка телеграм">
                <i class="fab fabte fa-telegram fa-4x"></i>
              </a>
              <a href="https://t.me/ссылка инста">
                <i class="fab fabin fa-instagram fa-4x"></i>
              </a>
              <a href="https://t.me/ссылка вк">
                <i class="fab fabvk fa-vk fa-4x"></i>
              </a>
              <a href="https://wa.me/qr/ссылка на ватсап">
                <i class="fab fabw fa-whatsapp fa-4x"></i>
              </a>
              </p>

          </div>
        </div>
      </div>
    </div>
  );
}
