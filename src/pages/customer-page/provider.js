import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { useUserInfo } from "../../context/user-context";
import { useGloabalInfo } from "../../context/global-context";

function useCustomerPage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const { activeTab, fetchList, setFetchList, searchTerm, page, setPage } = useGloabalInfo();
  const { user, token } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const config = authConfig(token);
  const [customerList, setCustomerList] = useState([]);

  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/customer?term=${searchTerm}&page=${page}`, {
        headers: config.headers,
      });
      setCustomerList(data?.data);
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
      const { address, first_name, gov_or_cust, last_name, phone_number } = values;
      setLoading(true);
      try {
        await axios.post(
          `${baseURL}/customer/create`,
          {
            address,
            first_name,
            gov_or_cust,
            last_name,
            phone_number,
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Customer Created Successfully!",
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
      formik.setFieldValue(`${FIELD_NAMES.CUST_ID}`, id);
      const data = await axios.get(`${baseURL}/customer?cust_id=${id}`, {
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
      const { cust_id, address, first_name, gov_or_cust, last_name, phone_number } = values;
      setLoading(true);
      try {
        await axios.put(
          `${baseURL}/customer/update`,
          {
            cust_id,
            address,
            first_name,
            gov_or_cust,
            last_name,
            phone_number,
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Customer Updated Successfully!",
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
        await axios.delete(`${baseURL}/customer/delete?cust_id=${id}`, {
          headers: config.headers,
        });
        toast.close();
        toast({
          title: "Customer Deleted Successfully!",
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
    if (activeTab === "Customer") {
      if (user !== null) {
        getCustomers();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, searchTerm, page, fetchList, activeTab]);

  return useMemo(() => {
    return {
      loading,
      customerList,
      handleCreate,
      handleUpdateClick,
      handleDelete,
      getCustomers,
      handleUpdate,
    };
  }, [customerList, getCustomers, handleCreate, handleDelete, handleUpdate, handleUpdateClick, loading]);
}

export const [CustomerPageProvider, useCustomerPageContext] = generateContext(useCustomerPage);
