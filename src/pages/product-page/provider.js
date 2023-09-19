import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { UserState } from "../../context/user-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { GlobalState } from "../../context/global-context";

function useProductPage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { user, token } = UserState();
  const config = authConfig(token);
  const [productList, setProductList] = useState([]);
  const { activeTab, fetchList, setFetchList } = GlobalState();

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/product`, {
        headers: config.headers,
      });
      setProductList(data?.data);
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

  const handleCreate = useCallback(
    async (values, actions, onClose) => {
      const { name, quantity, current_rate } = values;
      setLoading(true);
      try {
        await axios.post(
          `${baseURL}/product/create`,
          {
            name,
            quantity,
            current_rate,
          },
          {
            headers: config.headers,
          }
        );
        toast({
          title: "Product Created Successfully!",
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
      formik.setFieldValue(`${FIELD_NAMES.PRODUCT_ID}`, id);
      const data = await axios.get(`${baseURL}/product?prod_id=${id}`, {
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
      const { prod_id, name, quantity, current_rate } = values;
      setLoading(true);
      try {
        await axios.put(
          `${baseURL}/product/update`,
          {
            prod_id,
            name,
            quantity,
            current_rate,
          },
          {
            headers: config.headers,
          }
        );
        toast({
          title: "Product Updated Successfully!",
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
      setLoading(true);
      try {
        await axios.delete(`${baseURL}/product/delete?prod_id=${id}`, {
          headers: config.headers,
        });
        toast({
          title: "Product Deleted Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        setFetchList((prev) => prev + 1);
      } catch (error) {
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

  useEffect(() => {
    if (activeTab === "Products") {
      if (user !== null) {
        getProducts();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activeTab, fetchList]);

  return useMemo(() => {
    return {
      loading,
      productList,
      handleCreate,
      handleUpdateClick,
      handleDelete,
      getProducts,
      handleUpdate,
    };
  }, [loading, productList, handleCreate, handleUpdateClick, handleDelete, getProducts, handleUpdate]);
}

export const [ProductPageProvider, useProductPageContext] = generateContext(useProductPage);
