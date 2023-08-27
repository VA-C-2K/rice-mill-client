import * as Yup from "yup";

export const FIELD_NAMES = {
  PRODUCT_ID: "prod_id",
  NAME: "name",
  QUANTITY: "quantity",
  CURRENT_RATE: "current_rate",
};

export const getInitialValues = (data = {}) => {
  return {
    [FIELD_NAMES.NAME]: data[FIELD_NAMES.NAME] || "",
    [FIELD_NAMES.QUANTITY]: data[FIELD_NAMES.QUANTITY] || "",
    [FIELD_NAMES.CURRENT_RATE]: data[FIELD_NAMES.CURRENT_RATE] || "",
  };
};

export const getValidation = () => {
  return Yup.object({
    [FIELD_NAMES.NAME]: Yup.string().required("Name is required"),
    [FIELD_NAMES.QUANTITY]: Yup.string().required("Quantity is required"),
    [FIELD_NAMES.CURRENT_RATE]: Yup.string().required("Current Rate is required"),
  });
};
