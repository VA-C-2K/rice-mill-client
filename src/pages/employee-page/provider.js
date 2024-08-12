import { useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import generateContext from "../../utils/generate-context";
import { useGloabalInfo } from "../../context/global-context";
import { useEmployeeApi } from "../../api/hooks/employee-api";
import { useCustomToast } from "../../hooks/use-toast";

export function useEmployeePage() {
  const { activeTab, searchTerm, page, setPage } = useGloabalInfo();
  const queryClient = useQueryClient();
  const employeeApi = useEmployeeApi();
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const { data: employeeList, isLoading } = useQuery({
    queryKey: ["employees", { term: searchTerm, page }],
    queryFn: () => employeeApi.getEmployees({ term: searchTerm, page }),
    enabled: activeTab === "Employee",
    refetchInterval: 60000,
    onError: (error) => {
      if (error.name === "CancelledError") return;
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const createMutation = useMutation({
    mutationFn: employeeApi.createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      showSuccessToast("Employee Created Successfully!");
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: employeeApi.updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
      showSuccessToast("Employee Updated Successfully!");
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
      showSuccessToast("Employee Deleted Successfully!");
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
    },
    [createMutation]
  );

  const handleUpdateClick = useCallback(
    async ({ id, isUpdate, setIsUpdate, formik }) => {
      formik.resetForm({
        values: getInitialValues(),
      });
      formik.setFieldValue(`${FIELD_NAMES.EMP_ID}`, id);
      const data = await employeeApi.getEmployeeById(id);
      const values = getInitialValues(data);
      Object.entries(values).forEach(([key, value]) => {
        formik.setFieldValue(key, value);
      });
      setIsUpdate(!isUpdate);
    },
    [employeeApi]
  );

  const handleUpdate = useCallback(
    async (values, actions, setIsUpdate) => {
      updateMutation.mutate(values, {
        onSuccess: () => {
          actions.resetForm();
          setIsUpdate(false);
        },
      });
    },
    [updateMutation]
  );

  return useMemo(() => {
    return {
      loading:
        isLoading ||
        createMutation.isLoading ||
        updateMutation.isLoading ||
        deleteMutation.isLoading,
      employeeList,
      handleCreate,
      handleUpdateClick,
      handleUpdate,
      deleteMutation,
    };
  }, [isLoading, createMutation.isLoading, updateMutation.isLoading, deleteMutation, employeeList, handleCreate, handleUpdateClick, handleUpdate]);
}

export const [EmployeePageProvider, useEmployeePageContext] = generateContext(useEmployeePage);
