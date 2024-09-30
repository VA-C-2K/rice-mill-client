import { useAxios } from '../../context/axios-context';
import { objectToQueryString } from '../../utils/object-to-query-params';

export const useDailyExpensesApi = () => {
  const axios = useAxios();
  return {
    getDailyExpenses: async (queryObj) => {
      const queryString = objectToQueryString(queryObj);
      const { data } = await axios.get(`/daily-expenses?${queryString}`);
      return data;
    },

    createDailyExpense: async (createDailyData) => {
      const { data } = await axios.post('/daily-expenses', createDailyData);
      return data;
    },

    updateDailyExpense: async (createDailyData) => {
      const { daily_expense_id: id, ...payload } = createDailyData;
      const { data } = await axios.put(`/daily-expenses/${id}`, payload);
      return data;
    },

    deleteDailyExpense: async (id) => {
      const { data } = await axios.delete(`/daily-expenses/${id}`);
      return data;
    },

    getDailyExpenseById: async (id) => {
      const { data } = await axios.get(`/daily-expenses/${id}`);
      return data;
    }
  };
};