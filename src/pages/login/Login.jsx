/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './Login.module.css';
import { auth, signInWithEmailAndPassword } from '../../connection/firebase';
import { toastMessage } from '../../utils/toast';
import junior from '../../img/junior.png';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/PlayerList');
  }, [user, loading]);

  function handleLogin() {
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
    if (!email.match(regexp)) {
      toastMessage('error', 'Please insert a valid email!', 'error_pwd');
    } else if (password.length < 8) {
      toastMessage('error', 'Password must be at least 8 characters!', 'error_pwd');
    } else {
      signInWithEmailAndPassword(email, password);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.containerLogin}>
        <img className={styles.logo} src={junior} alt="logo" />
        {/* <h2 className={styles.titleLogin}>Bienvenido</h2> */}
        <div>
          <input
            type="text"
            className={styles.inputText}
            id="name"
            placeholder="Correo electronico"
            name="uname"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            className={styles.inputPassword}
            id="password"
            placeholder="Contraseña"
            name="psw"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div className={styles.linkButton}>
            <button type="button" className={styles.buttonLogin} onClick={() => handleLogin()}>
              Ingresar
            </button>
          </div>
        </div>
        <span className={styles.cna}>
          <Link className={styles.link} to="/Register">Crear Nueva Cuenta</Link>
        </span>
      </form>
    </div>
  );
}
