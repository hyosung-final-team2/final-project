import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordKeypad from '../../components/PaymentMethod/PasswordKeypad';
import useOrderItemsStore from '../../store/order/orderItemStore';
import useOrderDataStore from '../../store/order/orderDataStore';
import { useCheckPassword } from '../../api/Payment/queries';
import { useValidateOrder } from '../../api/Order/queris';

const InputPassword = () => {
  const [isRightPassword, setIsRightPassword] = useState(null);
  const navigate = useNavigate();
  const { totals } = useOrderItemsStore();
  const { orderData, selectedAddressId, selectedPaymentMethodId, selectedPaymentMethodType } = useOrderDataStore();
  const { mutateAsync: checkPassword } = useCheckPassword();
  const { mutateAsync: validateOrder } = useValidateOrder();
  const [password, setPassword] = useState('');
  const [errorCount, setErrorCount] = useState(0);

  const handlePasswordEnter = useCallback(async () => {
    if (password.length === 6) {
      try {
        const result = await checkPassword(password);
        setIsRightPassword(result?.data?.data);
        if (result?.data?.data) {
          // 비밀번호가 맞으면 유효성 검사 진행
          const orderDataWithPayment = orderData.map(item => ({
            ...item,
            addressId: selectedAddressId,
            paymentMethodId: selectedPaymentMethodId,
            paymentType: selectedPaymentMethodType,
          }));

          const validateResult = await validateOrder(orderDataWithPayment);
          if (validateResult) {
            // 유효성 검사 통과 시 주문 완료 페이지로 이동
            navigate('/member/app/order-complete', { replace: true });
          }
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
      }
    }
  }, [password, checkPassword, validateOrder, navigate, errorCount, orderData, selectedAddressId, selectedPaymentMethodId, selectedPaymentMethodType]);

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
