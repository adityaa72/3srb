import { Paragraph } from "../../components";
import { APP_NAME } from "@constants/app";
import { sendEmail } from "@/server/libs/Email";

type Props = {
  email: string;
};
const Success = async ({ email }: Props) => {
  return sendEmail({
    preview: "Here's how to get started",
    heading: `Registration Successful 🎉🎉🎉`,
    subject: "Registration Successful",
    email,
    content: (
      <>
        <Paragraph>Hey</Paragraph>
        <Paragraph>
          Welcome to <strong>{APP_NAME}</strong> Team, We want to express our
          heartfelt gratitude for joining our platform and becoming a member.
        </Paragraph>
        <Paragraph>
          Wishing you a wonderful and fulfilling experience with{" "}
          <strong>{APP_NAME}</strong>.
        </Paragraph>
      </>
    ),
  });
};

export default Success;
