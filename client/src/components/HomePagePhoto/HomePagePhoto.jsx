import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axiosInstance from '../../axiosInstance';
import styles from './HomePagePhoto.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const { VITE_API } = import.meta.env;

const HomePagePhoto = () => {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`${VITE_API}/foto`);
      setFotos(data);
    })();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className={styles.containerH}>
      <Slider {...settings}>
        {fotos.map(foto => (
          <div key={foto.id} className={styles.slideH}>
            <img src={foto.foto} alt="Barbershop" className={styles.fotoH} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePagePhoto;