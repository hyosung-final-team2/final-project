import { useMutation } from '@tanstack/react-query';
import { signUp } from './register.js';
import useRegisterStepStore from '../../../store/Register/registerStepStore.js';
import useFCMTokenStore from "../../../../FCMTokenStore.js";
import {formatPhoneNumber} from "../../../utils/phoneFormat.js";

export const useSignup = thirdRegisterObj => {
  const { registerFirstData, registerSecondData } = useRegisterStepStore(state => ({
    registerFirstData: state.registerFirstData,
    registerSecondData: state.registerSecondData,
  }));
  const { FCMToken } = useFCMTokenStore()

  const signUpData = {
    customerLoginId: registerSecondData.customerLoginId,
    customerPassword: registerSecondData.customerPassword,
    customerName: registerSecondData.customerName,
    customerPhone: formatPhoneNumber(thirdRegisterObj.customerPhone),
    customerEmail: registerSecondData.customerEmail,
    businessRegistrationNumber: registerFirstData.businessRegistrationNumber,
    businessName: thirdRegisterObj.businessName,
    businessOwner: registerFirstData.businessOwner,
    businessOpenDate: registerFirstData.businessOpenDate,
    businessAddress: `${thirdRegisterObj.businessAddressNumber},${thirdRegisterObj.businessAddressDefault},${thirdRegisterObj.businessAddressDetail}`,
    description: '상점 설명',
    fcmToken:FCMToken
  };

  return useMutation({
    mutationFn: () => signUp(signUpData),
    onError: (err) => console.log('회원가입 실패', err),
    onSuccess: () => {},
  });
};
