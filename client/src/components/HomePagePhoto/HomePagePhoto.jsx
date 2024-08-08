import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axiosInstance from '../../axiosInstance';
import styles from './HomePagePhoto.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const { VITE_API } = import.meta.env;

const HomePagePhoto = () => {
  const [fotosH, setFotosH] = useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`${VITE_API}/fotoH`);
      setFotosH(data);
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
    arrows: false,
  };

  return (
    <div className={styles.containerH}>
      <Slider {...settings}>
        {fotosH.map(fotoH => (
          <div key={fotoH.id} className={styles.slideH}>
                    <div className="proz">
            <img src={fotoH.fotoH} alt="Barbershop" className={styles.fotoH} />
            {fotoH.isFeatured3 && (
              <img
                src="./homesl1.png"
                alt="Overlay"
                className={styles.overlayImage1}
              />
            )}
            {fotoH.isFeatured2 && (
              <img
                src="./home2.png"
                alt="Overlay"
                className={styles.overlayImage2}
              />
            )}
            {fotoH.isFeatured1 && (
              <img
                src="./homesl2.png"
                alt="Overlay"
                className={styles.overlayImage3}
              />
            )}
            {fotoH.isFeatured4 && (
              <img
                src="./homesl3.png"
                alt="Overlay"
                className={styles.overlayImage4}
              />
            )}
          </div>
          </div>
        ))}


      </Slider>
    </div>
  );
};

export default HomePagePhoto;
