import styles from './Services.module.css';
import axiosInstance from '../../axiosInstance';
import { useEffect, useState } from 'react';
import FormServiсes from '../../components/FormServices/FormServiсes';
import Footer from '../../components/Footer/Footer';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
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

  const handleSave = async (id) => {
    await axiosInstance.put(`${VITE_API}/service/${id}`, formData);
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...formData } : service
      )
    );
    setEditing(null);
  };

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
        {services.map((el) => (
          <div key={el.id} className={styles.serviceCard}>
            <img src={el.foto} alt="foto" className={styles.serviceImage} />
            <div className={styles.serviceDetails}>
              <p>{el.name}</p>
              <p>{el.price}р.</p>
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Описание
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
            <div className={styles.svg}></div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
