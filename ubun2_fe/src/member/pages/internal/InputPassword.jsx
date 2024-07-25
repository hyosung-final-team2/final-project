import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordKeypad from '../../components/PaymentMethod/PasswordKeypad';
import useOrderItemsStore from '../../store/order/orderItemStore';
import { useCheckPassword } from '../../api/Payment/queries';

const InputPassword = () => {
  const [isRightPassword, setIsRightPassword] = useState(null);
  const navigate = useNavigate();
  const { totals } = useOrderItemsStore();
  const { mutateAsync: checkPassword } = useCheckPassword();
  const [password, setPassword] = useState('');
  const [errorCount, setErrorCount] = useState(0);

  const handlePasswordEnter = useCallback(async () => {
    if (password.length === 6) {
      try {
        const result = await checkPassword(password);
        setIsRightPassword(result?.data?.data);
        if (result?.data?.data) {
          navigate('/member/app/order-complete', { replace: true });
        } else {
          setPassword('');
          setErrorCount(prevCount => prevCount + 1);
          if (errorCount >= 4) {
            navigate('/member/app/home');
          }
        }
      } catch (error) {
        console.error('Password check failed:', error);
        setPassword('');
        alert('비밀번호 확인 중 오류가 발생했습니다.');
      }
    }
  }, [password, checkPassword, navigate]);

  return (
    <div className='h-full'>
      <PasswordKeypad
        password={password}
        setPassword={setPassword}
        onPasswordEnter={handlePasswordEnter}
        amount={totals.totalAmount?.toLocaleString() ?? '0'}
        isRightPassword={isRightPassword}
        errorCount={errorCount}
      />
    </div>
  );
};

export default InputPassword;
