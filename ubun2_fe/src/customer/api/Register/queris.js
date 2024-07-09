import { useMutation } from '@tanstack/react-query';
import { signUp } from './register.js';
import useRegisterStepStore from '../../store/Register/registerStepStore';

export const useSignup = thirdRegisterObj => {
  const { registerFirstData, registerSecondData } = useRegisterStepStore(state => ({
    registerFirstData: state.registerFirstData,
    registerSecondData: state.registerSecondData,
  }));

  const signUpData = {
    customerLoginId: registerSecondData.customerLoginId,
    customerPassword: registerSecondData.customerPassword,
    customerName: registerSecondData.customerName,
    customerPhone: thirdRegisterObj.customerPhone,
    customerEmail: registerSecondData.customerEmail,
    businessRegistrationNumber: registerFirstData.businessRegistrationNumber,
    businessName: thirdRegisterObj.businessName,
    businessOwner: registerFirstData.businessOwner,
    businessOpenDate: registerFirstData.businessOpenDate,
    businessAddress: `${thirdRegisterObj.businessAddressNumber} ${thirdRegisterObj.businessAddressDefault} ${thirdRegisterObj.businessAddressDetail}`,
    description: '상점 설명',
  };

  return useMutation({
    mutationFn: () => signUp(signUpData),
    onSuccess: () => {},
  });
};
