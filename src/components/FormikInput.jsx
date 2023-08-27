/* eslint-disable react/prop-types */
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { InputGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

const FormikInput = ({ label, childern, ...props }) => {
  const [field, meta] = useField(props);
  const { lableColor = "#40513B" } = props;
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel color={lableColor}>{label}</FormLabel>
      <InputGroup>
        <Field as={Input} {...field} {...props} />
        {childern}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormikInput;
