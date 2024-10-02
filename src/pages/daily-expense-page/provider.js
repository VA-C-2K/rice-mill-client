import { useCallback, useMemo } from "react";
import generateContext from "../../utils/generate-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { useGloabalInfo } from "../../context/global-context";
import { useDailyExpensesApi } from "../../api/hooks/use-daily-expenses-api";
import { useCustomToast } from "../../hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function useDailyExpensePage() {
  const { searchTerm, page, setPage, activeTab } = useGloabalInfo();
  const { showErrorToast, showSuccessToast, showLoadingToast, closeToast } =
    useCustomToast();
  const dailyExpensesApi = useDailyExpensesApi();
  const queryClient = useQueryClient();

  const getDailyExpensesQuery = useQuery({
    queryKey: ["daily-expenses", { term: searchTerm, page }],
    enabled: activeTab === "Daily_Expenses",
    queryFn: () =>
      dailyExpensesApi.getDailyExpenses({ term: searchTerm, page }),
    refetchInterval: false,
    select: (data) => ({
      data: data?.data || [],
      pagination: data?.paging || {},
    }),
    onError: (error) => {
      if (error.name === "CancelledError") return;
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const createMutation = useMutation({
    mutationFn: dailyExpensesApi.createDailyExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-expenses"] });
      showSuccessToast("Daily Expense Created Successfully!");
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: dailyExpensesApi.updateDailyExpense,
    onSuccess: () => {
      queryClient.invalidateQueries("daily-expenses");
      showSuccessToast("Daily Expense Updated Successfully!");
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: dailyExpensesApi.deleteDailyExpense,
    onSuccess: () => {
      queryClient.invalidateQueries("daily-expenses");
      showSuccessToast("Daily Expense Deleted Successfully!");
      setPage(1);
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const handleCreate = useCallback(
    async (values, actions, onClose) => {
      createMutation.mutate(values, {
        onSuccess: () => {
          actions.resetForm();
          onClose(false);
        },
      });
    }, [createMutation]);

  const handleUpdateClick = useCallback(
    async ({ id, isUpdate, setIsUpdate, formik }) => {
      showLoadingToast("Fetching daily expense details...");
      formik.resetForm({
        values: getInitialValues(),
      });
      formik.setFieldValue(`${FIELD_NAMES.DAILY_EXPENSE_ID}`, id);
      const data = await dailyExpensesApi.getDailyExpenseById(id);
      closeToast();
      const values = getInitialValues(data);
      Object.entries(values).forEach(([key, value]) => {
        formik.setFieldValue(key, value);
      });
      setIsUpdate(!isUpdate);
    }, [closeToast, dailyExpensesApi, showLoadingToast]);

  const handleUpdate = useCallback(
    async (values, actions, setIsUpdate) => {
      updateMutation.mutate(values, {
        onSuccess: () => {
          actions.resetForm();
          setIsUpdate(false);
        },
      });
    }, [updateMutation]);

  return useMemo(() => {
    return {
      loading:
        getDailyExpensesQuery.isLoading ||
        createMutation.isLoading ||
        updateMutation.isLoading ||
        deleteMutation.isLoading,
      getDailyExpensesQuery,
      handleCreate,
      handleUpdateClick,
      handleUpdate,
      deleteMutation,
    };
  }, [
    createMutation.isLoading,
    updateMutation.isLoading,
    getDailyExpensesQuery,
    handleCreate,
    handleUpdate,
    handleUpdateClick,
    deleteMutation,
  ]);
}

export const [DailyExpensePageProvider, useDailyExpensePageContext] =
  generateContext(useDailyExpensePage);
