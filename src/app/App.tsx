import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import LoginPage from './components/LoginPage';
import SelectCompanyPage from './components/SelectCompanyPage';
import LandingPage from './components/LandingPage';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/select-company" element={<SelectCompanyPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}
