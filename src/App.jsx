/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Login } from './pages/login/Login';
import { Register } from './pages/signup/Register';
import Physiotherapy from './pages/clinichistory/physiotherapy';
import PlayerList from './pages/playerlist/PlayerList';
import NewPatient from './pages/newpatient/NewPatient';
import ClinicHistory from './pages/clinichistory/ClinicHistory';
import Therapy from './pages/therapy/Therapy';
import PlayerView from './pages/playerview/PlayerView';
import 'react-toastify/dist/ReactToastify.css';
import PhysicalExploration from './pages/clinichistory/physicalExploration';

export function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/PlayerList" element={<PlayerList />} />
        <Route path="/NewPatient" element={<NewPatient />} />
        <Route path="/:id/Therapy" element={<Therapy />} />
        <Route path="/:id/ClinicHistory" element={<ClinicHistory />} />
        <Route path="/:id/PlayerView" element={<PlayerView />} />
        <Route path="/:id/Physiotherapy" element={<Physiotherapy />} />
        <Route path="/:id/PhysicalExploration" element={<PhysicalExploration />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </main>
  );
}
