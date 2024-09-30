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
      const { emp_id: id, ...payload } = employeeData;
      const { data } = await axios.put(`/employees/${id}`, payload);
      return data;
    },

    deleteEmployee: async (id) => {
      const { data } = await axios.delete(`/employees/${id}`);
      return data;
    },

    getEmployeeById: async (id) => {
      const { data } = await axios.get(`/employees/${id}`);
      return data;
    }
  };
};