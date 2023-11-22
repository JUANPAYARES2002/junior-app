/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../NavBar';
import { addTherapy } from '../../connection/firebase';
import PhysicalExploration from './physicalExploration';
import styles from './ClinicHistory.module.css';

function Physiotherapy({ userName }) {
  const [localTherapy, setLocalTherapy] = useState({});
  const [sendExploration, setSendExploration] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const sendTherapy = () => {
    addTherapy({ ...localTherapy, therapist: userName.name, idDoc: id }, navigate);
    setSendExploration(true);
  };
  console.log('setLocalTherapy:', localTherapy);
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className={styles.container}>
        <h1 className={styles.title} style={{ marginTop: '10px' }}>
          FISIOTERAPIA: {userName.name}
        </h1>
        <h2 className={styles.title2}>FORMATO DE EVALUACIÓN DE LESIONES VFC</h2>
        <form className={styles.containerForm}>
          <div className={styles.rows}>
            <div className={styles.field}>
              <label htmlFor="inDate">Fecha de ingreso: </label>
              <input
                type="date"
                name="inDate"
                required
                onChange={({ target }) => setLocalTherapy(
                  { ...localTherapy, [target.name]: target.value },
                )}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="outDate">Fecha de egreso: </label>
              <input
                type="date"
                name="outDate"
                required
                onChange={({ target }) => setLocalTherapy(
                  { ...localTherapy, [target.name]: target.value },
                )}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="injuryDate">Fecha de lesión: </label>
              <input
                type="date"
                name="injuryDate"
                required
                onChange={({ target }) => setLocalTherapy(
                  { ...localTherapy, [target.name]: target.value },
                )}
              />
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.radio}>
              <label htmlFor="injuryBool">Reporte de lesión: </label>
              <div>
                <input
                  type="radio"
                  name="injuryBool"
                  value="Si"
                  onChange={({ target }) => setLocalTherapy(
                    { ...localTherapy, [target.name]: target.value },
                  )}
                />
                Si
              </div>
              <div>
                <input
                  type="radio"
                  name="injuryBool"
                  value="No"
                  onChange={({ target }) => setLocalTherapy(
                    { ...localTherapy, [target.name]: target.value },
                  )}
                />
                No
              </div>
            </div>

            <div className={styles.radio}>
              <label htmlFor="orthesisBool"> Uso de Ortesis: </label>
              <div>
                <input
                  type="radio"
                  name="orthesisBool"
                  value="Si"
                  onChange={({ target }) => setLocalTherapy(
                    { ...localTherapy, [target.name]: target.value },
                  )}
                />
                Si
              </div>
              <div>
                <input
                  type="radio"
                  name="orthesisBool"
                  value="No"
                  onChange={({ target }) => setLocalTherapy(
                    { ...localTherapy, [target.name]: target.value },
                  )}
                />
                No
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="orthesis">¿Cuál ortesis? </label>
              <input
                type="text"
                name="orthesis"
                onChange={({ target }) => setLocalTherapy(
                  { ...localTherapy, [target.name]: target.value },
                )}
              />
            </div>

          </div>
          <div className={styles.rows}>

            <div className={styles.textBox}>
              <label htmlFor="diagnosis"> Diagnostico medico: </label>
              <textarea
                name="diagnosis"
                cols="30"
                rows="3"
                onChange={({ target }) => setLocalTherapy(
                  { ...localTherapy, [target.name]: target.value },
                )}
              />
            </div>
            <div className={styles.textBox}>
              <label htmlFor="record"> Antecedentes: </label>
              <textarea
                name="record"
                cols="30"
                rows="3"
                onChange={({ target }) => setLocalTherapy(
                  { ...localTherapy, [target.name]: target.value },
                )}
              />
            </div>
          </div>
          {/* Empieza el complemento */}
        </form>
        <h2 className={styles.title2}>FORMATO DE EVALUACIÓN FÍSICA</h2>
        <PhysicalExploration
          sendExploration={sendExploration}
          setSendExploration={setSendExploration}
        />
        <button
          type="button"
          className={styles.send_history}
          onClick={() => sendTherapy()}
        >
          Enviar
        </button>
      </main>
    </>
  );
}
function mapStateToProps({ patients }) {
  return {
    userName: patients.userName,
  };
}

export default connect(mapStateToProps)(Physiotherapy);
