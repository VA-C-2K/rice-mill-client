import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { UserState } from "../../context/user-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { GlobalState } from "../../context/global-context";

function useRowMaterialPage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const { activeTab, fetchList, setFetchList, searchTerm, page, setPage } = GlobalState();
  const [loading, setLoading] = useState(false);
  const { user, token } = UserState();
  const config = authConfig(token);
  const [rowMaterialList, setMaterialList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);

  const getVendors = useCallback(async() => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/vendor?list=true`, {
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
  }, [config.headers, toast]);

  const getVehicles = useCallback(async() => {
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


  const getRowMaterial = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/row-material?page=${page}`, {
        headers: config.headers,
      });
      setMaterialList(data?.data);
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
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      const { date, type_of_material, quantity, buying_price, mrm_paid_price, remaining_price, remaining_price_paid_on, vehicle_details, vehicle_number, vendor_details } = values;
      setLoading(true);
      try {
        await axios.post(
          `${baseURL}/row-material/create`,
          {
            date, type_of_material, quantity, buying_price, mrm_paid_price, remaining_price, remaining_price_paid_on, vehicle_details, vehicle_number, vendor_details
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Row Material record Created Successfully!",
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
      formik.setFieldValue(`${FIELD_NAMES.ROW_ID}`, id);
      const data = await axios.get(`${baseURL}/row-material?row_id=${id}`, {
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
      const { row_id, date, type_of_material, quantity, buying_price, mrm_paid_price, remaining_price, remaining_price_paid_on, vehicle_details, vehicle_number, vendor_details } = values;
      setLoading(true);
      try {
        await axios.put(
          `${baseURL}/row-material/update`,
          {
            row_id, date, type_of_material, quantity, buying_price, mrm_paid_price, remaining_price, remaining_price_paid_on, vehicle_details, vehicle_number, vendor_details
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Row Material record Updated Successfully!",
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
        await axios.delete(`${baseURL}/row-material/delete?row_id=${id}`, {
          headers: config.headers,
        });
        toast.close();
        toast({
          title: "Row Material record Deleted Successfully!",
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
    if (activeTab === "Row_Material_Entry") {
      if (user !== null) {
        getRowMaterial();
        getVendors();
        getVehicles();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page, fetchList, activeTab, searchTerm]);

  return useMemo(() => {
    return {
      loading,
      rowMaterialList,
      handleCreate,
      handleUpdateClick,
      handleDelete,
      getRowMaterial,
      handleUpdate,
      vendorList,
      vehicleList
    };
  }, [loading, rowMaterialList, handleCreate, handleUpdateClick, handleDelete, getRowMaterial, handleUpdate, vendorList, vehicleList]);
}

export const [RowMaterialPageProvider, useRowMaterialPageContext] = generateContext(useRowMaterialPage);
