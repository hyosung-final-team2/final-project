import publicFetch from '../common/publicFetch.js';

export const sendEmail = async email => publicFetch.post('/auth/send', email);

export const authEmail = async (email, authenticationNumber) => publicFetch.post('/auth', { email, authenticationNumber });

export const checkDuplicateId = async (loginId, userType) => await publicFetch.post('/checkId', { loginId, userType });
