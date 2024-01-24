import './App.css';
import { Route, Routes } from 'react-router';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import Passes from '@/pages/Passes';
import Login from '@/pages/Login';
import toasts from '@/store/Toasts';
import { BrowserRouter } from 'react-router-dom';

import 'normalizecss/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import ToastsContainer from '@/components/ToastsContainer';
import PwaInstallNotification from '@/components/PwaInstallButton/PwaInstallNotification';

function App() {
  return (
    <>
      <PwaInstallNotification />
      <BrowserRouter basename={'/lp-tsn/'}>
        <Routes>
          <Route path="/login" element={<Login toasts={toasts} />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Passes toasts={toasts} />} index />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastsContainer toasts={toasts} />
    </>
  );
}

export default App;
