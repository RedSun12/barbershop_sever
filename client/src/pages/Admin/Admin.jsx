import styles from './Admin.module.css';
import FormServicesUpdate from '../../components/ComponentsAdmin/FormServicesUpdate/FormServicesUpdate';
import BarberspopAdressAdmin from '../../components/ComponentsAdmin/BarberspopAdressAdmin/BarberspopAdressAdmin'
import SliderAdmin from '../../components/ComponentsAdmin/SliderAdmin/SliderAdmin';


export default function Admin() {
  return (
    <div className={styles.admin}>
      <FormServicesUpdate />
      <BarberspopAdressAdmin/>
      <SliderAdmin/>
    </div>
  )
}


