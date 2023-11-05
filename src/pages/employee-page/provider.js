import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { UserState } from "../../context/user-context";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { GlobalState } from "../../context/global-context";

function useEmployeePage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const { activeTab, fetchList, setFetchList, searchTerm, page, setPage } = GlobalState();
  const [loading, setLoading] = useState(false);
  const { user, token } = UserState();
  const config = authConfig(token);
  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${baseURL}/employee?term=${searchTerm}&page=${page}`, {
        headers: config.headers,
      });
      setEmployeeList(data?.data);
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
      const { address, first_name, last_name, phone_number, salary, aadhar_card_no, no_of_leaves, role, over_time_hrs } = values;
      toast({
        title:"Creating...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      setLoading(true);
      try {
        await axios.post(
          `${baseURL}/employee/create`,
          {
            first_name,
            last_name,
            phone_number,
            address,
            salary,
            aadhar_card_no,
            no_of_leaves,
            role,
            over_time_hrs,
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Employee Created Successfully!",
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
      formik.setFieldValue(`${FIELD_NAMES.EMP_ID}`, id);
      const data = await axios.get(`${baseURL}/employee?emp_id=${id}`, {
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
      const { emp_id, address, first_name, last_name, phone_number, salary, aadhar_card_no, no_of_leaves, role, over_time_hrs } = values;
      setLoading(true);
      try {
        await axios.put(
          `${baseURL}/employee/update`,
          {
            emp_id,
            address,
            first_name,
            last_name,
            phone_number,
            salary,
            aadhar_card_no,
            no_of_leaves,
            role,
            over_time_hrs,
          },
          {
            headers: config.headers,
          }
        );
        toast.close();
        toast({
          title: "Employee Updated Successfully!",
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
      setLoading(true);
      toast({
        title:"Deleting...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      try {
        await axios.delete(`${baseURL}/employee/delete?emp_id=${id}`, {
          headers: config.headers,
        });
        toast.close();
        toast({
          title: "Employee Deleted Successfully!",
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
    if (activeTab === "Employee") {
      if (user !== null) {
        getEmployees();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page, fetchList, activeTab,searchTerm]);

  return useMemo(() => {
    return {
      loading,
      employeeList,
      handleCreate,
      handleUpdateClick,
      handleDelete,
      getEmployees,
      handleUpdate,
    };
  }, [loading, employeeList, handleCreate, handleUpdateClick, handleDelete, getEmployees, handleUpdate]);
}

export const [EmployeePageProvider, useEmployeePageContext] = generateContext(useEmployeePage);
