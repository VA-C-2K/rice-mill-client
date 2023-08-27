import * as Yup from "yup";

export const FIELD_NAMES = {
  LOGIN: {
    PHONE_NUMBER: "phonenumber",
    PASSWORD: "password",
  },
  SIGNUP: {
    USER_NAME: "username",
    PHONE_NUMBER: "phonenumber",
    PASSWORD: "password",
    CONFIRM_PASSWORD: "confirmpassword",
  },
};

export const getInitialValuesForLogin = () => {
  return {
    [FIELD_NAMES.LOGIN.PHONE_NUMBER]: "",
    [FIELD_NAMES.LOGIN.PASSWORD]: "",
  };
};

export const getInitialValuesForSignUp = () => {
  return {
    [FIELD_NAMES.SIGNUP.USER_NAME]: "",
    [FIELD_NAMES.SIGNUP.PHONE_NUMBER]: "",
    [FIELD_NAMES.SIGNUP.PASSWORD]: "",
    [FIELD_NAMES.SIGNUP.CONFIRM_PASSWORD]: "",
  };
};

export const getValidationForLogin = () => {
  return Yup.object({
    [FIELD_NAMES.SIGNUP.PHONE_NUMBER]: Yup.string().required("Phone number is required").min(10, "Phone number is too short"),
    [FIELD_NAMES.SIGNUP.PASSWORD]: Yup.string().required("Password is required").min(8, "Password is too short"),
  });
};

export const getValidationForSignUp = () => {
  return Yup.object({
    [FIELD_NAMES.SIGNUP.USER_NAME]: Yup.string().required("Name is required"),
    [FIELD_NAMES.SIGNUP.PHONE_NUMBER]: Yup.string()
      .required("Phone number is required")
      .min(10, "Phone number is too short")
      .max(10, "Phone number is too long"),
    [FIELD_NAMES.SIGNUP.PASSWORD]: Yup.string().required("Password is required").min(8, "Password is too short"),
    [FIELD_NAMES.SIGNUP.CONFIRM_PASSWORD]: Yup.string()
      .required("Confirm password is required")
      .min(8, "Confirm password is too short")
      .oneOf([Yup.ref(FIELD_NAMES.SIGNUP.PASSWORD)], "Passwords must match"),
  });
};
