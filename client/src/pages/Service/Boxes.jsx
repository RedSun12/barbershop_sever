import styles from './Services.module.css';
import { Accordion, AccordionButton, Card, AccordionIcon, AccordionItem, AccordionPanel, Box, CardBody } from '@chakra-ui/react';

export default function Boxes({el}) {

  return (
    <div>
    <Card >
        <CardBody>
          <div className={styles.serviceCard}>
            <img src={`http://localhost:3100/${el?.foto}`} alt="foto" className={styles.serviceImage} />
            <div className={styles.serviceDetails}>
              <p>{el.name}</p>
              <p>{el.price}</p>
            <Accordion  allowMultiple className={styles.flex}>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </AccordionPanel>
                </AccordionItem>
        </Accordion>
            </div>
            <div className={styles.svg}></div>
          </div>
        </CardBody>
    </Card>
    </div>
  )
}
