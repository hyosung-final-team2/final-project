import publicFetch from '../publicFetch.js';

// 로그인
export const login = loginData => publicFetch.post('/login', loginData);