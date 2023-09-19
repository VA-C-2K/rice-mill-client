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
import { RowMaterialPageProvider, useRowMaterialPageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import FormikInput from "../../components/FormikInput";
import Pagination from "../../components/Pagination";
import { GlobalState } from "../../context/global-context";
import { TypeOfMaterial } from "../../constants";

const FormContainer = (props) => {
  const { setPage } = GlobalState();
  const { loading, vendorList,vehicleList, rowMaterialList } = useRowMaterialPageContext();
  const { isUpdate, setIsUpdate, formik, isOpen, onOpen, onClose } = props;

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
              Add Row Material
            </CustomButton>
          </Flex>
          <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen || isUpdate}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent bg="#EDF1D6" p={2} width={"full"}>
              <ModalHeader>
                <Text
                  as="b"
                  fontSize="xl"
                  fontFamily="Work sans"
                  color="#40513B"
                >
                  {isUpdate
                    ? "Update Row Material Details"
                    : "Add Row Material Details"}
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
                        name={`${FIELD_NAMES.TYPE_OF_MATERIAL}`}
                        label={"Type Of Material"}
                        placeholder="Select Type Of Material"
                        type="select"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      >
                        {TypeOfMaterial.map((material) => (
                          <option key={material?.value} value={material?.value}>
                            {" "}
                            {material?.label}
                          </option>
                        ))}
                      </FormikInput>
                    </HStack>
                    <HStack>
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
                      />
                      <FormikInput
                        name={`${FIELD_NAMES.BUYING_PRICE}`}
                        label={"Buying Price"}
                        type="number"
                        placeholder="Enter Buying Price"
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
                      name={`${FIELD_NAMES.MRM_PAID_PRICE}`}
                      label={"MRM Paid Amount"}
                      placeholder="Enter MRM Paid Amount"
                      variant="outline"
                      type="number"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                      <FormikInput
                        name={`${FIELD_NAMES.REMAINING_PRICE}`}
                        label={"Remaining Amount"}
                        type="number"
                        placeholder="Enter Remaining Amount"
                        variant="outline"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
                      
                    </HStack>
                    <FormikInput
                        name={`${FIELD_NAMES.REMAINING_PRICE_PAID_ON}`}
                        label={"Remaining Price Paid on"}
                        variant="outline"
                        type="date"
                        focusBorderColor="#609966"
                        _placeholder={{ opacity: 0.5, color: "#40513B" }}
                        color="#609966"
                        fontWeight={500}
                        border="1px"
                      />
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
                            {vehicle?.vehicle_number} - {vehicle?.employee_details?.first_name} {vehicle?.employee_details?.last_name}
                          </option>
                        ))}
                      </FormikInput>
                    <HStack>
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

                    <FormikInput
                      name={`${FIELD_NAMES.VENDOR_DETAILS}`}
                      label={"Vendor"}
                      placeholder="Select Vendor"
                      variant="outline"
                      type="select"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    >
                      {vendorList?.vendors?.map((vendor) => (
                        <option key={vendor?._id} value={vendor?._id}>
                          {vendor?.first_name} {vendor?.last_name} - {vendor?.gov_or_vendor}
                        </option>
                      ))}
                    </FormikInput>
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
        currentPage={Number(rowMaterialList?.currentPage)}
        totalPages={rowMaterialList?.totalPages}
      />
    </>
  );
};

export default withHOC(RowMaterialPageProvider, FormContainer);
