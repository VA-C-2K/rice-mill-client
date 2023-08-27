import { Box, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { EmployeePageProvider, useEmployeePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import FormikInput from "../../components/FormikInput";
import SearchField from "../../components/searchFeild";
import Pagination from "../../components/Pagination";
import { GlobalState } from "../../context/global-context";

const FormContainer = (props) => {
  const { setSearchTerm, searchTerm, setPage } = GlobalState();
  const { loading, employeeList } = useEmployeePageContext();
  const { isUpdate, setIsUpdate, formik, isOpen, onOpen, onClose } = props;

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
                formik.resetForm({
                  values: getInitialValues(),
                });
                onOpen();
              }}
              leftIcon={<AddIcon />}
            >
              Add Employee
            </CustomButton>
          </Flex>
          <Modal closeOnOverlayClick={false} isOpen={isOpen || isUpdate} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#EDF1D6" p={2} width={"full"}>
              <ModalHeader>
                <Text as="b" fontSize="xl" fontFamily="Work sans" color="#40513B">
                  {isUpdate ? "Update Customer Details" : "Add Customer Details"}
                </Text>
              </ModalHeader>
              {!isUpdate && <ModalCloseButton />}
              <>
                <ModalBody pb={6}>
                  <VStack as="form" spacing={"10px"} onSubmit={formik.handleSubmit}>
                    <HStack>
                      <FormikInput
                        name={`${FIELD_NAMES.FIRST_NAME}`}
                        label={"First Name"}
                        placeholder="Enter First Name"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                      <FormikInput
                        name={`${FIELD_NAMES.LAST_NAME}`}
                        label={"Last Name"}
                        placeholder="Enter Last Name"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                    </HStack>
                    <HStack>
                      <FormikInput
                        name={`${FIELD_NAMES.PHONE_NUMBER}`}
                        label={"Phone Number"}
                        placeholder="Enter Phone Number"
                        type="number"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                      <FormikInput
                        name={`${FIELD_NAMES.AADHAR_CARD_NO}`}
                        label={"Aadhar Card No"}
                        placeholder="Enter Aadhar Card No"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                    </HStack>

                    <FormikInput
                      name={`${FIELD_NAMES.ADDRESS}`}
                      label={"Address"}
                      placeholder="Enter Address"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    <HStack>
                      <FormikInput
                        name={`${FIELD_NAMES.SALARY}`}
                        label={"Salary"}
                        placeholder="Enter Salary"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                      <FormikInput
                        name={`${FIELD_NAMES.ROLE}`}
                        label={"Role"}
                        placeholder="Enter Role"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                    </HStack>
                    <HStack>
                      <FormikInput
                        name={`${FIELD_NAMES.NO_OF_LEAVES}`}
                        label={"No. of Leaves"}
                        placeholder="Enter No. of Leaves"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                      <FormikInput
                        name={`${FIELD_NAMES.OVER_TIME_HRS}`}
                        label={"Overtime (hrs)"}
                        placeholder="Enter Overtime (hrs)"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                    </HStack>
                    {!isUpdate && (
                      <CustomButton
                        type="submit"
                        isLoading={loading}
                        loadingText={`Saving ${FIELD_NAMES.FIRST_NAME} ${FIELD_NAMES.LAST_NAME} Details...`}
                        w="100%"
                        style={{ marginTop: 25 }}
                      >
                        {" "}
                        Save{" "}
                      </CustomButton>
                    )}
                    <Stack direction={"row"} style={{ marginTop: 25, marginLeft: "13rem" }}>
                      {isUpdate && (
                        <CustomButton
                          type="submit"
                          w="100%"
                          isLoading={loading}
                          loadingText={`Updating ${FIELD_NAMES.FIRST_NAME} ${FIELD_NAMES.LAST_NAME} Details...`}
                        >
                          {" "}
                          Update{" "}
                        </CustomButton>
                      )}
                      {isUpdate && (
                        <CustomButton
                          border="1px"
                          bg="transparent"
                          color={"#D57E7E"}
                          _hover={{ bg: "#D25959", color: "#EDF1D6" }}
                          onClick={() => setIsUpdate(!isUpdate)}
                          w="100%"
                        >
                          {" "}
                          Cancel{" "}
                        </CustomButton>
                      )}
                    </Stack>
                  </VStack>
                </ModalBody>
              </>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
      <Pagination setPage={setPage} currentPage={Number(employeeList?.currentPage)} totalPages={employeeList?.totalPages} />
    </>
  );
};

export default withHOC(EmployeePageProvider, FormContainer);
