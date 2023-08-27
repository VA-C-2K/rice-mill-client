/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, VStack } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { FIELD_NAMES, GovtOrVendorEnums, getInitialValues } from "./form-helper";
import { VendorPageProvider, useVendorPageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import FormikInput from "../../components/FormikInput";
import FormikRadioButton from "../../components/FormikRadioButton";
import SearchField from "../../components/searchFeild";
import Pagination from "../../components/Pagination";
import { GlobalState } from "../../context/global-context";

const FormContainer = (props) => {
  const { setSearchTerm, searchTerm, setPage } = GlobalState();
  const { loading, vendorList } = useVendorPageContext();
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
              Add Vendor
            </CustomButton>
          </Flex>
          <Modal closeOnOverlayClick={false} isOpen={isOpen || isUpdate} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#EDF1D6" p={2}>
              <ModalHeader>
                <Text as="b" fontSize="xl" fontFamily="Work sans" color="#40513B">
                  {isUpdate ? "Update Vendor Details" : "Add Vendor Details"}
                </Text>
              </ModalHeader>
              {!isUpdate && <ModalCloseButton />}
              <>
                <ModalBody pb={6}>
                  <VStack as="form" spacing={"10px"} onSubmit={formik.handleSubmit}>
                    <FormikInput
                      name={`${FIELD_NAMES.PHONE_NUMBER}`}
                      label={"Phone Number"}
                      placeholder="Enter Your Phone Number"
                      type="number"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    <FormikInput
                      name={`${FIELD_NAMES.FIRST_NAME}`}
                      label={"First Name"}
                      placeholder="Enter Your First Name"
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
                      placeholder="Enter Your Last Name"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    <FormikInput
                      name={`${FIELD_NAMES.ADDRESS}`}
                      label={"Address"}
                      placeholder="Enter Your Address"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    <FormikRadioButton
                      style={{ marginTop: 20 }}
                      name={`${FIELD_NAMES.GOVT_OR_VENDOR}`}
                      radioValueAndLabel={GovtOrVendorEnums()}
                      setFieldValue={formik.setFieldValue}
                    />

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
      <Pagination setPage={setPage} currentPage={Number(vendorList?.currentPage)} totalPages={vendorList?.totalPages} />
    </>
  );
};

export default withHOC(VendorPageProvider, FormContainer);
