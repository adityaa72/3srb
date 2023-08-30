import { Text } from "@react-email/components";
import { type ParagraphProps } from "./Paragraph";

type Props = ParagraphProps & {
  label: string;
  variant: "warning" | "error" | "success";
};

const Label = ({ label, className, variant, ...restProps }: Props) => (
  <Text
    className={`py-1 px-2 rounded-md inline text-xs font-bold capitalize ${className} ${
      (variant === "warning" && "bg-yellow-500 text-black") ||
      (variant === "success" && "bg-green-500 text-white") ||
      "bg-red-500 text-white"
    } `}
    {...restProps}
  >
    {label}
  </Text>
);

export default Label;
