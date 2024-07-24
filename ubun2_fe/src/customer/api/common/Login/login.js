import publicFetch from '../publicFetch.js';
import privateFetch from "../privateFetch.js";

// 로그인
export const login = async loginData => await publicFetch.post('/login', loginData);

// 상점이름
export const getStoreName = async () => await privateFetch.get("/customers/storename");