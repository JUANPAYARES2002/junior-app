/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../NavBar';
import styles from './Therapy.module.css';
import { addTherapy } from '../../connection/firebase';

function Therapy({ patientList, userName }) {
  const [therapyLocal] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const currentPatient = patientList?.filter(((patient) => patient.idDoc === id));
  const therapyPatient = currentPatient[0];
  const sendTherapy = () => {
    addTherapy({ ...therapyLocal, doctor: userName.name, idDoc: id }, navigate);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className={styles.container}>
        <h1 className={styles.titleFt}>Fisio-Terapia</h1>
        <h2 style={{ marginLeft: '20px' }}>
          <b>Paciente: </b>
          {' '}
          {therapyPatient.nameP}
        </h2>
        <form className={styles.containerForm}>
          <div className={styles.cols}>
            <div className={styles.field}>
              <label htmlFor="dateI">Fecha de ingreso: </label>
              <input type="date" name="dateI" required />
            </div>
            <div className={styles.radio}>
              <label htmlFor="injury">Reporte de lesión: </label>
              <div>
                <input type="radio" name="injury" value="si" />
                {' '}
                Si
              </div>
              <div>
                <input type="radio" name="injury" value="no" />
                {' '}
                No
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="dateL">Fecha de lesión: </label>
              <input type="date" name="dateL" required />
            </div>
            <div className={styles.textBox}>
              <label htmlFor="dignostic"> Diagnostico medico: </label>
              <textarea name="diagnostic" cols="30" rows="3" />
            </div>
          </div>
          <div className={styles.cols}>
            <div className={styles.field}>
              <label htmlFor="dateE">Fecha de egreso: </label>
              <input type="date" name="dateE" required />
            </div>
          </div>
          <div className={styles.rows}>

            <div className={styles.radio}>
              <label htmlFor="ortesis"> Uso de Ortesis: </label>
              <div>
                <input type="radio" name="ortesis" value="si" />
                {' '}
                Si
              </div>
              <div>
                <input type="radio" name="ortesis" value="no" />
                {' '}
                No
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="ortesis1">¿Cuál ortesis? </label>
              <input type="text" name="ortesis1" />
            </div>

          </div>
          <div className={styles.rows}>

            <div className={styles.textBox}>
              <label htmlFor="historyInjuries"> Antecedentes: </label>
              <textarea name="historyInjuries" cols="30" rows="3" />
            </div>
          </div>
        </form>
        <button type="button" className={styles.send_history} onClick={() => sendTherapy()}>
          Enviar
        </button>
      </main>
    </>

  );
}

function mapStateToProps({ patients }) {
  return {
    patientList: patients.patientList,
    userName: patients.userName,
  };
}

export default connect(mapStateToProps)(Therapy);
