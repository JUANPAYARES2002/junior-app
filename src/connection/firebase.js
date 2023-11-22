/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  doc,
  getDocs,
  where,
  setDoc,
  collection,
  query,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';
import { useState } from 'react';
import { toastMessage } from '../utils/toast';
import {
  setPatientList,
  setUser,
  setClinicalHistory,
  clearClinicalHistory,
  setTherapy,
  clearTherapy,
  setPrepare,
  clearPrepare,
} from '../redux/actions/PatientListActions';
const fb = firebase.initializeApp(firebaseConfig);
const auth = fb.auth();
const db = fb.firestore();

const deletePatient = async (id) => {
  try {
    const docRef = doc(db, 'patients', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};

const signUpWithEmailAndPassword = async (name, profesion, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const { user } = res;
    await db.collection('users').add({
      uid: user.uid,
      name,
      profesion,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.log(err);
    toastMessage('error', 'Error al crear usuario, posiblemente el usuario ya exista, intente de nuevo', 'error_register');
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    toastMessage('error', 'Correo o contraseña erroneos', 'error_auth');
  }
};

const getUserName = async (id, dispatch) => {
  try {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('uid', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dispatch(setUser(doc.data()));
    });
  } catch (error) {
    console.log('doctor:', error);
    toastMessage('error', 'Ups, hubo un error, intente de nuevo.', 'error_adding_favorite');
  }
};

const getclinicalHistory = async (id, dispatch) => {
  try {
    const userRef = collection(db, 'clinicalHistory');
    const q = query(userRef, where('idDoc', '==', id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      dispatch(clearClinicalHistory());
    } else {
      querySnapshot.forEach((doc) => {
        dispatch(setClinicalHistory(doc.data()));
      });
    }
  } catch (error) {
    console.log('clinic:', error);
    toastMessage('error', 'Ups, hubo un error, intente de nuevo.', 'error_adding_favorite');
  }
};

const getTherapy = async (id, dispatch) => {
  try {
    const userRef = collection(db, 'therapy');
    const q = query(userRef, where('idDoc', '==', id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      dispatch(clearTherapy());
    } else {
      querySnapshot.forEach((doc) => {
        dispatch(setTherapy(doc.data()));
      });
    }
  } catch (error) {
    console.log('clinic:', error);
    toastMessage('error', 'Ups, hubo un error, intente de nuevo.', 'error_adding_favorite');
  }
};

const getPrepare = async (id, dispatch) => {
  try {
    const userRef = collection(db, 'prepare');
    const q = query(userRef, where('idDoc', '==', id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      dispatch(clearPrepare());
    } else {
      querySnapshot.forEach((doc) => {
        dispatch(setPrepare(doc.data()));
      });
    }
  } catch (error) {
    console.log('clinic:', error);
    toastMessage('error', 'Ups, hubo un error, intente de nuevo.', 'error_adding_favorite');
  }
};

const uploadFiles = (studioName, file, files, setfiles) => {
  const storage = getStorage();
  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed', (snapshot) => {
    const percent = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
    );
    setfiles({ ...files, percent });
  }, (err) => setfiles({ ...files, err }), () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
      setfiles({ ...files, [studioName]: url, percent: null });
    });
  });
};

const addPatient = async (patientInfo, navigate) => {
  try {
    const docRef = await setDoc(doc(db, 'patients', patientInfo.idDoc), {
      nameP: patientInfo.nameP || 'NA',
      age: patientInfo.age || 'NA',
      bdate: patientInfo.bdate || 'NA',
      idDoc: patientInfo.idDoc || 'NA',
      address: patientInfo.address || 'NA',
      email: patientInfo.email || 'NA',
      tel: patientInfo.tel || 'NA',
      weight: patientInfo.weight || 'NA',
      height: patientInfo.height || 'NA',
      inCharge: patientInfo.inCharge || 'NA',
    });
    navigate('/PlayerList');
    toastMessage('success', 'Paciente añadido correctamente', 'error_adding_favorite');
  } catch (e) {
    toastMessage('error', 'Error al agregar paciente, intente de nuevo.', 'error_adding_favorite');
  }
};

const addClinicalHistory = async (patientHistory, navigate) => {
  const fullPatientHistory = Object.assign(patientHistory, patientHistory.files);
  try {
    const docRef = await setDoc(doc(db, 'clinicalHistory', fullPatientHistory.idDoc), {
      allergy: fullPatientHistory.allergy || 'NA',
      bloodType: fullPatientHistory.bloodType || 'NA',
      consultation: fullPatientHistory.consultation || 'NA',
      doctor: fullPatientHistory.doctor || 'NA',
      illness: fullPatientHistory.illness || 'NA',
      injury: fullPatientHistory.injury || 'NA',
      medicine: fullPatientHistory.medicine || 'NA',
      sex: fullPatientHistory.sex || 'NA',
      surgery: fullPatientHistory.surgery || 'NA',
      surgeryBool: fullPatientHistory.surgeryBool || 'NA',
      tranfusion: fullPatientHistory.tranfusion || 'NA',
      tranfusionReaction: fullPatientHistory.tranfusionReaction || 'NA',
      idDoc: fullPatientHistory.idDoc || 'NA',
      viveH: fullPatientHistory.viveH || 'NA',
      viveM: fullPatientHistory.viveH || 'NA',
      viveP: fullPatientHistory.viveH || 'NA',
      fatherIllbness: fullPatientHistory.enfermedadesP || 'NA',
      motherIllness: fullPatientHistory.enfermedadesM || 'NA',
      simbIllness: fullPatientHistory.enfermedadesH || 'NA',
      medicamentos_APP: fullPatientHistory.medicamentos_APP || 'NA',
      numberSimblings: fullPatientHistory.numerohermanos || 'NA',
      drugs_types: fullPatientHistory.drugs_types || 'NA',
      other_drugs: fullPatientHistory.other_drugs || 'NA',
      alcohol: fullPatientHistory.alcohol || false,
      smook: fullPatientHistory.tabaquismo || false,
      inmun: fullPatientHistory.inmunizaciones || false,
      cardio: fullPatientHistory.cardio || false,
      pulmonary: fullPatientHistory.pulmonary || false,
      digestive: fullPatientHistory.digestive || false,
      diabetes: fullPatientHistory.diabetes || false,
      renal: fullPatientHistory.renal || false,
      surgical: fullPatientHistory.surgical || false,
      cuadroHematico: fullPatientHistory.cuadroHematico || false,
      ecocardiogramas: fullPatientHistory.ecocardiogramas || false,
      ecografia: fullPatientHistory.ecografia || false,
      electrocardiograma: fullPatientHistory.electrocardiograma || false,
      examenesLab: fullPatientHistory.examenesLab || false,
      parcialOrina: fullPatientHistory.parcialOrina || false,
      radiografia: fullPatientHistory.radiografia || false,
    });
    navigate(`/${patientHistory.idDoc}/PlayerView`);
    toastMessage('success', 'Historia clinica actualizada correctamente', 'error_adding_favorite');
  } catch (e) {
    console.log(e);
    toastMessage('error', 'Error al actualizar historia clinica, intente de nuevo.', 'error_adding_favorite');
  }
};

const addTherapy = async (patinettherapy, navigate) => {
  try {
    const docRef = await setDoc(doc(db, 'therapy', patinettherapy.idDoc), {
      inDate: patinettherapy.inDate || 'NA',
      outDate: patinettherapy.outDate || 'NA',
      injuryBool: patinettherapy.injuryBool || 'NA',
      injuryDate: patinettherapy.injuryDate || 'NA',
      orthesisBool: patinettherapy.orthesisBool || 'NA',
      orthesis: patinettherapy.orthesis || 'NA',
      diagnosis: patinettherapy.diagnosis || 'NA',
      record: patinettherapy.record || 'NA',
      idDoc: patinettherapy.idDoc || 'NA',
    });
    toastMessage('success', 'Datos actualizados correctamente', 'error_adding_favorite');
    navigate(`/${patinettherapy.idDoc}/PlayerView`);
  } catch (e) {
    console.log(e);
    toastMessage('error', 'Error al actualizar datos, intente de nuevo.', 'error_adding_favorite');
  }
};

const addPrepare = async (patientPrepare, navigate) => {
  console.log('patientPrepare', patientPrepare);
  try {
    const docRef = await setDoc(doc(db, 'prepare', patientPrepare.idDoc), {
      amarillas1: patientPrepare.amarillas1 || '0',
      amarillas2: patientPrepare.amarillas2 || '0',
      rojas1: patientPrepare.rojas1 || '0',
      rojas2: patientPrepare.rojas2 || '0',
      goles1: patientPrepare.goles1 || '0',
      goles2: patientPrepare.goles2 || '0',
      partidos1: patientPrepare.partidos1 || '0',
      partidos2: patientPrepare.partidos2 || '0',
      testabdominal: patientPrepare.testabdominal || 'NA',
      testcooper: patientPrepare.testcooper || 'NA',
      testflexibilidad: patientPrepare.testflexibilidad || 'NA',
      testsaltos: patientPrepare.testsaltos || 'NA',
      testvelocidad: patientPrepare.testvelocidad || 'NA',
      testyoyo: patientPrepare.testyoyo || 'NA',
      fc: patientPrepare.fc || 'NA',
      fr: patientPrepare.fr || 'NA',
      ta: patientPrepare.ta || 'NA',
      bt: patientPrepare.bt || 'NA',
      size: patientPrepare.size || 'NA',
      weight: patientPrepare.weight || 'NA',
      mci: patientPrepare.weight || 'NA',
      testMmss: patientPrepare.mci || 'NA',
      rhandMmss: patientPrepare.rhandMmss || 'NA',
      lhandMmss: patientPrepare.lhandMmss || 'NA',
      testMmii: patientPrepare.testMmii || 'NA',
      rhandMmii: patientPrepare.rhandMmii || 'NA',
      lhandMmii: patientPrepare.lhandMmii || 'NA',
      painBool: patientPrepare.painBool || 'NA',
      painScale: patientPrepare.painScale || 'NA',
      place: patientPrepare.painScale || 'NA',
      edema: patientPrepare.edema || 'NA',
      fovea: patientPrepare.fovea || 'NA',
      perometer: patientPrepare.perometer || 'NA',
      goniometry: patientPrepare.goniometry || 'NA',
      march: patientPrepare.march || 'NA',
      idDoc: patientPrepare.idDoc || 'NA',
    });
    toastMessage('success', 'Datos actualizados correctamente', 'error_adding_favorite');
    navigate(`/${patientPrepare.idDoc}/PlayerView`);
  } catch (e) {
    console.log(e);
    toastMessage('error', 'Error al actualizar datos, intente de nuevo.', 'error_adding_favorite');
  }
};

const getPatients = async (dispatch) => {
  try {
    const q = query(collection(db, 'patients'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const patients = [];
      querySnapshot.forEach((doc) => {
        patients.push(doc.data());
      });
      dispatch(setPatientList(patients));
    });
  } catch (error) {
    console.log(error);
  }
};

const logOut = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  getUserName,
  getclinicalHistory,
  getTherapy,
  getPrepare,
  addClinicalHistory,
  addTherapy,
  addPrepare,
  addPatient,
  getPatients,
  logOut,
  uploadFiles,
  deletePatient,
};
