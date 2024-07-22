import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Toaster, toast } from 'react-hot-toast';
import {initializeApp} from "firebase/app";
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

// Customer
import CustomerLogin from './customer/pages/external/Login';
import CustomerRegister from './customer/pages/external/Register';
import CustomerForgotPassword from './customer/pages/external/ForgotPassword';
import CustomerLayout from './customer/layouts/Layout';
import AddressSearchPopUp from './customer/components/common/AddressSearch/AddressSearchPopUp';

//Member
import MemberLogin from './member/pages/external/Login.jsx'
import MemberRegister from './member/pages/external/Register.jsx'
import MemberForgotPassword from './member/pages/external/ForgotPassword.jsx'
import MemberForgotLoginId from "./member/pages/external/ForgotLoginId.jsx";
import MemberResetPassword from './member/pages/external/ResetPassword.jsx'
import MemberLayout from './member/layouts/Layout.jsx'
import {useEffect} from "react";
import useFCMTokenStore from "./FCMTokenStore.js";

const App = () => {
  const customToastStyle = {
    padding: '16px 24px',
    fontSize: '18px',
  };
  const notify = () => toast('Here is your toast!');
  const token = localStorage.getItem('token');

  const {FCMToken, setFCMToken} = useFCMTokenStore()

  const onMessageFCM = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const firebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    });

    const messaging = getMessaging(firebaseApp);

    getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY })
        .then(currentToken => {
          if (currentToken) {
            console.log(currentToken);
            setFCMToken(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch(err => {
          console.log('An error occurred while retrieving token. ', err);
        });

    onMessage(messaging, payload => {
      console.log('Message received. ', payload);
      console.log(payload.notification?.title);
      // setOnMessageTitle(payload.notification?.title);
    });
  };

  useEffect(() => {
    onMessageFCM();
  },[])


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

        {/* Member Routes */}
        <Route
          path='/member/*'
          element={
            <Routes>
              <Route path='login' element={<MemberLogin />} />
              <Route path='forgot-password' element={<MemberForgotPassword />} />
              <Route path='forgot-loginid' element={<MemberForgotLoginId />} />
              <Route path={'reset-password'} element={<MemberResetPassword />} />
              <Route path='register' element={<MemberRegister />} />
              <Route path='app/*' element={<MemberLayout />} />
              <Route path='*' element={<Navigate to={token ? '/member/app/home' : '/member/login'} replace />} />
            </Routes>
          }
        />

        {/* Fallback Route */}
        <Route path='*' element={<Navigate to={token ? '/customer/app/dashboard' : '/customer/login'} replace />} />
      </Routes>

      {/* 토스터 등록 */}
      <Toaster
        position='top-right'
        toastOptions={{
          success: {
            style: {
              ...customToastStyle,
              background: 'rgba(3, 149, 1, 0.35)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              backdropFilter: 'blur(7px)',
              WebkitBackdropFilter: 'blur(7px)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: 'white',
            },
          },
          error: {
            style: {
              ...customToastStyle,
              background: 'rgba(240, 72, 72, 0.35)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              backdropFilter: 'blur(7px)',
              WebkitBackdropFilter: 'blur(7px)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: 'white',
            },
          },
        }}
      />
    </>
  );
};

export default App;
