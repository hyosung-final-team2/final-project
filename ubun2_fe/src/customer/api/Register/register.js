import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const signUp = async signUpData => {
  if (!apiUrl) {
    throw new Error('The API URL is not defined');
  }

  try {
    return await axios.post(`${apiUrl}/customers/signup`, signUpData);
  } catch (error) {
    console.error('Sign up failed', error);
    throw error;
  }
};
