import styles from './Services.module.css';
import axiosInstance from '../../axiosInstance';
import { useEffect, useState } from 'react';
import FormServiсes from '../../components/FormServices/FormServiсes';
import Footer from '../../components/Footer/Footer';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
const { VITE_API } = import.meta.env;

export default function Services() {
  const [services, setServices] = useState([]);
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`${VITE_API}/service`);
      setServices(data);
    })();
  }, []);

  return (
    <div className={styles.container}>
      {loadingVisible && (
        <div className="loading-screen">
          <div className="loader">
            <img src="/load1.png" alt="Loading" className="loading-image" />
            <img
              src="/load2.png"
              alt="Loading"
              className="loading-image spinning"
            />
          </div>
        </div>
      )}
      <div className={styles.serviceContainer}>
        {services.map((service) => (
          <div className={styles.serviceCard} key={service.id}>
            <img
              src={`http://localhost:3100/${service.foto}`}
              alt="foto"
              className={styles.serviceImage}
            />
            <div className={styles.serviceDetails}>
              <p>{service.name}</p>
              <p>{service.price}р.</p>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Подробнее
                    </Box>
                    <AccordionIcon color="black" />
                  </AccordionButton>
                  <AccordionPanel pb={4} color="black">
                    Какое т
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
