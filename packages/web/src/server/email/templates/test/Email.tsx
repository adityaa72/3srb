import { Paragraph } from "../../components";
import { sendEmail } from "@/server/libs/Email";

type Props = { email: string };
const TestEmail = async ({ email }: Props) =>
  sendEmail({
    heading: "Test Email",
    preview: "Working fine!",
    subject: "Test Email",
    email,
    content: (
      <>
        <Paragraph>Hey, we received a request to send a test email.</Paragraph>
        <Paragraph>Email service is working fine :)</Paragraph>
      </>
    ),
  });

export default TestEmail;
