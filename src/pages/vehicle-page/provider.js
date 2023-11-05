import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { UserState } from "../../context/user-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { GlobalState } from "../../context/global-context";

function useVehiclePage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const { activeTab, fetchList, setFetchList, searchTerm, page, setPage } = GlobalState();
  const [loading, setLoading] = useState(false);
  const { user, token } = UserState();
  const config = authConfig(token);
  const [vehicleList, setVehicleList] = useState([]);
  const [empList, setEmpList] = useState([]);

  const getDrivers = useCallback(async() => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/employee?role=Driver`, {
        headers: config.headers,
      });
      setEmpList(data?.data);
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
      const data = await axios.get(`${baseURL}/vehicle?term=${searchTerm}&page=${page}`, {
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
  }, [searchTerm, page, config.headers, toast]);

  const handleCreate = useCallback(
    async (values, actions, onClose) => {
      toast({
        title:"Saving...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      const { vehicle_number, employee_id } = values;
      setLoading(true);
      try {
        await axios.post(
          `${baseURL}/vehicle/create`,
          {
            vehicle_number, employee_id
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Vehicle Record Created Successfully!",
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
      formik.setFieldValue(`${FIELD_NAMES.VEHICLE_ID}`, id);
      const data = await axios.get(`${baseURL}/vehicle?vehicle_id=${id}`, {
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
      const { vehicle_id, vehicle_number, employee_id } = values;
      setLoading(true);
      try {
        await axios.put(
          `${baseURL}/vehicle/update`,
          {
            vehicle_id, vehicle_number, employee_id
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Vehicle Recors is Updated Successfully!",
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
        await axios.delete(`${baseURL}/vehicle/delete?vehicle_id=${id}`, {
          headers: config.headers,
        });
        toast.close();
        toast({
          title: "Vehicle Record is Deleted Successfully!",
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
    if (activeTab === "Vehicle") {
      if (user !== null) {
        getVehicles();
        getDrivers();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page, fetchList, activeTab, searchTerm]);

  return useMemo(() => {
    return {
      loading,
      vehicleList,
      empList,
      handleCreate,
      handleUpdateClick,
      handleDelete,
      getVehicles,
      handleUpdate,
    };
  }, [loading, vehicleList, empList, handleCreate, handleUpdateClick, handleDelete, getVehicles, handleUpdate]);
}

export const [VehiclePageProvider, useVehiclePageContext] = generateContext(useVehiclePage);
