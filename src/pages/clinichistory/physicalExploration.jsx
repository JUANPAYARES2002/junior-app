/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../NavBar';
import { addPrepare } from '../../connection/firebase';
import styles from './ClinicHistory.module.css';

function PhysicalExploration({ userName, sendExploration, setSendExploration }) {
  const [localPrepare, setLocalPrepare] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const sendPrepare = () => {
    addPrepare({ ...localPrepare, prepare: userName.name, idDoc: id }, navigate);
    setSendExploration(false);
  };
  useEffect(() => {
    if (sendExploration) sendPrepare();
  }, [sendExploration]);
  console.log('localPrepare:', localPrepare);

  return (
    <form className={styles.containerForm}>
      <div className={styles.rows}>
        <div className={styles.field}>
          <label htmlFor="fc">Signos vitales: </label>
          <input
            type="text"
            placeholder="Frecuencia Cardiaca"
            name="fc"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="fr" />
          <input
            type="text"
            placeholder="Frecuancia Respiratoria"
            name="fr"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="ta" />
          <input
            type="text"
            placeholder="Tension Arterial"
            name="ta"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="bt" />
          <input
            type="text"
            placeholder="Temperatura Corporal"
            name="bt"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="size">Antropometría: </label>
          <input
            type="text"
            placeholder="Talla:"
            name="size"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="weight" />
          <input
            type="text"
            placeholder="Peso:"
            name="weight"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="mci" />
          <input
            type="text"
            placeholder="IMC:"
            name="mci"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="testMmss">Flexibilidad (MMSS): </label>
          <input
            type="text"
            placeholder="Prueba"
            name="testMmss"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="rhandMmss" />
          <input
            type="text"
            placeholder="Derecha:"
            name="rhandMmss"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="lhandMmss" />
          <input
            type="text"
            placeholder="Izquierda:"
            name="lhandMmss"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="testMmii">Flexibilidad (MMII): </label>
          <input
            type="text"
            placeholder="Prueba"
            name="testMmii"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="rhandMmii" />
          <input
            type="text"
            placeholder="Derecha:"
            name="rhandMmii"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
          <label htmlFor="lhandMmii" />
          <input
            type="text"
            placeholder="Izquierda:"
            name="lhandMmii"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.radio}>
          <label htmlFor="painBool"> Dolor: </label>
          <div>
            <input
              type="radio"
              name="painBool"
              value="si"
              onChange={({ target }) => setLocalPrepare(
                { ...localPrepare, [target.name]: target.value },
              )}
            />
            {' '}
            Si
          </div>
          <div>
            <input
              type="radio"
              name="painBool"
              value="no"
              onChange={({ target }) => setLocalPrepare(
                { ...localPrepare, [target.name]: target.value },
              )}
            />
            {' '}
            No
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="painScale">Escala de dolor (1 - 10)</label>
          <input
            type="number"
            name="painScale"
            min="1"
            max="10"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
        </div>
        <div className={styles.radio}>
          <label htmlFor="edema"> Edema: </label>
          <div>
            <input
              type="radio"
              name="edema"
              value="Si"
              onChange={({ target }) => setLocalPrepare(
                { ...localPrepare, [target.name]: target.value },
              )}
            />
            {' '}
            Si
          </div>
          <div>
            <input
              type="radio"
              name="edema"
              value="No"
              onChange={({ target }) => setLocalPrepare(
                { ...localPrepare, [target.name]: target.value },
              )}
            />
            {' '}
            No
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="place">Lugar</label>
          <input
            type="text"
            name="place"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
        </div>

        <div className={styles.radio}>
          <label htmlFor="fovea"> Fóvea </label>
          <div>
            <input
              type="radio"
              name="fovea"
              value="Si"
              onChange={({ target }) => setLocalPrepare(
                { ...localPrepare, [target.name]: target.value },
              )}
            />
            {' '}
            Si
          </div>
          <div>
            <input
              type="radio"
              name="fovea"
              value="No"
              onChange={({ target }) => setLocalPrepare(
                { ...localPrepare, [target.name]: target.value },
              )}
            />
            {' '}
            No
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="perometer">Perímetro: </label>
          <select
            name="perometer"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          >
            <option selected disabled value="X">Seleccione una Opción</option>
            <option value="izquierdo" name="fovea">Izquierdo</option>
            <option value="derecho" name="fovea">Derecho</option>
          </select>
        </div>

      </div>
      <div className={styles.rows}>
        <div className={styles.textBox}>
          <label htmlFor="goniometry"> Goniometría: </label>
          <textarea
            name="goniometry"
            cols="30"
            rows="3"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
        </div>
        <div className={styles.textBox}>
          <label htmlFor="march"> Marcha: </label>
          <textarea
            name="march"
            cols="30"
            rows="3"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          />
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.field}>
          <label htmlFor="partidos1">Partidos 1° Semestre:</label>
          <input
            type="number"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
            name="partidos1"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="goles1">Goles 1° Semestre:</label>
          <input
            type="number"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
            name="goles1"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="amarillas1">Tarjetas Amarillas:</label>
          <input
            type="number"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
            name="amarillas1"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="rojas1">Tarjetas Rojas:</label>
          <input
            type="number"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
            name="rojas1"
          />
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.field}>
          <label htmlFor="partidos2">Partidos 2° Semestre:</label>
          <input
            type="number"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
            name="partidos2"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="goles2">Goles 2° Semestre:</label>
          <input
            type="number"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
            name="goles2"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="amarillas2">Tarjetas Amarillas:</label>
          <input
            type="number"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
            name="amarillas2"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="rojas2">Tarjetas Rojas:</label>
          <input
            type="number"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
            name="rojas2"
          />
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.field}>
          <label htmlFor="testyoyo">TEST YOYO: </label>
          <select
            name="testyoyo"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          >
            <option selected disabled value="X">Seleccione una Opción</option>
            <option value="+16,5">ELITE (+16,5)</option>
            <option value="15,6 - 16,4">EXCELENTE (15,6 - 16,4)</option>
            <option value="14,8 - 15,5">BUENO (14,8 - 15,5)</option>
            <option value="14,1 - 14,7">MEDIO (14,1 - 14,7)</option>
            <option value="-13,9">MALO (-13,9)</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="testcooper">TEST COOPER: </label>
          <select
            name="testcooper"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          >
            <option selected disabled value="X">Seleccione una Opción</option>
            <option value="+2.800 mts">EXCELENTE (+2.800 mts)</option>
            <option value="2.400 - 2799 mts">BUENO (2.400 - 2799 mts)</option>
            <option value="2.200 - 2399 mts">REGULAR (2.200 - 2399 mts)</option>
            <option value="-2.199 mts">MALO (-2.199 mts)</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="testabdominal">TEST ABDOMINAL (1 Min): </label>
          <select
            name="testabdominal"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          >
            <option selected disabled value="X">Seleccione una Opción</option>
            <option value="+44">EXCELENTE (+44)</option>
            <option value="34 - 43">BUENO (34 - 43)</option>
            <option value="25 - 33">REGULAR (25 - 33)</option>
            <option value="-24">MALO (24 -)</option>
          </select>
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.field}>
          <label htmlFor="testvelocidad">TEST VELOCIDAD (40 mt): </label>
          <select
            name="testvelocidad"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          >
            <option selected disabled value="X">Seleccione una Opción</option>
            <option value="4.5 seg">EXCELENTE (4.5 seg)</option>
            <option value="4.4 - 5,1 seg">BUENO (4.4 - 5,1 seg)</option>
            <option value="5.2 - 5.9 seg">REGULAR (5.2 - 5.9 seg)</option>
            <option value="+6.0 seg">MALO (6.0 seg +)</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="testsaltos">TEST SALTOS (Vertical): </label>
          <select
            name="testsaltos"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          >
            <option selected disabled value="X">Seleccione una Opción</option>
            <option value="+10.1 mts">MUY ALTO (+10.1 mts)</option>
            <option value="8.5 - 10 mts">ALTO (8.5 - 10 mts)</option>
            <option value="7.0 - 8.4 mts">MODERADO (7.0 - 8.4 mts)</option>
            <option value="6.0 - 6.9 mts">BAJO (6.0 - 6.9 mts)</option>
            <option value="-5,9 mts">MUY BAJO (-5,9 mts) </option>

          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="testflexibilidad">TEST FLEXIBILIDAD (Piernas) : </label>
          <select
            name="testflexibilidad"
            onChange={({ target }) => setLocalPrepare(
              { ...localPrepare, [target.name]: target.value },
            )}
          >
            <option selected disabled value="X">Seleccione una Opción</option>
            <option value="+38,16 cem">EXCELENTE (+38,16 cem)</option>
            <option value="31.08 - 38.15 cem">BUENO (31.08 - 38.15 cem)</option>
            <option value="24.00 - 31.07 cem">ACEPTABLE (24.00 - 31.07 cem)</option>
            <option value="16.22 - 23.99 cem">DEFICIENTE (16.22 - 23.99 cem)</option>
            <option value="-16,21 cem">CRITICO (-16,21 cem)</option>
          </select>
        </div>
      </div>
    </form>
  );
}

function mapStateToProps({ patients }) {
  return {
    userName: patients.userName,
  };
}

export default connect(mapStateToProps)(PhysicalExploration);
