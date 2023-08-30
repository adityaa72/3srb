import { Code, Paragraph } from "../../components";
import { OTP_EXPIRE_TIME } from "@constants/values";
import { sendEmail } from "@/server/libs/Email";

type Props = {
  email: string;
  otp: number;
};

const Verification = async ({ email, otp }: Props) => {
  return sendEmail({
    heading: "Change Password",
    preview: "One step left",
    subject: "Change Your Password",
    email,
    content: (
      <>
        <Paragraph>
          We received a request to change your password for you account{" "}
        </Paragraph>
        <Paragraph>
          Use the code below to set up a new password to your account:
        </Paragraph>
        <Code code={otp} />
        <Paragraph>
          Please make sure you never share this code with anyone.
        </Paragraph>
        <Paragraph>
          <strong>Note:</strong> The code will expire in {OTP_EXPIRE_TIME}{" "}
          minutes.
        </Paragraph>
      </>
    ),
  });
};

export default Verification;
