import * as Yup from "yup";
import { getFormattedDateforAPI } from "../../utils/date";

export const FIELD_NAMES = {
  SALE_ID: "sale_id",
  DATE: "date",
  TOTAL_AMT: "total_amount",
  QUANTITY: "quantity",
  DISCOUNT: "discount",
  FINAL_AMT_PAID: "final_amount_paid",
  REMAINING_AMT: "remainig_amount",
  NEXT_DUE_ON: "next_due_on",
  VEHICLE_NO: "vehicle_number",
  PROD_DETAILS: "product_details",
  CUST_DETAILS: "customer_details",
  VEHICLE_DETAILS: "vehicle_details",
};

export const getInitialValues = (data = {}) => {
  return {
    [FIELD_NAMES.DATE]: getFormattedDateforAPI(data[FIELD_NAMES.DATE]) || new Date().toISOString().slice(0, 10),
    [FIELD_NAMES.TOTAL_AMT]: data[FIELD_NAMES.TOTAL_AMT] || "",
    [FIELD_NAMES.QUANTITY]: data[FIELD_NAMES.QUANTITY] || "",
    [FIELD_NAMES.DISCOUNT]: data[FIELD_NAMES.DISCOUNT] || "",
    [FIELD_NAMES.FINAL_AMT_PAID]: data[FIELD_NAMES.FINAL_AMT_PAID] || "",
    [FIELD_NAMES.REMAINING_AMT]: data[FIELD_NAMES.REMAINING_AMT] || "",
    [FIELD_NAMES.NEXT_DUE_ON]: data[FIELD_NAMES.NEXT_DUE_ON] || "",
    [FIELD_NAMES.VEHICLE_NO]: data[FIELD_NAMES.VEHICLE_NO] || "",
    [FIELD_NAMES.PROD_DETAILS]: data[FIELD_NAMES.PROD_DETAILS] || "",
    [FIELD_NAMES.CUST_DETAILS]: data[FIELD_NAMES.CUST_DETAILS] || "",
    [FIELD_NAMES.VEHICLE_DETAILS]: data[FIELD_NAMES.VEHICLE_DETAILS] || "",
  };
};

export const getValidation = () => {
  return Yup.object().shape({
    [FIELD_NAMES.DATE]: Yup.string().required("Date is required"),
    [FIELD_NAMES.TOTAL_AMT]: Yup.string().required("Total Amount is required"),
    [FIELD_NAMES.QUANTITY]: Yup.string().required("Quantity is required"),
    [FIELD_NAMES.DISCOUNT]: Yup.string().required("Discount is required"),
    [FIELD_NAMES.FINAL_AMT_PAID]: Yup.string().required("Final Amount is required"),
    [FIELD_NAMES.PROD_DETAILS]: Yup.string().required("Product details is required"),
    [FIELD_NAMES.CUST_DETAILS]: Yup.string().required("Customer details is required"),
    [FIELD_NAMES.VEHICLE_DETAILS]: Yup.string(),
    [FIELD_NAMES.VEHICLE_NO]: Yup.string(),
  }).test('at-least-one-field-filled', 'At least one field must be filled', function (values) {
    const vehicleDetails = values[FIELD_NAMES.VEHICLE_DETAILS];
    const vehicleNo = values[FIELD_NAMES.VEHICLE_NO];

    if (!vehicleDetails && !vehicleNo) {
      return this.createError({
        path: [FIELD_NAMES.VEHICLE_DETAILS],
        message: 'At least one field must be filled',
      });
    }

    return true;
  });
};

