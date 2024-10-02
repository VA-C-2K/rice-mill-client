import { useAxios } from '../../context/axios-context';
import { objectToQueryString } from '../../utils/object-to-query-params';

export const useCustomerApi = () => {
  const axios = useAxios();
  return {
    getCustomers: async (queryObj) => {
      const queryString = objectToQueryString(queryObj);
      const { data } = await axios.get(`/customers?${queryString}`);
      return data;
    },

    createCustomer: async (customerData) => {
      const { data } = await axios.post('/customers', customerData);
      return data;
    },

    updateCustomer: async (customerData) => {
      const { cust_id: id, ...payload } = customerData;
      const { data } = await axios.put(`/customers/${id}`, payload);
      return data;
    },

    deleteCustomer: async (id) => {
      const { data } = await axios.delete(`/customers/${id}`);
      return data;
    },

    getCustomerById: async (id) => {
      const { data } = await axios.get(`/customers/${id}`);
      return data;
    }
  };
};