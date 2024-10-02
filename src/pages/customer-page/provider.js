import { useCallback, useMemo } from "react";
import generateContext from "../../utils/generate-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { useGloabalInfo } from "../../context/global-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCustomerApi } from "../../api/hooks/use-customer-api";
import { useCustomToast } from "../../hooks/use-toast";

function useCustomerPage() {
  const customerApi = useCustomerApi();
  const queryClient = useQueryClient();
  const { activeTab, searchTerm, page, setPage } = useGloabalInfo();
  const { showErrorToast, showSuccessToast, showLoadingToast, closeToast } =
    useCustomToast();

  const getCustomersQuery = useQuery({
    queryKey: ["customers", { term: searchTerm, page }],
    queryFn: () => customerApi.getCustomers({ term: searchTerm, page }),
    enabled: activeTab === "Customer",
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
    mutationFn: customerApi.createCustomer,
    onMutate: () => {
      showLoadingToast("Saving...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      showSuccessToast("Customer Created Successfully!");
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: customerApi.updateCustomer,
    onMutate: () => {
      showLoadingToast("Updating...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("customers");
      showSuccessToast("Customer Updated Successfully!");
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: customerApi.deleteCustomer,
    onMutate: () => {
      showLoadingToast("Deleting...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("customers");
      showSuccessToast("Customer Deleted Successfully!");
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
      showLoadingToast("Fetching customer details...");
      formik.resetForm({
        values: getInitialValues(),
      });
      formik.setFieldValue(`${FIELD_NAMES.CUST_ID}`, id);
      const data = await customerApi.getCustomerById(id);
      const values = getInitialValues(data);
      closeToast();
      Object.entries(values).forEach(([key, value]) => {
        formik.setFieldValue(key, value);
      });
      setIsUpdate(!isUpdate);
    },
    [closeToast, customerApi, showLoadingToast]
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
        getCustomersQuery.isLoading ||
        createMutation.isLoading ||
        updateMutation.isLoading ||
        deleteMutation.isLoading,
      getCustomersQuery,
      handleCreate,
      handleUpdateClick,
      handleUpdate,
      deleteMutation,
    };
  }, [
    createMutation.isLoading,
    deleteMutation,
    getCustomersQuery,
    handleCreate,
    handleUpdate,
    handleUpdateClick,
    updateMutation.isLoading,
  ]);
}

export const [CustomerPageProvider, useCustomerPageContext] =
  generateContext(useCustomerPage);
