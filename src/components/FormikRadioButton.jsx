/* eslint-disable react/prop-types */
import { FormControl, FormErrorMessage, FormLabel, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useField } from "formik";
import { useEffect, useState } from "react";

const FormikRadioButton = ({ name, radioValueAndLabel, label, lableColor = "#40513B", style, setFieldValue }) => {
  const [meta] = useField(name);
  const { value } = meta;
  const [valueRadio, setValueRadio] = useState(value);

  useEffect(() => {
    setFieldValue(name, valueRadio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueRadio]);

  return (
    <FormControl style={style} isInvalid={meta.error && meta.touched}>
      {label && <FormLabel color={lableColor}>{label}</FormLabel>}
      <RadioGroup onChange={setValueRadio} value={valueRadio}>
        <Stack spacing={12} direction="row">
          {radioValueAndLabel.map((item) => (
            <Radio
              _checked={{
                bg: "#609966",
                color: "white",
                borderColor: "#4a875d",
              }}
              isInvalid={meta.error && meta.touched}
              value={item.value}
              key={item.value}
            >
              <Text as="b" fontSize="md" fontFamily="Work sans" color="#40513B">
                {item.label}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormikRadioButton;
