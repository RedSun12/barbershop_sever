import styles from './HomePage.module.css';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import './HomePage.css';
import ChatPage from '../chat/ChatPage';
import YandexMaps from '../../components/YandexMaps/YandexMaps';
import HomePagePhoto from '../../components/HomePagePhoto/HomePagePhoto.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useAppSelector } from '../../redux/hooks.js';

type TState = {
  id: number | string;
  question: string | number;
  answer: string | number;
  themeId: string | number;
  topic: string | number;
};

type TData = {
  data: { cards: Record<any, any>[] };
};

export default function HomePage(): ReactElement {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const { user } = useAppSelector(store => store.userSlice);
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

  return (
    <>
      <div className="homeP">
        {loadingVisible && (
          <div className="loading-screen">
            <div className="loader">
            <img src='/load1.png' alt="Loading" className="loading-image" /> 
            <img src='/load2.png' alt="Loading" className="loading-image spinning" /> 
          </div>
          </div>
        )}

        <div className="contentWrapperHome">
          <h1 className="zagolovok">БАРБЕРШОП СЕВЕР</h1>
          <div className="knopkaNaHome">
            <p className="perviyRaz">Первый раз? Первая стрижка 600 рублей</p>
            <div className="zapisHome">
              <a
                href="w1168615.yclients.com/widgetJS"
                className="ms_booking knopkaZapisHome"
                onClick={loadScript()}
              >
                Записаться online
              </a>
              <div className="image-container">
                <img
                  src="/knopkaHome.svg"
                  alt="Loading"
                  className="loading-image1 main-image"
                />
                <img
                  src="/knopkaHome1.svg"
                  alt="Loading"
                  className="loading-image1 overlay-image"
                />
              </div>
            </div>
          </div>
          <HomePagePhoto />

          <div className="discryptHome">
            В нашем барбершопе вас ожидает отличный опыт! 
            <br/>Мы предоставляем
            профессиональные услуги стрижки волос и бороды, гарантируя, что вы
            будете выглядеть безупречно. 
            <br/>Наши мастера – настоящие специалисты,
            которые помогут подобрать стиль, подходящий именно вам!
          </div>

          <div className="blockDayHear">
            <div className="dayHear">
              <p className="dayText">Стрига дня</p>
              <div className="dayHearDesc">
                <img
                  className="imgDayHear"
                  src="./undercut.png"
                  alt="dayHear"
                />
                <p style={{ paddingTop: '15px' }}>
                  Андеркат — представляет собой короткие виски и удлинённый
                  аккуратный верх. Отличительная черта — отсутствие плавности.
                  Верхние длинные волосы как бы шапкой накрывают височную часть
                  головы.
                </p>
              </div>
            </div>
            <div className="dayHear">
              <p className="dayText">Борода дня</p>
              <div className="dayHearDesc">
                <img
                  className="imgDayHear"
                  src="./dayBoroda.jpg"
                  alt="dayHear"
                />
                <p style={{ paddingTop: '15px' }}>
                  Бретта — классическая версия голливудской бороды,
                  подразумевает наличие довольно пышных усов, которые
                  соединяются с бородой. Усы могут быть тоньше или толще, все
                  зависит от формы лица обладателя.
                </p>
              </div>
            </div>
          </div>

          <div className="discryptHome">
          
          Откройте мир заботы о себе! <br/>В нашем ассортименте вы найдете топовую мужскую косметику.
          </div>

          <div className="dayHear">
            <p className="dayText">Товар дня</p>
            <div className="dayHearDesc">
              <img className="imgDayHear" src="./tovar.png" alt="dayHear" />
              <p style={{ paddingTop: '15px' }}>
                Раньше из-за перхоти я не мог носить чёрный кожак, здороваться с
                братками. Потом, один из моих братков посоветовал мне шампунь
                "Жумайсынба". После первого применения, я сразу же увидел
                результат, и теперь я могу спокойно здороваться с братками и
                радоваться жизни. <br /> Шампунь "Жумайсынба" - скажи перхоти:{' '}
                <br /> "Көзіме көрінбейтін бол э, түсіндің ба!".
              </p>
            </div>
          </div>

          <div className="discryptHome">
            Барбершоп "Север" — это мужское пространство силы и стиля. Уютный
            интерьер с элементами индустриального дизайна, 
            мастера, владеющие искусством классической и современной стрижки.
            <br/>Каждый визит — это ритуал, в котором учтена каждая деталь. 
            <br/>Добро пожаловать в "Север" — место уверенных и стильных мужчин.
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
      {user.id && <ChatPage />}
    </>
  );
}
