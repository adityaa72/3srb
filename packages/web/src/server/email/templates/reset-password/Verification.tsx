import { Code, Paragraph } from "../../components";
import { OTP_EXPIRE_TIME } from "@constants/values";
import { sendEmail } from "@/server/libs/Email";

type Props = {
  email: string;
  otp: number;
};

const Verification = async ({ otp, email }: Props) => {
  return sendEmail({
    heading: "Reset your password",
    preview: "One step left",
    subject: "Reset your Password",
    email,
    content: (
      <>
        <Paragraph>
          We received a request to reset your password to your account{" "}
        </Paragraph>
        <Paragraph>Use the code below to set up a new password:</Paragraph>
        <Code code={otp} />
        <Paragraph>
          Please make sure you never share this code with anyone.
        </Paragraph>
        <Paragraph>
          <strong>Note:</strong> The code will expire in {OTP_EXPIRE_TIME}{" "}
          minutes.
        </Paragraph>
        <Paragraph>
          If you did not make this request, please ignore this email. Your
          account remains safe and your current password will not be changed.
        </Paragraph>
      </>
    ),
  });
};
export default Verification;
