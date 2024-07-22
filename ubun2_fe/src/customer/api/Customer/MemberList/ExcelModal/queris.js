import { useMutation } from '@tanstack/react-query';
import { uploadExcel } from './excel.js';

export const useUploadExcel = () => {
  return useMutation({
    mutationFn: file => uploadExcel(file),
  });
};
