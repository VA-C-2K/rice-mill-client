import * as Yup from "yup";
import { getFormattedDateforAPI } from "../../utils/date";

export const FIELD_NAMES = {
  ROW_ID: "row_id",
  DATE: "date",
  TYPE_OF_MATERIAL: "type_of_material",
  QUANTITY: "quantity",
  BUYING_PRICE: "buying_price",
  MRM_PAID_PRICE: "mrm_paid_price",
  REMAINING_PRICE: "remaining_price",
  REMAINING_PRICE_PAID_ON: "remaining_price_paid_on",
  VEHICLE_DETAILS: "vehicle_details",
  VEHICLE_NO: "vehicle_number",
  VENDOR_DETAILS: "vendor_details",
};

export const getInitialValues = (data = {}) => {
  return {
    [FIELD_NAMES.DATE]: getFormattedDateforAPI(data[FIELD_NAMES.DATE]) || new Date().toISOString().slice(0, 10),
    [FIELD_NAMES.TYPE_OF_MATERIAL]: data[FIELD_NAMES.TYPE_OF_MATERIAL] || "",
    [FIELD_NAMES.QUANTITY]: data[FIELD_NAMES.QUANTITY] || "",
    [FIELD_NAMES.BUYING_PRICE]: data[FIELD_NAMES.BUYING_PRICE] || "",
    [FIELD_NAMES.MRM_PAID_PRICE]: data[FIELD_NAMES.MRM_PAID_PRICE] || "",
    [FIELD_NAMES.REMAINING_PRICE]: data[FIELD_NAMES.REMAINING_PRICE] || "",
    [FIELD_NAMES.REMAINING_PRICE_PAID_ON]: getFormattedDateforAPI(data[FIELD_NAMES.REMAINING_PRICE_PAID_ON]) || "",
    [FIELD_NAMES.VEHICLE_DETAILS]: data[FIELD_NAMES.VEHICLE_DETAILS] || "",
    [FIELD_NAMES.VEHICLE_NO]: data[FIELD_NAMES.VEHICLE_NO] || "",
    [FIELD_NAMES.VENDOR_DETAILS]: data[FIELD_NAMES.VENDOR_DETAILS] || "",
  };
};

export const getValidation = () => {
  return Yup.object().shape({
    [FIELD_NAMES.DATE]: Yup.string().required("Date is required"),
    [FIELD_NAMES.TYPE_OF_MATERIAL]: Yup.string().required("Type of Material is required"),
    [FIELD_NAMES.QUANTITY]: Yup.string().required("Quantity is required"),
    [FIELD_NAMES.BUYING_PRICE]: Yup.string().required("Buying Price is required"),
    [FIELD_NAMES.MRM_PAID_PRICE]: Yup.string().required("MRM Paid Price is required"),
    [FIELD_NAMES.VENDOR_DETAILS]: Yup.string().required("Vendor details is required"),
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

