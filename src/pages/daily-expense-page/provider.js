import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { useUserInfo } from "../../context/user-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { useGloabalInfo } from "../../context/global-context";

function useDailyExpensePage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const { activeTab, fetchList, setFetchList, searchTerm, page, setPage } = useGloabalInfo();
  const { user, token } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const config = authConfig(token);
  const [dailyExpenseList, setDailyExpenseList] = useState([]);

  const getDailyExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/daily-expenses?term=${searchTerm}&page=${page}`, {
        headers: config.headers,
      });
      setDailyExpenseList(data?.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }, [config.headers, page, searchTerm, toast]);

  const handleCreate = useCallback(
    async (values, actions, onClose) => {
      toast({
        title:"Saving...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      const { date, description, amount, entity } = values;
      setLoading(true);
      try {
        await axios.post(
          `${baseURL}/daily-expenses/create`,
          {
            date, description, amount, entity
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Daily Expense Created Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        actions.resetForm();
        onClose(false);
        setFetchList((prev) => prev + 1);
      } catch (error) {
        toast.close();
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    },
    [config.headers, setFetchList, toast]
  );

  const handleUpdateClick = useCallback(
    async ({ id, isUpdate, setIsUpdate, formik }) => {
      formik.resetForm({
        values: getInitialValues(),
      });
      formik.setFieldValue(`${FIELD_NAMES.DAILY_EXPENSE_ID}`, id);
      const data = await axios.get(`${baseURL}/daily-expenses?daily_expense_id=${id}`, {
        headers: config.headers,
      });
      const values = getInitialValues(data?.data);
      Object.entries(values).forEach(([key, value]) => {
        formik.setFieldValue(key, value);
      });
      setIsUpdate(!isUpdate);
    },
    [config.headers]
  );

  const handleUpdate = useCallback(
    async (values, actions, setIsUpdate) => {
      toast({
        title:"Updating...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      const { daily_expense_id, date, description, amount, entity } = values;
      setLoading(true);
      try {
        await axios.put(
          `${baseURL}/daily-expenses/update`,
          {
            daily_expense_id, date, description, amount, entity
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Daily Expense Updated Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        actions.resetForm();
        setIsUpdate(false);
        setFetchList((prev) => prev + 1);
      } catch (error) {
        toast.close();
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    },
    [config.headers, setFetchList, toast]
  );

  const handleDelete = useCallback(
    async (id) => {
      toast({
        title:"Deleting...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      setLoading(true);
      try {
        await axios.delete(`${baseURL}/daily-expenses/delete?daily_expense_id=${id}`, {
          headers: config.headers,
        });
        toast.close();
        toast({
          title: "Daily Expense Deleted Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        setPage(1);
        setFetchList((prev) => prev + 1);
      } catch (error) {
        toast.close();
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    },
    [config.headers, setFetchList, setPage, toast]
  );

  useEffect(() => {
    if (activeTab === "Daily_Expenses") {
      if (user !== null) {
        getDailyExpenses();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, searchTerm, page, fetchList, activeTab]);

  return useMemo(() => {
    return {
      loading,
      dailyExpenseList,
      handleCreate,
      handleUpdateClick,
      handleDelete,
      getDailyExpenses,
      handleUpdate,
    };
  }, [dailyExpenseList, getDailyExpenses, handleCreate, handleDelete, handleUpdate, handleUpdateClick, loading]);
}

export const [DailyExpensePageProvider, useDailyExpensePageContext] = generateContext(useDailyExpensePage);
