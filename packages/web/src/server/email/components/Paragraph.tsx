/* eslint-disable @typescript-eslint/no-use-before-define */
import { Text, type TextProps } from "@react-email/components";

export type ParagraphProps = TextProps;

const Paragraph = ({ children, className, ...props }: ParagraphProps) => (
  <Text
    className={`text-primary-darker ${className}`}
    {...props}
  >
    {children}
  </Text>
);

export default Paragraph;
