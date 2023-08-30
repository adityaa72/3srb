import { type ReactNode } from "react";
import Box, { type BoxProps } from "../Box";

const CardContent = ({
  children,
  ...otherProps
}: BoxProps & { children: ReactNode }) => {
  return (
    <Box p={2} {...otherProps}>
      {children}
    </Box>
  );
};

export default CardContent;
