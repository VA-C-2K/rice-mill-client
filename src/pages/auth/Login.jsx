/* eslint-disable react-refresh/only-export-components */
import { InputRightElement, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Formik } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthPageProvider, useAuthPageContext } from "./provider";
import FormikInput from "../../components/FormikInput";
import withHOC from "../../utils/with-hoc";
import { FIELD_NAMES, getInitialValuesForLogin, getValidationForLogin } from "./form-helper";

const Login = () => {
  const { loading, handleLogin } = useAuthPageContext();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Formik
      initialValues={getInitialValuesForLogin()}
      validationSchema={getValidationForLogin()}
      onSubmit={(values, actions) => handleLogin(values, actions)}
      validateOnMount={true}
      enableReinitialize={true}
    >
      {(formik) => (
        <VStack as="form" spacing={"5px"} onSubmit={formik.handleSubmit}>
          <FormikInput
            name={`${FIELD_NAMES.LOGIN.PHONE_NUMBER}`}
            label={"Phone Number"}
            placeholder="Enter Your Phone Number"
            variant="outline"
            focusBorderColor="#609966"
            _placeholder={{ opacity: 0.5, color: "#40513B" }}
            color="#609966"
            fontWeight={500}
            type="number"
            border="1px"
          />
          <FormikInput
            name={`${FIELD_NAMES.LOGIN.PASSWORD}`}
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            label={"Password"}
            variant="outline"
            _placeholder={{ opacity: 0.5, color: "#40513B" }}
            color="#609966"
            fontWeight={500}
            focusBorderColor="#609966"
            border="1px"
            childern={
              <InputRightElement width={"4.5rem"}>
                <CustomButton size="sm" onClick={handleClick} bg="transparent" color="#609966" _hover={{}}>
                  {show ? <ViewOffIcon w={5} h={5} /> : <ViewIcon w={5} h={5} />}
                </CustomButton>
              </InputRightElement>
            }
          />

          <CustomButton w="100%" style={{ marginTop: 15 }} type="submit" isLoading={loading} loadingText="Logging In Please Wait...">
            Login
          </CustomButton>
        </VStack>
      )}
    </Formik>
  );
};

export default withHOC(AuthPageProvider, Login);
