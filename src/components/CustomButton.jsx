/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";

const CustomButton = (props) => {
  const {
    type,
    children,
    onClick,
    variant,
    size = ["sm", "md"],
    id,
    w,
    h,
    style,
    isLoading,
    loadingText,
    leftIcon,
    rightIcon,
    bg = "#609966",
    color = "#EDF1D6",
    _hover = { bg: "#4a875d" },
    borderColor,
    border,
    isDisabled = false,
  } = props;

  return (
    <Button
      type={type}
      backgroundColor={bg}
      color={color}
      _hover={_hover}
      variant={variant}
      onClick={onClick}
      size={size}
      id={id}
      w={w}
      h={h}
      style={style}
      isLoading={isLoading}
      loadingText={loadingText}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      borderColor={borderColor}
      border={border}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
