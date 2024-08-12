import { useAxios } from '../../context/axios-context';
import { objectToQueryString } from '../../utils/object-to-query-params';

export const useEmployeeApi = () => {
  const axios = useAxios();

  return {
    getEmployees: async (queryObj) => {
      const queryString = objectToQueryString(queryObj);
      const { data } = await axios.get(`/employee?${queryString}`);
      return data;
    },

    createEmployee: async (employeeData) => {
      const { data } = await axios.post('/employee/create', employeeData);
      return data;
    },

    updateEmployee: async (employeeData) => {
      const { data } = await axios.put('/employee/update', employeeData);
      return data;
    },

    deleteEmployee: async (empId) => {
      const { data } = await axios.delete(`/employee/delete?emp_id=${empId}`);
      return data;
    },

    getEmployeeById: async (empId) => {
      const { data } = await axios.get(`/employee?emp_id=${empId}`);
      return data;
    }
  };
};