import { useAxios } from '../../context/axios-context';
import { objectToQueryString } from '../../utils/object-to-query-params';

export const useEmployeeApi = () => {
  const axios = useAxios();

  return {
    getEmployees: async (queryObj) => {
      const queryString = objectToQueryString(queryObj);
      const { data } = await axios.get(`/employees?${queryString}`);
      return data;
    },

    createEmployee: async (employeeData) => {
      const { data } = await axios.post('/employees', employeeData);
      return data;
    },

    updateEmployee: async (employeeData) => {
      const { emp_id: empId, ...payload } = employeeData;
      const { data } = await axios.put(`/employees/${empId}`, payload);
      return data;
    },

    deleteEmployee: async (empId) => {
      const { data } = await axios.delete(`/employees/${empId}`);
      return data;
    },

    getEmployeeById: async (empId) => {
      const { data } = await axios.get(`/employees/${empId}`);
      return data;
    }
  };
};