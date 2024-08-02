import List from '../../components/List/List';
import styles from './ProductPage.module.css';
import Form from '../../components/Form/Form';
import { useEffect, useState } from 'react';
import './ProductPage.css'

export default function ProductPage() {
  const [loadingVisible, setLoadingVisible] = useState(true); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={styles.wrapper}>
      {loadingVisible && (
        <div className="loading-screen">
          <div className="loader">
            <img src='/load1.png' alt="Loading" className="loading-image" /> 
            <img src='/load2.png' alt="Loading" className="loading-image spinning" /> 
          </div>
        </div>
      )}
      <Form />
      <List />
    </div>
  );
}
