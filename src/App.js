import React from 'react'
import { Grommet } from 'grommet'

import './App.css';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage} from './UserContext';

import { theme } from './config/appTheme';

import { HeaderApp } from './components/Header/HeaderApp';
import { SidebarApp } from './components/Sidebar/SidebarApp';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Home } from './pages/Home/Home';
import { Transactions } from './pages/Transactions/Transactions';
import { Account } from './components/Account/Account';
import {Graphs} from './components/Graphs/Graphs'

import ProtectedRoute from './Helpers/ProtectedRoute';
import { FinancialAccounts } from './pages/FinancialAccounts/FinancialAccounts';


function App() {
  return (
    <Grommet theme={theme} themeMode="dark">
      <BrowserRouter>
        <UserStorage>
          <HeaderApp />
          <SidebarApp />
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
              <Route path="/account" element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
              }/>
              <Route path="/financialAccounts" element={
                  <ProtectedRoute>
                    <FinancialAccounts />
                  </ProtectedRoute>
              }/>
              <Route path="/transactions" element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
              }/>
              <Route path="/graphs" element={
                  <ProtectedRoute>
                    <Graphs />
                  </ProtectedRoute>
              }/>
            </Routes>
          </main>
        </UserStorage>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
