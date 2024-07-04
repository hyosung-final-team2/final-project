import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// Importing pages

import CustomerLogin from './customer/pages/external/Login';
import CustomerRegister from './customer/pages/external/Register';
import CustomerForgotPassword from './customer/pages/external/ForgotPassword';
import CustomerLayout from './customer/layouts/Layout';
import AddressSearchPopUp from './customer/components/common/AddressSearch/AddressSearchPopUp';

const App = () => {
  const [token, setToken] = useState(true);

  return (
    <>
      <Routes>
        {/* Customer Routes */}
        <Route
          path='/customer/*'
          element={
            <Routes>
              <Route path='login' element={<CustomerLogin />} />
              <Route path='register' element={<CustomerRegister />} />
              <Route path='forgot-password' element={<CustomerForgotPassword />} />
              <Route path='app/*' element={<CustomerLayout />} />
              <Route path='*' element={<Navigate to={token ? '/customer/app/dashboard' : '/customer/login'} replace />} />
              <Route path='/address-search' element={<AddressSearchPopUp />} />
            </Routes>
          }
        />

        {/* Fallback Route */}
        <Route path='*' element={<Navigate to={token ? '/customer/app/dashboard' : '/customer/login'} replace />} />
      </Routes>
    </>
  );
};

export default App;
