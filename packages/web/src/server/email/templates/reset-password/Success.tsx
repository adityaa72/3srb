import { Paragraph } from "../../components";
import { sendEmail } from "@/server/libs/Email";

type Props = {
  email: string;
};

const Success = async ({ email }: Props) =>
  sendEmail({
    heading: "Password Reset",
    preview: "Your password has been reset",
    subject: "Your password has been reset",
    email,
    content: (
      <>
        <Paragraph>
          Your password has been successfully reset on your account{" "}
        </Paragraph>
      </>
    ),
  });

export default Success;
