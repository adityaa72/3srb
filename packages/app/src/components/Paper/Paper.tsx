import Box, { type BoxProps } from "@/components/Box";

type Props = BoxProps;

const Paper = ({ children, ...restProps }: Props) => {
  return (
    <Box bgcolor="background.primary" {...restProps}>
      {children}
    </Box>
  );
};

export default Paper;
