/* eslint-disable react/prop-types */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    VStack,
    Text,
    Stack,
} from "@chakra-ui/react";
import FormikInput from "../../components/FormikInput";
import { FIELD_NAMES } from "./form-helper";
import CustomButton from "../../components/CustomButton";
import { useFormikContext } from "formik";

const EditForm = ({ isOpen, onClose, isUpdate, setIsUpdate, loading }) => {
    const formik = useFormikContext();
    return (
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
    );
};

export default EditForm;
