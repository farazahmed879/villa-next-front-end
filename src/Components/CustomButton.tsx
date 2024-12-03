import { Button, ButtonPropsColorOverrides } from "@mui/material";
import { MouseEventHandler } from "react";

const CustomButton = ({
  handleClick,
  buttonType = "button",
  variant = "contained",
  size = "",
  text = "Click here",
  color = "Primary",
  widthProp = false
}: {
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonType?: any;
  variant?: any;
  size?: any;
  text?: string;
  color?: any;
  widthProp?: boolean
}) => {
  return (
    <Button
      type={buttonType}
      variant={variant}
      onClick={handleClick}
      size={size}
      color={color}
      fullWidth={widthProp}
    >
      {text}
    </Button>
  );
};
export default CustomButton;
