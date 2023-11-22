/* eslint default-param-last: off */
import {
  GET_PATIENTS,
  SET_USER,
  SET_CLINICAL,
  SET_THERAPY,
  CLEAR_CLINICAL,
  CLEAR_THERAPY,
  SET_PREPARE,
  CLEAR_PREPARE,
} from '../constants';

const clinicalHistoryInitialState = {
  allergy: 'NA',
  bloodType: 'NA',
  consultation: 'NA',
  doctor: 'NA',
  idDoc: 'NA',
  illness: 'NA',
  injury: 'NA',
  medicine: 'NA',
  sex: 'NA',
  surgery: 'NA',
  surgeryBool: 'NA',
  tranfusion: 'NA',
  tranfusionReaction: 'NA',
  viveH: 'NA',
  viveM: 'NA',
  viveP: 'NA',
  simbIllness: 'NA',
  renal: 'NA',
  motherIllness: 'NA',
  fatherIllness: 'NA',
  cardio: 'NA',
  medicamentos_APP: 'NA',
  numberSimblings: 'NA',
  alcohol: 'NA',
  smook: 'NA',
  inmun: 'NA',
};

const initialStateTherapy = {
  inDate: '',
  outDate: '',
  injuryBool: '',
  injuryDate: '',
  orthesisBool: '',
  orthesis: '',
  diagnosis: '',
  record: '',
  idDoc: '',
};

const initialStatePrepare = {
  amarillas1: '',
  amarillas2: '',
  bt: '',
  edema: '',
  fc: '',
  fovea: '',
  fr: '',
  goles1: '',
  goles2: '',
  goniometry: '',
  lhandMmii: '',
  lhandMmss: '',
  march: '',
  mci: '',
  painBool: '',
  painScale: '',
  partidos1: '',
  partidos2: '',
  perometer: '',
  place: '',
  rhandMmii: '',
  rhandMmss: '',
  rojas1: '',
  rojas2: '',
  size: '',
  ta: '',
  testMmii: '',
  testMmss: '',
  weight: '',
  testabdominal: '',
  testcooper: '',
  testflexibilidad: '',
  testsaltos: '',
  testvelocidad: '',
  testyoyo: '',
};

export const initialState = {
  patientList: [],
  userName: {},
  therapy: initialStateTherapy,
  clinicalHistoryFireBase: clinicalHistoryInitialState,
  prepare: initialStatePrepare,
};

const savedListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PATIENTS: {
      return {
        ...state,
        patientList: payload,
      };
    }
    case SET_USER: {
      return {
        ...state,
        userName: payload,
      };
    }
    case SET_CLINICAL: {
      return {
        ...state,
        clinicalHistoryFireBase: payload,
      };
    }
    case CLEAR_CLINICAL: {
      return {
        ...state,
        clinicalHistoryFireBase: clinicalHistoryInitialState,
      };
    }
    case SET_THERAPY: {
      return {
        ...state,
        therapy: payload,
      };
    }
    case CLEAR_THERAPY: {
      return {
        ...state,
        therapy: initialStateTherapy,
      };
    }
    case SET_PREPARE: {
      return {
        ...state,
        prepare: payload,
      };
    }
    case CLEAR_PREPARE: {
      return {
        ...state,
        prepare: initialStatePrepare,
      };
    }

    default:
      return state;
  }
};

export default savedListReducer;
