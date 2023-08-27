/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, VStack } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { FIELD_NAMES, getInitialValues } from "./form-helper";
import { ProductPageProvider, useProductPageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import FormikInput from "../../components/FormikInput";

const FormContainer = (props) => {
  const { loading } = useProductPageContext();
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
              Add Product
            </CustomButton>
          </Flex>
          <Modal closeOnOverlayClick={false} isOpen={isOpen || isUpdate} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#EDF1D6" p={2}>
              <ModalHeader>
                <Text as="b" fontSize="xl" fontFamily="Work sans" color="#40513B">
                  {isUpdate ? "Update Product Details" : "Add Product Details"}
                </Text>
              </ModalHeader>
              {!isUpdate && <ModalCloseButton />}
              <>
                <ModalBody pb={6}>
                  <VStack as="form" spacing={"10px"} onSubmit={formik.handleSubmit}>
                    <FormikInput
                      name={`${FIELD_NAMES.NAME}`}
                      label={"Name"}
                      placeholder="Enter Product Name"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    <FormikInput
                      name={`${FIELD_NAMES.QUANTITY}`}
                      label={"Quantity"}
                      placeholder="Enter Product Quantity in Kg"
                      type="number"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    <FormikInput
                      name={`${FIELD_NAMES.CURRENT_RATE}`}
                      label={"Current Rate"}
                      placeholder="Enter Current Rate of Product in ₹"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    {!isUpdate && (
                      <CustomButton type="submit" isLoading={loading} loadingText={`Saving ${FIELD_NAMES.NAME} Details...`} w="100%" style={{ marginTop: 25 }}>
                        {" "}
                        Save{" "}
                      </CustomButton>
                    )}
                    <Stack direction={"row"} style={{ marginTop: 25, marginLeft: "13rem" }}>
                      {isUpdate && (
                        <CustomButton type="submit" w="100%" isLoading={loading} loadingText={`Updating ${FIELD_NAMES.NAME} Details...`}>
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
    </>
  );
};

export default withHOC(ProductPageProvider, FormContainer);
