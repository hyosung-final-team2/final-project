import publicFetch from "../publicFetch.js";

// refreshToken 통한 Access,Refresh 재발급
export const sendRefreshToken = async () => await publicFetch.post('/token/refresh');
