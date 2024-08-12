import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { useUserInfo } from "../../context/user-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { useGloabalInfo } from "../../context/global-context";

function useVendorPage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const { activeTab, fetchList, setFetchList, searchTerm, page, setPage } = useGloabalInfo();
  const [loading, setLoading] = useState(false);
  const { user, token } = useUserInfo();
  const config = authConfig(token);
  const [vendorList, setVendorList] = useState([]);

  const getVendors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/vendor?term=${searchTerm}&page=${page}`, {
        headers: config.headers,
      });
      setVendorList(data?.data);
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
  }, [searchTerm, page, config.headers, toast]);

  const handleCreate = useCallback(
    async (values, actions, onClose) => {
      toast({
        title:"Creating...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      const { address, first_name, gov_or_vendor, last_name, phone_number } = values;
      setLoading(true);
      try {
        await axios.post(
          `${baseURL}/vendor/create`,
          {
            address,
            first_name,
            gov_or_vendor,
            last_name,
            phone_number,
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Vendor Created Successfully!",
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
      formik.setFieldValue(`${FIELD_NAMES.VENDOR_ID}`, id);
      const data = await axios.get(`${baseURL}/vendor?vendor_id=${id}`, {
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
      const { vendor_id, address, first_name, gov_or_vendor, last_name, phone_number } = values;
      setLoading(true);
      try {
        await axios.put(
          `${baseURL}/vendor/update`,
          {
            vendor_id,
            address,
            first_name,
            gov_or_vendor,
            last_name,
            phone_number,
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Vendor Updated Successfully!",
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
        await axios.delete(`${baseURL}/vendor/delete?vendor_id=${id}`, {
          headers: config.headers,
        });
        toast.close();
        toast({
          title: "Vendor Deleted Successfully!",
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
    if (activeTab === "Vendor") {
      if (user !== null) {
        getVendors();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page, fetchList, activeTab,searchTerm]);

  return useMemo(() => {
    return {
      loading,
      vendorList,
      handleCreate,
      handleUpdateClick,
      handleDelete,
      getVendors,
      handleUpdate,
    };
  }, [loading, vendorList, handleCreate, handleUpdateClick, handleDelete, getVendors, handleUpdate]);
}

export const [VendorPageProvider, useVendorPageContext] = generateContext(useVendorPage);
