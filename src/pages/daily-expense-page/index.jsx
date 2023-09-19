/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { getInitialValues, getValidation } from "./form-helper";
import { Formik } from "formik";
import { DailyExpensePageProvider, useDailyExpensePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import { useDisclosure } from "@chakra-ui/react";
const FormContainer = React.lazy(() => import("./form-container"));
const DailyExpenseTable = React.lazy(() => import("./daily-expense-table"));

const DailyExpense = () => {
  const { handleCreate, handleUpdate } = useDailyExpensePageContext();
  const [isUpdate, setIsUpdate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        {(formik) => (
          <>
            <FormContainer isUpdate={isUpdate} setIsUpdate={setIsUpdate} formik={formik} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <DailyExpenseTable isUpdate={isUpdate} setIsUpdate={setIsUpdate} formik={formik} />
          </>
        )}
      </Formik>
    </>
  );
};

export default withHOC(DailyExpensePageProvider, DailyExpense);