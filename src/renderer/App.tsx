import { useEffect } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import { ToastContainer } from 'react-toastify';
import store from './store';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import ChatHome from './pages/ChatHome';
import Login from './pages/Login';
import { setupIpcHandlers } from './utils/ipcHandlers';

setupIpcHandlers();

function RouteProgress() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chatHome" element={<ChatHome />} />{' '}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <RouteProgress />
      </Router>
    </Provider>
  );
}
