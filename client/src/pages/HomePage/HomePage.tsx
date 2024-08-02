import styles from './HomePage.module.css';
import { Card } from '@chakra-ui/react';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import './HomePage.css';

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
    <div className='homeP'>
      {loadingVisible && (
        <div className="loading-screen">
          <div className="loader">
            <img src='/load1.png' alt="Loading" className="loading-image" /> 
            <img src='/load2.png' alt="Loading" className="loading-image spinning" /> 
          </div>
        </div>
      )}
      <div className="homeCard">
        {/* <Card presentCard={presentCard} /> */}
      </div>
    </div>
  );
}
