import privateFetch from '../../common/privateFetch';

export const getMypage = async () => {
  try {
    return await privateFetch.get('/customers/mypage');
  } catch (error) {
    console.error('Get mypage failed: ', error);
  }
};

export const updateMypage = async mypageData => {
  try {
    return await privateFetch.put('/customers/mypage', mypageData);
  } catch (error) {
    console.error('Update mypage failed: ', error);
  }
};
