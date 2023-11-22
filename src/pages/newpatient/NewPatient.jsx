/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../../NavBar';
import styles from './NewPatient.module.css';
import junior from '../../img/junior.png';
import { addPatient } from '../../connection/firebase';

function NewPatient({ userName }) {
  const [newPatient, setNewPatient] = useState({
    nameP: '',
    age: '',
    bdate: '',
    idDoc: '',
    address: '',
    email: '',
    tel: '',
    weight: '',
    height: '',
    inCharge: userName.name,
  });
  const navigate = useNavigate();

  const handleAddPatient = () => {
    addPatient(newPatient, navigate);
  };
  console.log('userName', userName);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className={styles.container}>
        <form className={styles.containerForm}>
          <img
            src={junior}
            alt="logo"
            className={styles.logo}
          />
          <h2 className={styles.titleRegister}>Nuevo Paciente</h2>
          <div>
            <input
              type="text"
              className={styles.inputName}
              placeholder="Nombre del paciente"
              name="nameP"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: target.value })}
            />
          </div>
          <div>
            <input
              type="number"
              className={styles.input}
              placeholder="Edad"
              name="age"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: target.value })}
            />
            <input
              type="date"
              className={styles.input}
              placeholder=""
              name="bdate"
              required
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: target.value })}
            />

          </div>
          <div>
            <input
              type="number"
              className={styles.input}
              placeholder="cc"
              name="idDoc"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: target.value })}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Direccion"
              name="address"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: target.value })}
            />
          </div>
          <div>
            <input
              type="email"
              className={styles.input}
              placeholder="Correo"
              name="email"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: target.value })}
            />
            <input
              type="number"
              className={styles.input}
              placeholder="Telefono"
              name="tel"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: target.value })}
            />
          </div>
          <div>
            <input
              type="number"
              className={styles.input}
              placeholder="peso (Kg)"
              name="weight"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: `${target.value} kg` })}
            />
            <input
              type="number"
              className={styles.input}
              placeholder="Estatura (Cm)"
              name="height"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: `${target.value} cm` })}
            />
          </div>
          {/* <div>
            <label>Subir una foto</label>
            {' '}
            <br />
            <input
              type="file"
              className={styles.inputPic}
              placeholder="Agregar Foto"
              name="pic"
              onChange={({ target }) => setNewPatient({ ...newPatient, [target.name]: target.value })}
            />
          </div> */}
          <div>
            <button type="button" className={styles.button} onClick={() => handleAddPatient()}>
              Envíar
            </button>
          </div>
          <span>
            <Link className={styles.link} to="/PlayerList">Regresar</Link>
          </span>
        </form>
      </div>
    </>
  );
}
function mapStateToProps({ patients }) {
  return {
    userName: patients.userName,
  };
}

export default connect(mapStateToProps)(NewPatient);
