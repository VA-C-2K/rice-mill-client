/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Box, Flex, Stack } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { getInitialValues } from "./form-helper";
import { EmployeePageProvider, useEmployeePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import SearchField from "../../components/searchFeild";
import Pagination from "../../components/Pagination";
import { useGloabalInfo } from "../../context/global-context";
import EditForm from "./edit-form";
import { useFormikContext } from "formik";

const FormContainer = (props) => {
  const { setSearchTerm, searchTerm, setPage } = useGloabalInfo();
  const { loading, getEmployeesQuery } = useEmployeePageContext();
  const { isUpdate, setIsUpdate, isOpen, onOpen, onClose } = props;
  const { resetForm } = useFormikContext();

  return (
    <>
      <Flex alignItems="end" flexDirection={"row-reverse"}>
        <Box py="3" px="1">
          <Flex alignItems="stretch" flexDirection={"row"}>
            <Stack width={"md"} style={{ marginRight: 20 }}>
              <SearchField loading={loading} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchBy={"Phone No, Name"} />
            </Stack>
            <CustomButton
              onClick={() => {
                resetForm({
                  values: getInitialValues(),
                });
                onOpen();
              }}
              leftIcon={<AddIcon />}
            >
              Add Employee
            </CustomButton>
          </Flex>
          <EditForm isOpen={isOpen} onClose={onClose} isUpdate={isUpdate} setIsUpdate={setIsUpdate} loading={loading} />
        </Box>
      </Flex>
      <Pagination setPage={setPage} currentPage={getEmployeesQuery?.data?.pagination?.current_page} totalPages={getEmployeesQuery?.data?.pagination?.total_pages} />
    </>
  );
};

export default withHOC(EmployeePageProvider, FormContainer);
