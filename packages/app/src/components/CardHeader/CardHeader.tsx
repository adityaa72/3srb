import { type BoxProps } from "../Box";
import Stack from "../Stack";
import Typography from "../Typography";

const CardHeader = ({
  title,
  action,
  ...otherProps
}: BoxProps & { title: string; action?: React.ReactNode }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      {...otherProps}
    >
      <Typography variant="h6">{title}</Typography>
      {!!action && action}
    </Stack>
  );
};

export default CardHeader;
