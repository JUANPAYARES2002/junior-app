/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../NavBar';
import styles from './ClinicHistory.module.css';
import { addClinicalHistory, uploadFiles } from '../../connection/firebase';

function ClinicHistory({ patientList, userName }) {
  const [clinicHistoryLocal, setClinicHistoryLocal] = useState({});
  const [files, setfiles] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const currentPatient = patientList?.filter(((patient) => patient.idDoc === id));
  const historyPatient = currentPatient[0];
  const sendClinicalHistory = () => {
    addClinicalHistory({
      ...clinicHistoryLocal, doctor: userName.name, idDoc: id, files,
    }, navigate);
  };
  const cardioOptions = [
    {
      label: 'Cardiocvascular',
      name: 'cardio',
    },
    {
      label: 'Pulmonar',
      name: 'pulmonary',
    },
    {
      label: 'Digestivios',
      name: 'digestive',
    },
    {
      label: 'Diabetes',
      name: 'diabetes',
    },
    {
      label: 'Renales',
      name: 'renal',
    },
    {
      label: 'Qirúrgico',
      name: 'surgical',
    },
  ];

  const loadingfiles = (target) => {
    const file = target.files[0];
    const studioName = target.name;
    uploadFiles(studioName, file, files, setfiles);
  };
  console.log('files:', files);
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className={styles.container}>
        <h1 className={styles.title}>Historia Clínica</h1>
        <h2 style={{ marginLeft: '20px' }}>
          <b>Paciente: </b>
          {' '}
          {historyPatient.nameP}
        </h2>
        <form className={styles.containerForm}>

          {/* Datos personales */}
          <div className={styles.rows}>
            <div className={styles.field}>
              <label htmlFor="cc">N° Identificación: </label>
              <input type="number" name="cc" value={historyPatient.idDoc} disabled />
            </div>
            <div className={styles.field}>
              <label htmlFor="sexo">Sexo: </label>
              <select
                name="sex"
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              >
                <option selected disabled value="X" name="sexo">Seleccione una Opción</option>
                <option value="M" name="sexo">Maculino</option>
                <option value="F" name="sexo">Fememino</option>
              </select>

            </div>
            <div className={styles.field}>
              <label htmlFor="number">Numero: </label>
              <input type="number" name="number" value={historyPatient.tel} disabled />
            </div>
            <div className={styles.field}>
              <label htmlFor="direccion">Dirección: </label>
              <input type="text" name="direccion" value={historyPatient.address} disabled />
            </div>
          </div>
          <div className={styles.rowTextbox}>
            <div className={styles.textBox}>
              <label htmlFor="consulta">
                {' '}
                <h4>Motivo de consulta: </h4>
                {' '}
              </label>
              <textarea
                name="consultation"
                cols="30"
                rows="5"
                onChange={
                  ({ target }) => setClinicHistoryLocal(
                    { ...clinicHistoryLocal, [target.name]: target.value },
                  )
                }
              />
            </div>
            <div className={styles.textBox}>
              <label htmlFor="lesion">
                {' '}
                <h4>Descripción de la lesión: </h4>
                {' '}
              </label>
              <textarea
                name="injury"
                cols="30"
                rows="5"
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              />
            </div>
            <div className={styles.textBox}>
              <label htmlFor="enfermedad">
                {' '}
                <h4>Enfermedad actual (Descripción): </h4>
                {' '}
              </label>
              <textarea
                name="illness"
                cols="30"
                rows="5"
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              />
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.field}>
              <label htmlFor="medicamento">Está tomando algún medicamento: </label>
              <input
                type="text"
                placeholder="¿Cuál?"
                name="medicine"
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="alergia">Alergias a medicamentos: </label>
              <input
                type="text"
                placeholder="¿Cuales?"
                name="allergy"
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="tipoSangre">Grupo sanguíneo: </label>
              <select
                name="bloodType"
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              >
                <option selected disabled value="X" name="tipoSangre">Seleccione una Opción</option>
                <option value="o-" name="tipoSangre">O-</option>
                <option value="o+" name="tipoSangre">O+</option>
                <option value="a-" name="tipoSangre">A-</option>
                <option value="a+" name="tipoSangre">A+</option>
                <option value="b-" name="tipoSangre">B-</option>
                <option value="b+" name="tipoSangre">B+</option>
                <option value="ab-" name="tipoSangre">AB-</option>
                <option value="ab+" name="tipoSangre">AB+</option>
              </select>
            </div>
            <div className={styles.radio}>
              <label htmlFor="tranfusion">¿Has hecho alguna transfusión?</label>
              <div>
                <input
                  type="radio"
                  name="tranfusion"
                  value="Si"
                  onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                />
                {' '}
                Si
              </div>
              <div>
                <input
                  type="radio"
                  name="tranfusion"
                  value="No"
                  onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                />
                {' '}
                No
              </div>
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.field}>
              <label htmlFor="inconveniente">¿Has tenido alguna reacción a la transfusión?</label>
              <input
                type="text"
                placeholder="¿Cuál?"
                name="tranfusionReaction"
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              />
            </div>
            <div className={styles.radio}>
              <label htmlFor="cirugia">¿Has tenido alguna cirugía? </label>
              <div>
                <input
                  type="radio"
                  name="surgeryBool"
                  value="Si"
                  onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                />
                {' '}
                Si
              </div>
              <div>
                <input
                  type="radio"
                  name="surgeryBool"
                  value="No"
                  onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                />
                {' '}
                No
              </div>
            </div>
            <div className={styles.textBox}>
              <textarea
                name="surgery"
                cols="30"
                rows="5"
                placeholder="¿Cuál? ¿Cuándo?"
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="doctor">Doctor responsable:</label>
              <input
                type="text"
                name="doctor"
                value={userName.name}
                onChange={({ target }) => setClinicHistoryLocal({ ...clinicHistoryLocal, [target.name]: target.value })}
              />
            </div>
          </div>
          {/* Nuevos campos */}
          <div className={styles.rows}>
            <div className={styles.check}>
              <h3>Antecedentes Personales Patologicos</h3>
              <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap' }}>
                {
                  cardioOptions.map((option) => (
                    <div key={option.name}>
                      <label htmlFor={option.name}>{option.label}</label>
                      <input
                        style={{ margin: '8px' }}
                        type="checkbox"
                        name={option.name}
                        onChange={({ target }) => setClinicHistoryLocal(
                          { ...clinicHistoryLocal, [target.name]: target.value },
                        )}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className={styles.textBox}>
              <textarea
                name="medicamentos_APP"
                cols="30"
                onChange={
                  ({ target }) => setClinicHistoryLocal(
                    { ...clinicHistoryLocal, [target.name]: target.value },
                  )
                }
                rows="5"
                placeholder="Medicamentos:"
              />
            </div>
            <div className={styles.textBox}>
              <textarea
                name="especifique_APP"
                cols="30"
                onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                rows="5"
                placeholder="Especifique:"
              />
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.check}>
              <h3>Antecedentes Personales No Patologicos</h3>
              <label htmlFor="alcohol">Alcoholismo</label>
              <input
                type="checkbox"
                value="alcohol"
                onChange={
                  ({ target }) => setClinicHistoryLocal(
                    { ...clinicHistoryLocal, [target.name]: target.value },
                  )
                }
              />
              <label htmlFor="tabaquismo">Tabaquismo</label>
              <input
                type="checkbox"
                value="tabaquismo"
                onChange={
                  ({ target }) => setClinicHistoryLocal(
                    { ...clinicHistoryLocal, [target.name]: target.value },
                  )
                }
              />
              <label htmlFor="inmunizaciones">Inmunizaciones</label>
              <input
                type="checkbox"
                value="inmunizaciones"
                onChange={
                  ({ target }) => setClinicHistoryLocal(
                    { ...clinicHistoryLocal, [target.name]: target.value },
                  )
                }
              />
            </div>
            <div className={styles.textBox}>
              <textarea
                name="drugs_types"
                cols="30"
                rows="5"
                onChange={
                  ({ target }) => setClinicHistoryLocal(
                    { ...clinicHistoryLocal, [target.name]: target.value },
                  )
                }
                placeholder="¿Cuales Drogas?"
              />
            </div>
            <div className={styles.textBox}>
              <textarea
                name="other_drugs"
                cols="30"
                rows="5"
                onChange={
                  ({ target }) => setClinicHistoryLocal(
                    { ...clinicHistoryLocal, [target.name]: target.value },
                  )
                }
                placeholder="Otros:"
              />
            </div>
          </div>
          <h3 className={styles.antecedentesF}>Antecedentes Familiares</h3>
          <div className={styles.rows}>
            <div className={styles.radio}>
              <label htmlFor="viveP"> Padre: Vive </label>
              <div>
                <input
                  type="radio"
                  name="viveP"
                  value="Si"
                  onChange={
                    ({ target }) => setClinicHistoryLocal({
                      ...clinicHistoryLocal, [target.name]: target.value,
                    })
                  }
                />
                {' '}
                Si
              </div>
              <div>
                <input
                  type="radio"
                  name="viveP"
                  value="No"
                  onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                />
                {' '}
                No
              </div>
            </div>
            <div className={styles.textBox}>
              <textarea
                name="enfermedadesP"
                cols="20"
                rows="5"
                placeholder="Enfermedades que padece:"
                onChange={
                  ({ target }) => setClinicHistoryLocal({
                    ...clinicHistoryLocal, [target.name]: target.value,
                  })
                }
              />
            </div>
            <div className={styles.radio}>
              <label htmlFor="viveM"> Madre: Vive </label>
              <div>
                <input
                  type="radio"
                  name="viveM"
                  value="Si"
                  onChange={
                    ({ target }) => setClinicHistoryLocal({
                      ...clinicHistoryLocal, [target.name]: target.value,
                    })
                  }
                />
                {' '}
                Si
              </div>
              <div>
                <input
                  type="radio"
                  name="viveM"
                  value="No"
                  onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                />
                {' '}
                No
              </div>
            </div>
            <div className={styles.textBox}>
              <textarea
                name="enfermedadesM"
                cols="20"
                rows="5"
                placeholder="Enfermedades que padece:"
                onChange={
                  ({ target }) => setClinicHistoryLocal({
                    ...clinicHistoryLocal, [target.name]: target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.radio}>
              <label htmlFor="viveH"> Hermanos: Vive </label>
              <div>
                <input
                  type="radio"
                  name="viveH"
                  value="Si"
                  onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                />
                {' '}
                Si
              </div>
              <div>
                <input
                  type="radio"
                  name="viveH"
                  value="No"
                  onChange={
                    ({ target }) => setClinicHistoryLocal(
                      { ...clinicHistoryLocal, [target.name]: target.value },
                    )
                  }
                />
                {' '}
                No
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="numerohermanos">Cuantos? </label>
              <input
                type="number"
                name="numerohermanos"
                onChange={
                  ({ target }) => setClinicHistoryLocal({
                    ...clinicHistoryLocal, [target.name]: target.value,
                  })
                }
              />
            </div>
            <div className={styles.textBox}>
              <textarea
                name="enfermedadesH"
                cols="20"
                rows="5"
                placeholder="Enfermedades que padece:"
                onChange={
                  ({ target }) => setClinicHistoryLocal({
                    ...clinicHistoryLocal, [target.name]: target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.files}>
              <label htmlFor="ecografia"><b>ECOGRAFIAS</b></label>
              <input
                type="file"
                onChange={
                  ({ target }) => loadingfiles(target)
                }
                name="ecografia"
              />
            </div>
            <div className={styles.files}>
              <label htmlFor="radiografia"><b>RADIOGRAFIAS</b></label>
              <input
                type="file"
                onChange={
                  ({ target }) => loadingfiles(target)
                }
                name="radiografia"
              />
            </div>
            <div className={styles.files}>
              <label htmlFor="resonancia"><b>RESONANCIAS</b></label>
              <input
                type="file"
                onChange={
                  ({ target }) => loadingfiles(target)
                }
                name="resonancia"
              />
            </div>
            <div className={styles.files}>
              <label htmlFor="ecocardiogramas"><b>ECOCARDIOGRAMAS</b></label>
              <input
                type="file"
                onChange={
                  ({ target }) => loadingfiles(target)
                }
                name="ecocardiogramas"
              />
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.files}>
              <label htmlFor="electrocardiograma">
                {' '}
                <b>ELECTROCARDIOGRAMA</b>
              </label>
              <input
                type="file"
                onChange={
                  ({ target }) => loadingfiles(target)
                }
                name="electrocardiograma"
              />
            </div>
            <div className={styles.files}>
              <label htmlFor="examenesLab"><b>EXAMENES DE LABORATORIO</b></label>
              <input
                type="file"
                onChange={
                  ({ target }) => loadingfiles(target)
                }
                name="examenesLab"
              />
            </div>
            <div className={styles.files}>
              <label htmlFor="cuadroHematico"><b>CUADRO HEMATICO</b></label>
              <input
                type="file"
                onChange={
                  ({ target }) => loadingfiles(target)
                }
                name="cuadroHematico"
              />
            </div>
            <div className={styles.files}>
              <label htmlFor="parcialOrina"><b>PARCIAL DE ORINA</b></label>
              <input
                type="file"
                onChange={
                  ({ target }) => loadingfiles(target)
                }
                name="parcialOrina"
              />
            </div>

          </div>
          {files.percent < 100 && files.percent !== null
            && <h2 style={{ textAling: 'center' }}>Cargando archivos</h2>}
        </form>
        <button
          type="button"
          className={styles.send_history}
          onClick={() => sendClinicalHistory()}
          disabled={!!(files.percent < 100 && files.percent !== null)}
        >
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

export default connect(mapStateToProps)(ClinicHistory);
