import styles from './Admin.module.css';
import FormServicesUpdate from '../../components/ComponentsAdmin/FormServicesUpdate/FormServicesUpdate';
import BarberspopAdressAdmin from '../../components/ComponentsAdmin/BarberspopAdressAdmin/BarberspopAdressAdmin'
import FormAdmin from '../../components/ComponentsAdmin/CardProduct/FormAdmin/FormAdmin'
import ListAdmin from '../../components/ComponentsAdmin/CardProduct/ListAdmin/ListAdmin'

export default function Admin() {
  return (
    <div className={styles.admin}>
      <FormServicesUpdate />
      <BarberspopAdressAdmin/>
      <FormAdmin/>
      <ListAdmin/>
    </div>
  )
}


