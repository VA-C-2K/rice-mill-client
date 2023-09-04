/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
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
import { VehiclePageProvider, useVehiclePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import FormikInput from "../../components/FormikInput";
import SearchField from "../../components/searchFeild";
import Pagination from "../../components/Pagination";
import { GlobalState } from "../../context/global-context";

const FormContainer = (props) => {
  const { setSearchTerm, searchTerm, setPage } = GlobalState();
  const { loading, vehicleList, empList } = useVehiclePageContext();
  const { isUpdate, setIsUpdate, formik, isOpen, onOpen, onClose } = props;

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
                searchBy={"Vehicle No."}
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
              Add Vehicle
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
                  {isUpdate ? "Update Vehicle Details" : "Add Vehicle Details"}
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
                    <FormikInput
                      name={`${FIELD_NAMES.VEHICLE_NUMBER}`}
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
                      name={`${FIELD_NAMES.EMP.ID}`}
                      label={"Driver"}
                      placeholder="Select Driver"
                      type="select"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    >
                      {empList?.employees?.map((driver) => (
                        <option key={driver?._id} value={driver?._id} > {driver?.first_name} {driver?.last_name} - {driver?.phone_number}</option>
                      ))}
                    </FormikInput>

                    {!isUpdate && (
                      <CustomButton
                        type="submit"
                        isLoading={loading}
                        loadingText={`Saving ${FIELD_NAMES.VEHICLE_NUMBER} Details...`}
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
                          loadingText={`Updating ${FIELD_NAMES.VEHICLE_NUMBER}  Details...`}
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
        currentPage={Number(vehicleList?.currentPage)}
        totalPages={vehicleList?.totalPages}
      />
    </>
  );
};

export default withHOC(VehiclePageProvider, FormContainer);
