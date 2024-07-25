import publicFetch from '../publicFetch.js';
import privateFetch from "../privateFetch.js";

// 로그인
export const login = async loginData => await publicFetch.post('/login', loginData);

// 고객 정보(상점이름)
export const getStoreName = async () => await privateFetch.get("/customers/storename");

// 회원 정보(회원이름)
export const getMemberInfo = async () => await privateFetch.get("/members/memberinfo");