import * as Yup from "yup";

export const FIELD_NAMES = {
  VEHICLE_NUMBER:"vehicle_number",
  VEHICLE_ID:"vehicle_id",
  EMP:{
    ID: "employee_id",
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    PHONE_NUMBER: "phone_number",
    ROLE: "role",
  },
  EMP_DETAILS:"employee_details"
};

export const getInitialValues = (data = {}) => {
  return {
    [FIELD_NAMES.VEHICLE_NUMBER]: data[FIELD_NAMES.VEHICLE_NUMBER] || "",
    [FIELD_NAMES.EMP.ID ]: data[FIELD_NAMES.EMP_DETAILS] || "",
  };
};

export const getValidation = () => {
  return Yup.object({
    [FIELD_NAMES.VEHICLE_NUMBER]: Yup.string().required("Vehicle Number is required"),
    [FIELD_NAMES.EMP.ID]: Yup.string().required("Select Employee"),
  });
};
