/* eslint-disable react-refresh/only-export-components */
import { InputRightElement, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import FormikInput from "../../components/FormikInput";
import withHOC from "../../utils/with-hoc";
import { AuthPageProvider, useAuthPageContext } from "./provider";
import { getInitialValuesForSignUp, getValidationForSignUp } from "./form-helper";

const Signup = () => {
  const { loading, handleSignUp } = useAuthPageContext();

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => setShow(!show);
  const handleConfirmPasswordClick = () => setShowConfirm(!showConfirm);

  return (
    <Formik
      initialValues={getInitialValuesForSignUp()}
      validationSchema={getValidationForSignUp()}
      onSubmit={(values, actions) => handleSignUp(values, actions)}
      validateOnMount={true}
      enableReinitialize={true}
    >
      {(formik) => (
        <VStack as="form" spacing={"5px"} onSubmit={formik.handleSubmit}>
          <FormikInput
            name="username"
            label={"Name"}
            placeholder="Enter Your Name"
            variant="outline"
            focusBorderColor="#609966"
            _placeholder={{ opacity: 0.5, color: "#40513B" }}
            color="#609966"
            fontWeight={500}
            border="1px"
          />
          <FormikInput
            name="phonenumber"
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
            name="password"
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
          <FormikInput
            name="confirmpassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            label={"Confirm Password"}
            variant="outline"
            _placeholder={{ opacity: 0.5, color: "#40513B" }}
            color="#609966"
            fontWeight={500}
            focusBorderColor="#609966"
            border="1px"
            childern={
              <InputRightElement width={"4.5rem"}>
                <CustomButton size="sm" onClick={handleConfirmPasswordClick} bg="transparent" color="#609966" _hover={{}}>
                  {showConfirm ? <ViewOffIcon w={5} h={5} /> : <ViewIcon w={5} h={5} />}
                </CustomButton>
              </InputRightElement>
            }
          />
          <CustomButton
            w="100%"
            style={{ marginTop: 15 }}
            type="submit"
            isLoading={loading}
            loadingText={`Please wait while we register you ${formik.values.username}...`}
          >
            Sign Up
          </CustomButton>
        </VStack>
      )}
    </Formik>
  );
};

export default withHOC(AuthPageProvider, Signup);
