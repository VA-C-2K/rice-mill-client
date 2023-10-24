/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  Box,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { SalePageProvider, useSalePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import FormikInput from "../../components/FormikInput";
import Pagination from "../../components/Pagination";
import { GlobalState } from "../../context/global-context";
import { capitalizedString } from "../../utils/string-helper";
import { useToast } from "@chakra-ui/react";

const FormContainer = (props) => {
  const { setPage } = GlobalState();
  const toast = useToast();
  const { loading, prodList, custList, vehicleList, salesList } =
    useSalePageContext();
  const { isUpdate, setIsUpdate, formik, isOpen, onOpen, onClose } = props;
  const handleQuantityChanges = () => {
    const productDetails = prodList?.products?.find((product) => product._id === formik.values[FIELD_NAMES.PROD_DETAILS]);
    if (productDetails?.quantity < Number(formik.values[FIELD_NAMES.QUANTITY])) {
      formik.setFieldError(FIELD_NAMES.QUANTITY, "Invalid Quantity");
      toast({
        title: "Invalid Quantity!",
        description: `Please enter a valid quantity, available quantity is ${productDetails?.quantity}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      formik.setFieldError(FIELD_NAMES.QUANTITY, ''); // Clear the error message
    }
    const totalAmt = productDetails?.current_rate * formik.values[FIELD_NAMES.QUANTITY];
    formik.setFieldValue(FIELD_NAMES.TOTAL_AMT, totalAmt || 0);
  };

  return (
    <>
      <Flex alignItems="end" flexDirection={"row-reverse"}>
        <Box py="3" px="1">
          <Flex alignItems="stretch" flexDirection={"row"}>
            <CustomButton
              onClick={() => {
                formik.resetForm({
                  values: getInitialValues(),
                });
                onOpen();
              }}
              leftIcon={<AddIcon />}
            >
              Add Sale
            </CustomButton>
          </Flex>
          <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen || isUpdate}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent bg="#EDF1D6" p={2} width={"full"} maxW="500px">
              <ModalHeader>
                <Text
                  as="b"
                  fontSize="xl"
                  fontFamily="Work sans"
                  color="#40513B"
                >
                  {isUpdate ? "Update Sale Details" : "Add Sale Details"}
                </Text>
              </ModalHeader>
              {!isUpdate && <ModalCloseButton />}
              <>
                <ModalBody pb={6}>
                  <VStack
                    as="form"
                    spacing={"10px"}
                    onSubmit={formik.handleSubmit}
                  >
                    <HStack>
                      <FormikInput
                        name={`${FIELD_NAMES.PROD_DETAILS}`}
                        label={"Product Details"}
                        variant="outline"
                        type="select"
                        placeholder="Select Product Details"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      >
                        {prodList?.products?.map((prod) => (
                          <option key={prod?._id} value={prod?._id}>
                            {prod?.name} - ₹ {prod?.current_rate}(
                            {prod?.quantity})
                          </option>
                        ))}
                      </FormikInput>
                      <FormikInput
                        name={`${FIELD_NAMES.QUANTITY}`}
                        label={"Quantity"}
                        placeholder="Enter Quantity"
                        type="number"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                        onBlur={handleQuantityChanges}
                      />
                    </HStack>
                    <HStack>
                      <FormikInput
                        name={`${FIELD_NAMES.TOTAL_AMT}`}
                        label={"Total Amount"}
                        type="number"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                        readOnly
                      />
                      <FormikInput
                        name={`${FIELD_NAMES.FINAL_AMT_PAID}`}
                        label={"Final Amount Paid"}
                        type="number"
                        placeholder="Enter Final Amount Paid"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />                     
                    </HStack>
                    <FormikInput
                      name={`${FIELD_NAMES.CUST_DETAILS}`}
                      label={"Customer Details"}
                      placeholder="Select Customer"
                      variant="outline"
                      type="select"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    >
                      {custList?.customers?.map((cust) => (
                        <option key={cust?._id} value={cust?._id}>
                          {cust?.first_name} {cust?.last_name}{" "}
                          {cust?.phone_number} (
                          {capitalizedString(cust?.gov_or_cust)})
                        </option>
                      ))}
                    </FormikInput>
                    <HStack>
                      <FormikInput
                        name={`${FIELD_NAMES.DATE}`}
                        label={"Date"}
                        type="date"
                        placeholder="Select a date"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                       <FormikInput
                        name={`${FIELD_NAMES.DISCOUNT}`}
                        label={"Discount"}
                        type="number"
                        placeholder="Enter Discount Amount"
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
                        name={`${FIELD_NAMES.NEXT_DUE_ON}`}
                        label={"Next Due On"}
                        variant="outline"
                        type="date"
                        placeholder="Select a Next Due On"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                      <FormikInput
                        name={`${FIELD_NAMES.VEHICLE_NO}`}
                        label={"Vehicle Number"}
                        placeholder="Enter Vehicle Number"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                    </HStack>
                    <FormikInput
                      name={`${FIELD_NAMES.VEHICLE_DETAILS}`}
                      label={"Vehicle Details"}
                      placeholder="Select Vehicle"
                      variant="outline"
                      type="select"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    >
                      {vehicleList?.vehicles?.map((vehicle) => (
                        <option key={vehicle?._id} value={vehicle?._id}>
                          {vehicle?.vehicle_number} -{" "}
                          {vehicle?.employee_details?.first_name}{" "}
                          {vehicle?.employee_details?.last_name}
                        </option>
                      ))}
                    </FormikInput>

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
                    <Stack
                      direction={"row"}
                      style={{ marginTop: 25, marginLeft: "13rem" }}
                    >
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
      <Pagination
        setPage={setPage}
        currentPage={Number(salesList?.currentPage)}
        totalPages={salesList?.totalPages}
      />
    </>
  );
};

export default withHOC(SalePageProvider, FormContainer);
