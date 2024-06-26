import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import ToastsContainer from '@/components/ToastsContainer';
import Login from '@/pages/Login';
import Passes from '@/pages/Passes';
import toasts from '@/store/Toasts';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalizecss/normalize.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
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
