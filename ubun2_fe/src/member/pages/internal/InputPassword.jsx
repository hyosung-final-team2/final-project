import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordKeypad from '../../components/PaymentMethod/PasswordKeypad';
import useOrderDataStore from '../../store/order/orderDataStore';
import useOrderItemsStore from '../../store/order/orderItemStore';

const InputPassword = () => {
  const [paymentPassword, setPaymentPassword] = useState('');
  const navigate = useNavigate();
  const { orderData } = useOrderDataStore();
  const { calculateTotals } = useOrderItemsStore();

  const handlePasswordEnter = useCallback(
    async password => {
      setPaymentPassword(password);

      if (password.length === 6) {
        // 비밀번호가 완전히 입력되었다고 가정
        // 주문 API 호출 대신 주문 완료 페이지로 이동
        navigate('/member/app/order-complete', { replace: true });
      }
    },
    [navigate]
  );

  const totals = calculateTotals();

  return (
    <div className='h-full'>
      <PasswordKeypad onPasswordEnter={handlePasswordEnter} amount={totals.totalAmount?.toLocaleString() ?? '0'} />
    </div>
  );
};

export default InputPassword;
