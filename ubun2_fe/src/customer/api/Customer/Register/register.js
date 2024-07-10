import publicFetch from '../../common/publicFetch.js';

// 고객 회원가입
export const signUp = async (signUpData) => await publicFetch.post('/customers/signup', signUpData);