/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
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
import {
  DailyExpensePageProvider,
  useDailyExpensePageContext,
} from "./provider";
import withHOC from "../../utils/with-hoc";
import FormikInput from "../../components/FormikInput";
import SearchField from "../../components/searchFeild";
import Pagination from "../../components/Pagination";
import { GlobalState } from "../../context/global-context";

const FormContainer = (props) => {
  const { searchTerm, setPage, setSearchTerm } = GlobalState();
  const { loading, dailyExpenseList } = useDailyExpensePageContext();
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
                searchBy={"Entity, Description"}
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
              Add Daily Expense
            </CustomButton>
          </Flex>
          <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen || isUpdate}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent bg="#EDF1D6" p={2}>
              <ModalHeader>
                <Text
                  as="b"
                  fontSize="xl"
                  fontFamily="Work sans"
                  color="#40513B"
                >
                  {isUpdate
                    ? "Update Daily Expense Details"
                    : "Add Daily Expense Details"}
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
                      name={`${FIELD_NAMES.AMOUNT}`}
                      label={"Amount"}
                      type="number"
                      placeholder="Enter Amount"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    <FormikInput
                      name={`${FIELD_NAMES.ENTITY}`}
                      label={"Entity"}
                      placeholder="Enter Entity"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />
                    <FormikInput
                      name={`${FIELD_NAMES.DESCRIPTION}`}
                      label={"Description"}
                      placeholder="Enter Description"
                      variant="outline"
                      focusBorderColor="#609966"
                      _placeholder={{ opacity: 0.5, color: "#40513B" }}
                      color="#609966"
                      fontWeight={500}
                      border="1px"
                    />

                    {!isUpdate && (
                      <CustomButton
                        type="submit"
                        isLoading={loading}
                        loadingText={`Saving ${FIELD_NAMES.ENTITY} ${FIELD_NAMES.DESCRIPTION} Details...`}
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
                          loadingText={`Updating ${FIELD_NAMES.ENTITY} ${FIELD_NAMES.DESCRIPTION} Details...`}
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
        currentPage={Number(dailyExpenseList?.currentPage)}
        totalPages={dailyExpenseList?.totalPages}
      />
    </>
  );
};

export default withHOC(DailyExpensePageProvider, FormContainer);
