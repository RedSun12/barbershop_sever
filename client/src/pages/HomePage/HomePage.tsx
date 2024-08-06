import styles from './HomePage.module.css';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import './HomePage.css';
import ChatPage from '../chat/ChatPage';
import YandexMaps from "../../components/YandexMaps/YandexMaps";
import HomePagePhoto from "../../components/HomePagePhoto/HomePagePhoto.jsx"
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

type TState = {
  id: number | string,
  question: string | number,
  answer: string | number,
  themeId: string | number,
  topic: string | number,
}

type TData = {
  data: { cards: Record<any, any>[] }
}

export default function HomePage(): ReactElement {
  const [loadingVisible, setLoadingVisible] = useState(true); 

  function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://w1168615.yclients.com/widgetJS';
    script.charset = 'UTF-8';
    document.body.appendChild(script);
  } 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadScript();
  }, []);
  // const [presentCard, setPresentCard] = useState<TState[]>([]);

  // const getAllCards = (): Promise<void> => {
  //   return axios.get(`http://localhost:3100/api/all/cards`)
  //     .then((data: TData) => {
  //       const newData = data.data.cards.map((elem: Record<string, number | string>) => {
  //         return {
  //           id: elem.id,
  //           img: elem.img,
  //           name: elem.name,
  //         }
  //       });
  //       setPresentCard(newData);
  //     });
  // }

  // useEffect(() => {
  //   getAllCards();
  // }, []);

  return (
    <>
    <div className='homeP'>
      {loadingVisible && (
        <div className="loading-screen">
          <div className="loader">
            <img src='/load1.png' alt="Loading" className="loading-image" /> 
            <img src='/load2.png' alt="Loading" className="loading-image spinning" /> 
          </div>
        </div>
      )}

      <div className="contentWrapperHome">

        <h1 className='zagolovok'>
          БАРБЕРШОП СЕВЕР
        </h1>
        <div className='knopkaNaHome'>
          <p className='perviyRaz'>
            Первый раз? Первая стрижка 600 рублей
          </p>
          <div className='zapisHome'>
            <a href="w1168615.yclients.com/widgetJS" className="ms_booking knopkaZapisHome" onClick={loadScript()}>Записаться online</a>
            <div className="image-container">
              <img src='/knopkaHome.svg' alt="Loading" className="loading-image1 main-image" /> 
              <img src='/knopkaHome1.svg' alt="Loading" className="loading-image1 overlay-image" /> 
            </div>
          </div>
        </div>
        <HomePagePhoto/>

        {/* <div className="yandexMap">
          <YandexMaps style={{ height: '750px', width: '850px' }} />
          <div className="overlay"></div>
        </div> */}
        
        {/* <div className='homeContacts'>
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
            <p className='bigTextHome'>Соцсети:</p>
            <p className='smallTextHome'>иконки</p>
          </div>
        </div> */}

        <div>

        </div>

      </div>
    </div>
    <ChatPage/>
      < Footer />
     </>
  );
}
