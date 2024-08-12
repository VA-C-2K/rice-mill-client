/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import axiosInstance from '../api/axios-instance';

const AxiosContext = createContext(null);

export const useAxios = () => useContext(AxiosContext);

export const AxiosProvider = ({ children }) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};