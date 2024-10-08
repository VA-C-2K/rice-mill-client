import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { useUserInfo } from "../../context/user-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { useGloabalInfo } from "../../context/global-context";

function useSalePage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const { activeTab, fetchList, setFetchList, searchTerm, page, setPage } = useGloabalInfo();
  const [loading, setLoading] = useState(false);
  const { user, token } = useUserInfo();
  const config = authConfig(token);
  const [prodList, setProdList] = useState([]);
  const [custList, setCustList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [salesList, setSalesList] = useState([]);

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/product`, {
        headers: config.headers,
      });
      setProdList(data?.data);
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
  }, [config.headers, toast]);

  const getVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/vehicle?list=true`, {
        headers: config.headers,
      });
      setVehicleList(data?.data);
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
  }, [config.headers, toast]);

  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/customer?list=true`, {
        headers: config.headers,
      });
      setCustList(data?.data);
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
  }, [config.headers, toast]);

  const getSales = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/sales?page=${page}`, {
        headers: config.headers,
      });
      setSalesList(data?.data);
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
  }, [page, config.headers, toast]);

  const handleCreate = useCallback(
    async (values, actions, onClose) => {
      toast({
        title:"Saving...",
        status:"loading",
        duration: 100,
        isClosable: true,
        position: "bottom",
      });
      const { customer_details, date, discount, final_amount_paid, next_due_on, product_details, quantity, total_amount, vehicle_details, vehicle_number } = values;
      if (Number(total_amount) > Number(final_amount_paid)) {
        const calculatedDiscount = total_amount - Number(final_amount_paid);
        if (!next_due_on && (Number(discount) !== calculatedDiscount)) {
          toast.close();
          toast({
            title: "Invalid Discount!",
            description: "Discount should be equal to the difference between total amount and final amount paid.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        } else if (!discount && !next_due_on) {
          toast.close();
          toast({
            title: "Invalid Amount!",
            description: "Please enter a valid Next Due Date.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
      }
      
      setLoading(true);
      try {
        await axios.post(
          `${baseURL}/sales/create`,
          {
            customer_details, date, discount, final_amount_paid, next_due_on, product_details, quantity, total_amount, vehicle_details, vehicle_number
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Sales record Created Successfully!",
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
    [config.headers, toast, setFetchList]
  );

  const handleUpdateClick = useCallback(
    async ({ id, isUpdate, setIsUpdate, formik }) => {
      formik.resetForm({
        values: getInitialValues(),
      });
      formik.setFieldValue(`${FIELD_NAMES.SALE_ID}`, id);
      const data = await axios.get(`${baseURL}/sales?sale_id=${id}`, {
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
      const { sale_id, customer_details, date, discount, final_amount_paid, next_due_on, product_details, quantity, total_amount, vehicle_details, vehicle_number } = values;
      if (Number(total_amount) > Number(final_amount_paid)) {
        const calculatedDiscount = total_amount - final_amount_paid;
        if (!next_due_on && (Number(discount) !== calculatedDiscount)) {
          toast.close();
          toast({
            title: "Invalid Discount!",
            description: "Discount should be equal to the difference between total amount and final amount paid.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        } else if (!discount && !next_due_on) {
          toast.close();
          toast({
            title: "Invalid Amount!",
            description: "Please enter a valid Next Due Date.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
      }
      setLoading(true);
      try {
        await axios.put(
          `${baseURL}/sales/update`,
          {
            sale_id, customer_details, date, discount, final_amount_paid, next_due_on, product_details, quantity, total_amount, vehicle_details, vehicle_number
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Sales record Updated Successfully!",
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
        await axios.delete(`${baseURL}/sales/delete?sale_id=${id}`, {
          headers: config.headers,
        });
        toast.close();
        toast({
          title: "Sales record Deleted Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        setFetchList((prev) => prev + 1);
        setPage(1);
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
    if (activeTab === "Sales") {
      if (user !== null) {
        getCustomers();
        getProducts();
        getVehicles();
        getSales();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page, fetchList, activeTab, searchTerm]);

  return useMemo(() => {
    return {
      loading,
      prodList,
      handleCreate,
      handleUpdateClick,
      handleDelete,
      getCustomers,
      handleUpdate,
      custList,
      vehicleList,
      salesList
    };
  }, [loading, prodList, handleCreate, handleUpdateClick, handleDelete, getCustomers, handleUpdate, custList, vehicleList, salesList]);
}

export const [SalePageProvider, useSalePageContext] = generateContext(useSalePage);
