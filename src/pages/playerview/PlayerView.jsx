/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import styles from './PlayerView.module.css';
import NavBar from '../../NavBar';
import {
  getclinicalHistory,
  getTherapy,
  getPrepare,
} from '../../connection/firebase';

function PlayerView({
  patientList, clinicalHistoryFireBase, therapy, prepare, userName,
}) {
  const params = useParams();
  // console.log('clinicalHistoryFireBase:', clinicalHistoryFireBase);
  const { id } = params;
  const currentPatient = patientList?.filter(((patient) => patient.idDoc === id));
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      getclinicalHistory(id, dispatch);
      getTherapy(id, dispatch);
      getPrepare(id, dispatch);
    }
  }, []);
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <h3 className={styles.playerName}>{currentPatient[0]?.nameP}</h3>
            {userName.profesion === 'doctor'
              && (
              <div className={styles.buttonContainer}>
                <Link to={`/${id}/ClinicHistory`}><button type="submit" className={styles.button}>Actualizar Historia Clinica</button></Link>
              </div>
              )}
          </div>

          <ul className={styles.items}>
            <li className={styles.item}>
              <b>EDAD: </b>
              {' '}
              <br />
              {' '}
              {currentPatient[0].age}
              {' '}
              Años
            </li>
            <li className={styles.item}>
              <b>No. DOCUMENTO: </b>
              {' '}
              <br />
              {' '}
              {id}
            </li>
            <li className={styles.item}>
              <b>DIRECCION: </b>
              {' '}
              <br />
              {' '}
              {currentPatient[0].address}
            </li>
            <li className={styles.item}>
              <b>CELULAR: </b>
              {' '}
              <br />
              {' '}
              {currentPatient[0].tel}
            </li>
          </ul>
          <ul className={styles.items}>
            <li className={styles.item}>
              <b>CORREO: </b>
              {' '}
              {currentPatient[0].email}
            </li>
            <li className={styles.item}>
              <b>PESO: </b>
              {' '}
              {currentPatient[0].weight}
            </li>
            <li className={styles.item}>
              <b>ESTATURA: </b>
              {currentPatient[0].height}
            </li>
          </ul>
          <h2 className={styles.titleHc}>HISTORIA CLINICA</h2>
          <ul className={styles.items}>
            <li className={styles.item}>
              <b>DOCTOR: </b>
              {' '}
              <br />
              {' '}
              {currentPatient[0]?.inCharge}
            </li>
            <li className={styles.item}>
              <b>MOTIVO DE CONSULTA</b>
              {' '}
              <br />
              {' '}
              {clinicalHistoryFireBase?.consultation}
            </li>
            <li className={styles.item}>
              <b>DESCRIPCIÓN DE LA LESIÓN: </b>
              {' '}
              <br />
              {' '}
              {clinicalHistoryFireBase?.injury}
            </li>

          </ul>
          <ul className={styles.items}>
            <li className={styles.item}>
              <b>ENFERMEDAD ACTUAL: </b>
              {' '}
              <br />
              {' '}
              {clinicalHistoryFireBase?.illness}
            </li>
            <li className={styles.item}>
              <b>MEDICAMENTOS EN USO ACTUALMENTE: </b>
              {' '}
              {clinicalHistoryFireBase?.medicine}
            </li>
            <li className={styles.item}>
              <b>ALERGIAS A MEDICAMENTOS: </b>
              {' '}
              {clinicalHistoryFireBase?.allergy}
            </li>

          </ul>
          <ul className={styles.items}>
            <li className={styles.item}>
              <b>GRUPO SANGUINEO: </b>
              {' '}
              {clinicalHistoryFireBase?.bloodType}
            </li>
            <li className={styles.item}>
              <b>REACCIÓN A TRANSFUSIONES: </b>
              {' '}
              {clinicalHistoryFireBase?.tranfusion}
            </li>
            <li className={styles.item}>
              <b>CIRUGIAS: </b>
              {' '}
              {clinicalHistoryFireBase?.surgeryBool}
            </li>
          </ul>
          <ul className={styles.items}>
            <li className={styles.item}>
              <b>ANTECEDENTES PERSONALES PATOLOGICOS: </b>
              {' '}
              <br />
              {clinicalHistoryFireBase?.cardio ? ' -Cardiovascular' : ''}
              <br />
              {clinicalHistoryFireBase?.pulmonary ? ' -Pulmonar' : ''}
              <br />
              {clinicalHistoryFireBase?.digestive ? ' -Digestivos' : ''}
              <br />
              {clinicalHistoryFireBase?.diabetes ? ' -Diabetes' : ''}
              <br />
              {clinicalHistoryFireBase?.renal ? ' -Renales' : ''}
              <br />
              {clinicalHistoryFireBase?.surgical ? ' -Quírurgicos' : ''}
            </li>
            <li className={styles.item}>
              <b>TRATAMIENTO PARA LA PATOLOGIA: </b>
              {' '}
              <br />
              {clinicalHistoryFireBase?.medicamentos_APP}
            </li>
          </ul>
          <ul className={styles.items}>
            <li className={styles.item}>
              <b>ANTECEDENTES PERSONALES NO PATOLOGICOS: </b>
              {' '}
              <br />
              {clinicalHistoryFireBase?.alcohol ? ' -Alcoholismo' : ''}
              <br />
              {clinicalHistoryFireBase?.smook ? ' -Tabaquismo' : ''}
              <br />
              {clinicalHistoryFireBase?.inmun ? ' -Inmunizaciones' : ''}
            </li>
            <li className={styles.item}>
              <b>TIPOS DE DROGAS </b>
              {' '}
              <br />
              {clinicalHistoryFireBase?.drugs_types}
            </li>
            <li className={styles.item}>
              <b>OTRAS DROGAS </b>
              {' '}
              <br />
              {clinicalHistoryFireBase?.other_drugs}
            </li>
          </ul>
          <ul className={styles.items}>
            <li className={styles.item}>
              <a href={clinicalHistoryFireBase.ecografia} download>
                <button
                  type="button"
                  disabled={!clinicalHistoryFireBase.ecografia}
                  style={{ width: '180px', padding: '5px' }}
                >
                  ECOGRAFÍA
                </button>
              </a>
            </li>
            <li className={styles.item}>
              <a href={clinicalHistoryFireBase.radiografia} download>
                <button
                  type="button"
                  disabled={!clinicalHistoryFireBase.radiografia}
                  style={{ width: '180px', padding: '5px' }}
                >
                  RADIOGRAFÍA
                </button>
              </a>
            </li>
            <li className={styles.item}>
              <a href={clinicalHistoryFireBase.resonancia} download>
                <button
                  type="button"
                  disabled={!clinicalHistoryFireBase.resonancia}
                  style={{ width: '180px', padding: '5px' }}
                >
                  RESONANCIA
                </button>
              </a>
            </li>
            <li className={styles.item}>
              <a href={clinicalHistoryFireBase.ecocardiogramas} download>
                <button
                  type="button"
                  disabled={!clinicalHistoryFireBase.ecocardiogramas}
                  style={{ width: '180px', padding: '5px' }}
                >
                  ECOCARDIOGRAMA
                </button>
              </a>
            </li>
          </ul>
          <ul className={styles.items}>
            <li className={styles.item}>
              <a href={clinicalHistoryFireBase.electrocardiograma} download>
                <button
                  type="button"
                  disabled={!clinicalHistoryFireBase.electrocardiograma}
                  style={{ width: '180px', padding: '5px' }}
                >
                  ELECTROCARDIOGRAMA
                </button>
              </a>
            </li>
            <li className={styles.item}>
              <a href={clinicalHistoryFireBase.examenesLab} download>
                <button
                  type="button"
                  disabled={!clinicalHistoryFireBase.examenesLab}
                  style={{ width: '180px', padding: '5px' }}
                >
                  EX. DE LABORATORIO
                </button>
              </a>
            </li>
            <li className={styles.item}>
              <a href={clinicalHistoryFireBase.cuadroHematico} download>
                <button
                  type="button"
                  disabled={!clinicalHistoryFireBase.cuadroHematico}
                  style={{ width: '180px', padding: '5px' }}
                >
                  CUADRO HÉMATICO
                </button>
              </a>
            </li>
            <li className={styles.item}>
              <a href={clinicalHistoryFireBase.parcialOrina} download>
                <button
                  type="button"
                  disabled={!clinicalHistoryFireBase.parcialOrina}
                  style={{ width: '180px', padding: '5px' }}
                >
                  PARCIAL DE ORINA
                </button>
              </a>
            </li>
          </ul>
          <div className={styles.containerFt}>
            <div className={styles.buttonCenter}>
              <h2 className={styles.titleFt}>FISIOTERAPIA</h2>
              <h3 className={styles.titleFe}>FORMATO DE EVALUACIÓN DE LESIONES VFC</h3>
              {userName.profesion === 'therapist'
                && (
                  <div className={styles.buttonContainer}>
                    <Link to={`/${id}/Physiotherapy`}><button type="submit" className={styles.button}>Actualizar Datos</button></Link>
                  </div>
                )}
            </div>
            <ul className={styles.items}>
              <li className={styles.item}>
                <b>FECHA DE INGRESO: </b>
                {' '}
                <br />
                {therapy.inDate}
              </li>
              <li className={styles.item}>
                <b>FECHA DE ENGRESO: </b>
                {' '}
                <br />
                {therapy.outDate}
              </li>
              <li className={styles.item}>
                <b>REPORTE DE LESIÓN: </b>
                {' '}
                {therapy.injuryBool}
              </li>

            </ul>
            <ul className={styles.items}>
              <li className={styles.item}>
                <b>FECHA DE LESIÓN: </b>
                {' '}
                <br />
                {therapy.injuryDate}
              </li>
              <li className={styles.item}>
                <b>USO DE ORTESIS: </b>
                {' '}
                {therapy.orthesisBool}
              </li>
              <li className={styles.item}>
                <b>QUÉ ORTESIS:</b>
                {' '}
                {therapy.orthesis}
              </li>
            </ul>
            <ul className={styles.items}>
              <li className={styles.item}>
                <b>DIAGNOSTICO FISIOTERAPEUTICO: </b>
                {' '}
                <br />
                {' '}
                {therapy.diagnosis}
              </li>
              <li className={styles.item}>
                <b>ANTECEDENTES: </b>
                {' '}
                <br />
                {' '}
                {therapy.record}
              </li>
            </ul>
            <div className={styles.buttonCenter}>
              <h2 className={styles.titleFt}>EXPLORACIÓN FISÍCA</h2>
            </div>
            <ul className={styles.items}>
              <li className={styles.item}>
                <b>SIGNOS VITALES: </b>
                <br />
                <b>FC:</b>
                {' '}
                {prepare.fc}
                <br />
                <b>FR:</b>
                {' '}
                {prepare.fr}
                <b>
                  {' '}
                  <br />
                  {' '}
                  TA:
                </b>
                {' '}
                {prepare.ta}
                <b>
                  {' '}
                  <br />
                  {' '}
                  TC:
                </b>
                {' '}
                {prepare.bt}
              </li>
              <li className={styles.item}>
                <b>ANTROPOMETRÍA: </b>
                <br />
                <b>TALLA:</b>
                {' '}
                {prepare.size}
                <br />
                <b>PESO:</b>
                {' '}
                {prepare.weight}
                <b>
                  {' '}
                  <br />
                  {' '}
                  IMC:
                </b>
                {' '}
                {prepare.mci}
              </li>
              <li className={styles.item}>
                <b>FLEXIBILIDAD </b>
                (MMSS) :
                {' '}
                <br />
                <b>PRUEBA:</b>
                {' '}
                {prepare.testMmss}
                {' '}
                <br />
                <b>DERECHA:</b>
                {' '}
                {prepare.rhandMmss}
                <b>
                  {' '}
                  <br />
                  {' '}
                  IZQUIERDA:
                </b>
                {' '}
                {prepare.lhandMmss}
              </li>
              <li className={styles.item}>
                <b>FLEXIBILIDAD </b>
                (MMII) :
                {' '}
                <br />
                <b>PRUEBA:</b>
                {' '}
                {prepare.testMmii}
                {' '}
                <br />
                <b>DERECHA:</b>
                {' '}
                {prepare.rhandMmii}
                <b>
                  {' '}
                  <br />
                  {' '}
                  IZQUIERDA:
                </b>
                {' '}
                {prepare.lhandMmii}
              </li>
            </ul>
            <ul className={styles.items}>
              <li className={styles.item}>
                <b>DOLOR:</b>
                {' '}
                {prepare.painBool}
              </li>
              <li className={styles.item}>
                <b>ESCALA DE DOLOR:</b>
                {' '}
                {prepare.painScale}
              </li>
              <li className={styles.item}>
                <b>EDEMA:</b>
                {' '}
                {prepare.edema}
              </li>
              <li className={styles.item}>
                <b>LUGAR:</b>
                {' '}
                {prepare.place}
              </li>
              <li className={styles.item}>
                <b>FÓVEA:</b>
                {' '}
                {prepare.fovea}
              </li>
              <li className={styles.item}>
                <b>PERIMETRO:</b>
                {' '}
                {prepare.perometer}
              </li>
            </ul>
            <ul className={styles.items}>
              <li className={styles.item}>
                <b>GONIOMETRÍA:</b>
                {' '}
                {prepare.goniometry}
              </li>
              <li className={styles.item}>
                <b>MARCHA:</b>
                {' '}
                {prepare.march}
              </li>
            </ul>
            <ul className={styles.items}>
              <li className={styles.item}>
                <b>No. DE PARTIDOS </b>
                <br />
                <b>1° Semestre: </b>
                {' '}
                {prepare.partidos1}
                <br />
                <b>2° Semestre:</b>
                {' '}
                {prepare.partidos2}
              </li>
              <li className={styles.item}>
                <b>No. DE GOLES: </b>
                <br />
                <b>1° Semestre:</b>
                {' '}
                {prepare.goles1}
                <br />
                <b>2° Semestre:</b>
                {' '}
                {prepare.goles2}
              </li>
              <li className={styles.item}>
                <b>No. TARJ. AMARILLAS </b>
                {' '}
                <br />
                <b>1° Semestre:</b>
                {' '}
                {prepare.amarillas1}
                {' '}
                <br />
                <b>2° Semestre:</b>
                {' '}
                {prepare.amarillas2}
              </li>
              <li className={styles.item}>
                <b>No. TARJ. ROJAS </b>
                {' '}
                <br />
                <b>1° Semestre:</b>
                {' '}
                {prepare.rojas1}
                <br />
                <b>2° Semestre:</b>
                {' '}
                {prepare.rojas2}
              </li>
            </ul>
            <ul className={styles.items}>
              <li className={styles.item}>
                <b>TEST ABDOMINAL: </b>
                {' '}
                <br />
                {prepare.testabdominal}
                <br />
                <b>TEST COOPER:</b>
                <br />
                {' '}
                {prepare.testcooper}
              </li>
              <li className={styles.item}>
                <b>TEST FLEXIBILIDAD:</b>
                {' '}
                <br />
                {prepare.testflexibilidad}
                <br />
                <b>TEST SALTOS:</b>
                {' '}
                <br />
                {prepare.testsaltos}
              </li>
              <li className={styles.item}>
                <b>TEST VELOCIDAD</b>
                {' '}
                <br />
                {prepare.testvelocidad}
                {' '}
                <br />
                <b>TEST YOYO:</b>
                <br />
                {' '}
                {prepare.testyoyo}
              </li>
            </ul>
          </div>
        </div>

      </main>
    </>

  );
}

function mapStateToProps({ patients }) {
  return {
    patientList: patients.patientList,
    clinicalHistoryFireBase: patients.clinicalHistoryFireBase,
    therapy: patients.therapy,
    prepare: patients.prepare,
    userName: patients.userName,
  };
}

export default connect(mapStateToProps)(PlayerView);
