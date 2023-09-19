import * as Yup from "yup";
import { getFormattedDateforAPI } from "../../utils/date";

export const FIELD_NAMES = {
  DAILY_EXPENSE_ID: "daily_expense_id",
  DATE: "date",
  DESCRIPTION: "description",
  AMOUNT: "amount",
  ENTITY: "entity"
};

export const getInitialValues = (data = {}) => {
  return {
    [FIELD_NAMES.DATE]:  getFormattedDateforAPI(data[FIELD_NAMES.DATE]) || new Date().toISOString().slice(0, 10),
    [FIELD_NAMES.DESCRIPTION]: data[FIELD_NAMES.DESCRIPTION] || "",
    [FIELD_NAMES.AMOUNT]: data[FIELD_NAMES.AMOUNT] || "",
    [FIELD_NAMES.ENTITY]: data[FIELD_NAMES.ENTITY] || ""
  };
};

export const getValidation = () => {
  return Yup.object({
    [FIELD_NAMES.DESCRIPTION]: Yup.string().required("Description is required"),
    [FIELD_NAMES.AMOUNT]: Yup.number().required("Amount is required"),
    [FIELD_NAMES.DATE]: Yup.date().required("Date is required"),
    [FIELD_NAMES.ENTITY]: Yup.string().required("Enity is required"),
  });
};
