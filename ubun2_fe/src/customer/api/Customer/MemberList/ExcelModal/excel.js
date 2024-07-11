import privateFetch from '../../../common/privateFetch.js';
import privateFileFetch from '../../../common/privateFileFetch.js';

export const excelDownload = async () => {
  try {
    const res = await privateFetch.get('download/excel', {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '회원_등록_양식.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Excel download failed: ', error);
  }
};

export const uploadExcel = async file => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await privateFileFetch.post('/upload/excel', formData);
    return res.data;
  } catch (error) {
    console.error('Excel upload failed: ', error);
  }
};
