import privateFetch from '../../common/privateFetch';
import privateFileFetch from '../../common/privateFileFetch';

export const getMypage = async () => {
  try {
    const response = await privateFetch.get('/customers/mypage');
    return response.data;
  } catch (error) {
    console.error('Get mypage failed: ', error);
    throw error;
  }
};

export const updateMypage = async (myPageUpdateRequest, imageFile) => {
  const formData = new FormData();
  formData.append('myPageUpdateRequest', new Blob([JSON.stringify(myPageUpdateRequest)], { type: 'application/json' }));

  if (imageFile) {
    formData.append('image', imageFile);
  } // imageFile이 undefined인 경우, image 필드를 추가 X

  try {
    const response = await privateFileFetch.put('/customers/mypage', formData);
    return response.data;
  } catch (error) {
    console.error('Update mypage failed: ', error);
    throw error;
  }
};
