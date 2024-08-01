import { useMutation } from '@tanstack/react-query';
import { authEmail, checkDuplicateId, sendEmail } from './register.js';

export const useSendEmail = (email, userType, isRegister) => {
  const emailData = {
    email,
    userType,
    isRegister
  };
  return useMutation({
    mutationFn: () => sendEmail(emailData),
  });
};

export const useAuthEmail = () => {
  return useMutation({
    mutationFn: ({ email, authenticationNumber }) => authEmail(email, authenticationNumber),
  });
};

export const useCheckDuplicateId = () => {
  return useMutation({
    mutationFn: ({ loginId, userType }) => checkDuplicateId(loginId, userType),
  });
};
