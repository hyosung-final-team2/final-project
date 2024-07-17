import React, { useState } from 'react';
import PasswordKeypad from '../../components/PaymentMethod/PasswordKeypad';

const InputPassword = ({}) => {
  const [paymentPassword, setPaymentPassword] = useState('');
  return (
    <div className='h-full'>
      <PasswordKeypad onPasswordEnter={setPaymentPassword} amount='49,800' />
    </div>
  );
};

export default InputPassword;
