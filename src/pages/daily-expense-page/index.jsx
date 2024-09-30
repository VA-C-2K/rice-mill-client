/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useState } from "react";
import { getInitialValues, getValidation } from "./form-helper";
import { Formik } from "formik";
import { DailyExpensePageProvider, useDailyExpensePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import { useDisclosure } from "@chakra-ui/react";
import ConfirmationModal from "../../components/confirmation-modal";
const EditForm = React.lazy(() => import("./form-container"));
const DailyExpenseTable = React.lazy(() => import("./daily-expense-table"));

const DailyExpense = () => {
  const { handleCreate, handleUpdate, deleteMutation } = useDailyExpensePageContext();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentId, setCurrentId] = useState(null);

  const confirmDelete = useCallback(() => {
    deleteMutation.mutate(currentId);
    setIsModalOpen(false);
  }, [currentId, deleteMutation]);

  const handleDelete = useCallback((id) => {
    setCurrentId(id);
    setIsModalOpen(true);
  }, [setCurrentId, setIsModalOpen]);

  return (
    <>
      <Formik
        initialValues={getInitialValues()}
        validationSchema={getValidation()}
        onSubmit={(values, actions) => {
          if (isUpdate) {
            handleUpdate(values, actions, setIsUpdate);
          } else {
            handleCreate(values, actions, onClose);
          }
        }}
        validateOnMount={true}
        enableReinitialize={true}
      >
        {() => (
          <>
            <EditForm isUpdate={isUpdate} setIsUpdate={setIsUpdate} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <DailyExpenseTable isUpdate={isUpdate} setIsUpdate={setIsUpdate} handleDelete={handleDelete} />
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={confirmDelete}
              question={"Are you sure you want to delete this record?"}
            />
          </>
        )}
      </Formik>
    </>
  );
};

export default withHOC(DailyExpensePageProvider, DailyExpense);
