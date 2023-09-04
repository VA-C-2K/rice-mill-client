/* eslint-disable react/prop-types */
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { InputGroup, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { useField } from "formik";

const FormikInput = ({ label, children, type, ...props }) => {
  const [field, meta] = useField(props);
  const { lableColor = "#40513B" } = props;

  const inputComponent =
  type === 'select' ? (
    <Select {...field} {...props}>
      {children}
    </Select>
  ) : (
    <Input {...field} {...props} />
  );

return (
  <FormControl isInvalid={meta.error && meta.touched}>
    <FormLabel color={lableColor}>{label}</FormLabel>
    <InputGroup>{inputComponent}</InputGroup>
    <FormErrorMessage>{meta.error}</FormErrorMessage>
  </FormControl>
);
};

export default FormikInput;
