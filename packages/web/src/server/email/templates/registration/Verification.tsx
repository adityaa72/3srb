import { Code, Paragraph } from "../../components";
import { OTP_EXPIRE_TIME } from "@constants/values";
import { sendEmail } from "@/server/libs/Email";

type Props = {
  email: string;
  otp: number;
};

const Verification = async ({ email, otp }: Props) =>
  sendEmail({
    preview: "You are one step away",
    heading: `Verify your email address`,
    subject: "Registration Verification",
    email,
    content: (
      <>
        <Paragraph>
          We're happy you're here. Let's get your email address verified:
        </Paragraph>
        <Paragraph>Here is your registration verification code:</Paragraph>
        <Code code={otp} />
        <Paragraph>
          Please make sure you never share this code with anyone.
        </Paragraph>
        <Paragraph>
          <strong>Note:</strong> The code will expire in {OTP_EXPIRE_TIME}{" "}
          minutes.
        </Paragraph>
        <Paragraph>
          If you did not make this request, please ignore this email. Your email
          remains safe.
        </Paragraph>
      </>
    ),
  });

export default Verification;
