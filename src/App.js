import React from 'react'
import { Grommet } from 'grommet'

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage } from './UserContext';

import { theme } from './config/appTheme';
import { ToastContainerApp } from './components/utils/ToastContainerApp';

import { HeaderApp } from './components/Header/HeaderApp';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import ProtectedRoute from './Helpers/ProtectedRoute';

function App() {
  return (
    <Grommet theme={theme} themeMode="dark">
      <BrowserRouter>
        <UserStorage>
          <HeaderApp />
          <main className='AppBody'>
            <Routes>
              <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
              }/>
              <Route path="login/*" element={<Login />} />
              <Route path="register/*" element={<Register />} />
              <Route path="/home" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
              }/>
            </Routes>
          </main>
        </UserStorage>
        <ToastContainerApp />
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
