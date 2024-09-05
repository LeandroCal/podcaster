import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import './styles/global.css';
import { AlertProvider } from './context/AlertContext';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <MainLayout>
        <AlertProvider>
          <AppRoutes />
        </AlertProvider>
      </MainLayout>
    </Router>
  );
}

export default App;
