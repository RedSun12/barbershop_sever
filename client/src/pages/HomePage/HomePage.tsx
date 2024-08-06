import styles from './HomePage.module.css';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import './HomePage.css';
import ChatPage from '../chat/ChatPage';
import YandexMaps from "../../components/YandexMaps/YandexMaps";
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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
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

      <div className="contentWrapper">
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
            <p className='bigTextHome'>Соцсети:</p>
            <p className='smallTextHome'>иконки</p>
          </div>
        </div>
      </div>
    </div>
    <ChatPage/>
      < Footer />
     </>
  );
}
