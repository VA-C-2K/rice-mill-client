import * as Yup from "yup";

export const FIELD_NAMES = {
  EMP_ID: "emp_id",
  FIRST_NAME: "first_name",
  LAST_NAME: "last_name",
  PHONE_NUMBER: "phone_number",
  ADDRESS: "address",
  SALARY: "salary",
  AADHAR_CARD_NO: "aadhar_card_no",
  NO_OF_LEAVES: "no_of_leaves",
  ROLE: "role",
  OVER_TIME_HRS: "over_time_hrs",
};

export const getInitialValues = (data = {}) => {
  return {
    [FIELD_NAMES.PHONE_NUMBER]: data[FIELD_NAMES.PHONE_NUMBER] || "",
    [FIELD_NAMES.FIRST_NAME]: data[FIELD_NAMES.FIRST_NAME] || "",
    [FIELD_NAMES.LAST_NAME]: data[FIELD_NAMES.LAST_NAME] || "",
    [FIELD_NAMES.ADDRESS]: data[FIELD_NAMES.ADDRESS] || "",
    [FIELD_NAMES.SALARY]: data[FIELD_NAMES.SALARY] || 0,
    [FIELD_NAMES.AADHAR_CARD_NO]: data[FIELD_NAMES.AADHAR_CARD_NO] || "",
    [FIELD_NAMES.NO_OF_LEAVES]: data[FIELD_NAMES.NO_OF_LEAVES] || 0,
    [FIELD_NAMES.ROLE]: data[FIELD_NAMES.ROLE] || "",
    [FIELD_NAMES.OVER_TIME_HRS]: data[FIELD_NAMES.OVER_TIME_HRS] || 0,
  };
};

export const getValidation = () => {
  return Yup.object({
    [FIELD_NAMES.FIRST_NAME]: Yup.string().required("First Name is required"),
    [FIELD_NAMES.LAST_NAME]: Yup.string().required("Last Name is required"),
    [FIELD_NAMES.PHONE_NUMBER]: Yup.string().required("Phone number is required").min(10, "Phone number is too short").max(10, "Phone number is too long"),
    [FIELD_NAMES.SALARY]: Yup.string().required("Salary is required"),
    [FIELD_NAMES.ROLE]: Yup.string().required("Role is required"),
    [FIELD_NAMES.AADHAR_CARD_NO]: Yup.string().min(12, "Too Short!").max(12, "Too Long!"),
  });
};
