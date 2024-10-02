/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box, Flex, Stack } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { getInitialValues } from "./form-helper";
import { CustomerPageProvider, useCustomerPageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import SearchField from "../../components/searchFeild";
import Pagination from "../../components/Pagination";
import { useGloabalInfo } from "../../context/global-context";
import { useFormikContext } from "formik";
import EditForm from "./edit-form";

const FormContainer = ({ isUpdate, setIsUpdate, isOpen, onOpen, onClose }) => {
  const { searchTerm, setPage, setSearchTerm } = useGloabalInfo();
  const { loading, getCustomersQuery } = useCustomerPageContext();
  const formik = useFormikContext();

  return (
    <>
      <Flex alignItems="end" flexDirection={"row-reverse"}>
        <Box py="3" px="1">
          <Flex alignItems="stretch" flexDirection={"row"}>
            <Stack width={"md"} style={{ marginRight: 20 }}>
              <SearchField
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchBy={"Phone No, Name"}
              />
            </Stack>
            <CustomButton
              onClick={() => {
                formik.resetForm({
                  values: getInitialValues(),
                });
                onOpen();
              }}
              leftIcon={<AddIcon />}
            >
              Add Customer
            </CustomButton>
          </Flex>
          <EditForm
            isOpen={isOpen}
            onClose={onClose}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            loading={loading}
          />
        </Box>
      </Flex>
      <Pagination
        setPage={setPage}
        currentPage={getCustomersQuery?.data?.pagination?.current_page}
        totalPages={getCustomersQuery?.data?.pagination?.total_pages}
      />
    </>
  );
};

export default withHOC(CustomerPageProvider, FormContainer);
