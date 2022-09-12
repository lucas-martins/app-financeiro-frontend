import React from 'react'
import { Grommet } from 'grommet'
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage } from './UserContext';

import { theme } from './config/appTheme';

import { HeaderApp } from './components/Header/HeaderApp';
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
              <Route path="register/*" element={<Register />} />
            </Routes>
          </main>
        </UserStorage>
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
