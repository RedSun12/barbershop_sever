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
  Card,
  CardBody,
} from '@chakra-ui/react';
import Boxes from './Boxes';
const { VITE_API } = import.meta.env;

export default function Services() {
  const [services, setServices] = useState([]);
  const [loadingVisible, setLoadingVisible] = useState(true);
console.log(services, 'serv')
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
    <div className={styles.pageContainer}>
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
      <div className={styles.mainContent}>
        <div className={styles.serviceContainer}>
          {services.map((el) => (
            <div key={el.id}>
              <Card className={styles.card}>
                <CardBody style={{ padding: '0' }}>
                  <div className={styles.serviceCard}>
                    <img
                      src={`http://localhost:3100/${el?.foto}`}
                      alt="foto"
                      className={styles.serviceImage}
                    />
                    <div className={styles.serviceDetails}>
                      <p>{el.name}</p>
                      <p>{el.price}р.</p>
                      <Accordion allowMultiple className={styles.flex}>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box
                                as="span"
                                flex="1"
                                textAlign="left"
                                width="100%"
                              >
                                Описание
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4} color={'black'}>
                            {el.comment}
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div className={styles.svg}></div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div >
      <div className={styles.footer}>
      <Footer />
      </div>
    </div>
  );
}