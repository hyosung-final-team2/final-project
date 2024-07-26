import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckPassword, useSetNewPassword } from '../../api/Payment/queries';
import SetPasswordKeypad from '../../components/PaymentMethod/SetPasswordKeypad';
import usePaymentStore from '../../store/Payment/PaymentStore';

const SetPassword = () => {
  const [step, setStep] = useState('initial');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldRandomize, setShouldRandomize] = useState(0);

  const navigate = useNavigate();
  const { mutateAsync: checkPassword } = useCheckPassword();
  const { mutateAsync: setNewPasswordMutation } = useSetNewPassword();
  const { isEditPassword, resetEditPassword } = usePaymentStore();

  // 비밀번호 변경 페이지 진입 시, 현재 비밀번호 입력부터 시작
  // 비밀번호가 없을때 새 비밀번호 입력부터 시작
  useEffect(() => {
    if (!isEditPassword) {
      setStep('newPassword');
    }
  }, [isEditPassword]);

  // 에러 카운트 초기화
  const resetErrorCount = () => {
    setErrorCount(0);
    setErrorMessage('');
  };

  // 비밀번호 입력 후, 다음 단계로 넘어가는 함수
  const handlePasswordEnter = useCallback(async () => {
    // 현재 비밀번호 입력 후, 새 비밀번호 입력으로 넘어가는 경우
    if (step === 'initial' && currentPassword.length === 6) {
      try {
        const result = await checkPassword(currentPassword);
        // 현재 비밀번호가 맞는 경우
        if (result?.data?.data) {
          setStep('newPassword');
          setCurrentPassword('');
          resetErrorCount();
          setShouldRandomize(prev => prev + 1); // 키패드 재배치 트리거
        } else {
          setErrorCount(prevCount => prevCount + 1);
          setErrorMessage('5회 연속 틀릴 시 홈으로 이동');
          setCurrentPassword('');
          setShouldRandomize(prev => prev + 1); // 키패드 재배치 트리거
        }
      } catch (error) {
        console.error('Password check failed:', error);
        setErrorMessage('비밀번호 확인 중 오류가 발생했어요');
        setCurrentPassword('');
      }
    } else if (step === 'newPassword' && newPassword.length === 6) {
      // 새 비밀번호 입력 후, 새 비밀번호 확인으로 넘어가는 경우
      setStep('confirmPassword');
      setConfirmPassword('');
      resetErrorCount();
      setShouldRandomize(prev => prev + 1); // 키패드 재배치 트리거
    } else if (step === 'confirmPassword' && confirmPassword.length === 6) {
      // 새 비밀번호 확인 후, 새 비밀번호 설정하는 경우
      if (newPassword === confirmPassword) {
        try {
          await setNewPasswordMutation(newPassword);
          resetEditPassword();
          resetErrorCount();
          navigate('/member/app/mypage/payment-list');
        } catch (error) {
          console.error('Setting new password failed:', error);
          setErrorMessage('새 비밀번호 설정 중 오류가 발생했습니다.');
        }
        // 비밀번호 변경 성공 시, 비밀번호 변경 페이지를 떠남
      } else {
        setErrorCount(prevCount => prevCount + 1);
        setErrorMessage('비밀번호가 일치하지 않아요 다시 입력해주세요');
        setConfirmPassword('');
        setShouldRandomize(prev => prev + 1); // 키패드 재배치 트리거
      }
    }
  }, [step, currentPassword, newPassword, confirmPassword, checkPassword, setNewPasswordMutation, navigate, resetEditPassword]);

  const renderTitle = () => {
    switch (step) {
      case 'initial':
        return '결제 비밀번호 6자리를';
      case 'newPassword':
        return '새로운 결제 비밀번호 6자리를';
      case 'confirmPassword':
        return '다시 한 번 입력해주세요';
      default:
        return '';
    }
  };
  const renderSubtitle = () => {
    switch (step) {
      case 'initial':
        return '입력해주세요';
      case 'newPassword':
        return '등록해주세요';
      default:
        return '';
    }
  };

  return (
    <div className='h-full'>
      <SetPasswordKeypad
        password={step === 'initial' ? currentPassword : step === 'newPassword' ? newPassword : confirmPassword}
        setPassword={step === 'initial' ? setCurrentPassword : step === 'newPassword' ? setNewPassword : setConfirmPassword}
        onPasswordEnter={handlePasswordEnter}
        isSetting={true}
        errorCount={errorCount}
        errorMessage={errorMessage}
        title={renderTitle()}
        subtitle={renderSubtitle()}
        shouldRandomize={shouldRandomize}
      />
    </div>
  );
};

export default SetPassword;
