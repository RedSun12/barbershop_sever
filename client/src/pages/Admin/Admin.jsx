import styles from './Admin.module.css';
import FormServicesUpdate from '../../components/ComponentsAdmin/FormServicesUpdate/FormServicesUpdate';
import BarberspopAdressAdmin from '../../components/ComponentsAdmin/BarberspopAdressAdmin/BarberspopAdressAdmin'
import FormAdmin from '../../components/ComponentsAdmin/CardProduct/FormAdmin/FormAdmin'
import ListAdmin from '../../components/ComponentsAdmin/CardProduct/ListAdmin/ListAdmin'
import SliderAdmin from '../../components/ComponentsAdmin/SliderAdmin/SliderAdmin';
import { useState } from 'react';

export default function Admin() {

  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'FormServicesUpdate':
        return <FormServicesUpdate />;
      case 'BarberspopAdressAdmin':
        return <BarberspopAdressAdmin />;
      case 'FormAdmin':
        return <>
        <FormAdmin />
        <ListAdmin />
        </>;
      case 'SliderAdmin':
        return <SliderAdmin />;
      default:
        return null;
    }
  };
  
  return (
    <div className={styles.admin}>
      <div className={styles.buttons}>
        <button onClick={() => setActiveComponent('FormServicesUpdate')}>Услуги</button>
        <button onClick={() => setActiveComponent('BarberspopAdressAdmin')}>Контакты</button>
        <button onClick={() => setActiveComponent('FormAdmin')}>Товары</button>
        <button onClick={() => setActiveComponent('SliderAdmin')}>Слайдер</button>
      </div>
      <div className={styles.componentContainer}>
        {renderComponent()}
      </div>
    </div>
  );
}

