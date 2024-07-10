import publicFetch from '../publicFetch.js';

// 로그인
export const login = async loginData => await publicFetch.post('/login', loginData);