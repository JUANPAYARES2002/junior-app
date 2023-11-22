/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { Link } from 'react-router-dom';
import styles from './NewPassword.module.css';

export function NewPassword() {
  return (
    <form className={styles.containerNewPassword}>
      <div>
        <h2 className={styles.titleNewPassword}>¿Olvidaste tu Contraseña?</h2>
        <label htmlFor="email" />
        <input type="email" className={styles.inputEmail} placeholder="Email" name="email" required />
        <button type="submit" className={styles.buttonNewPassword}>Cambiar Contraseña</button>
        <span className={styles.back}><Link className={styles.link} to="/">Regresar</Link></span>
      </div>
    </form>
  );
}
