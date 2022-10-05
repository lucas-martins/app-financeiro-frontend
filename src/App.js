import React from 'react'
import { Grommet } from 'grommet'

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage} from './UserContext';

import { theme } from './config/appTheme';
import { ToastContainerApp } from './components/utils/ToastContainerApp';

import { HeaderApp } from './components/Header/HeaderApp';
import { SidebarApp } from './components/Sidebar/SidebarApp';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import { Account } from './components/Account/Account';
import {Graphs} from './components/Graphs/Graphs'
import { Transactions } from './components/Transactions/Transactions';
import {Calendar} from './components/Calendar/Calendar'

import ProtectedRoute from './Helpers/ProtectedRoute';
import { FinancialAccounts } from './components/FinancialAccounts/FinancialAccounts';


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
              <Route path="/calendar" element={
                  <ProtectedRoute>
                    <Calendar />
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
