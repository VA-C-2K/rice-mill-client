import { useAxios } from '../../context/axios-context';

export const useAuthApi = () => {
  const axios = useAxios();
  return {
    login: async (payload) => {
      const { data } = await axios.post('/users/login', payload);
      return data;
    },
    signUp: async (payload) => {
      const { data } = await axios.post('/users', payload);
      return data;
    },
  };
};