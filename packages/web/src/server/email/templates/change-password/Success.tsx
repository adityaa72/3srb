import { Paragraph } from "../../components";
import { sendEmail } from "@/server/libs/Email";

type Props = { email: string };

const Success = async ({ email }: Props) => {
  return sendEmail({
    heading: "Password Changed",
    preview: "Password Changed",
    subject: "Your password has been changed",
    email,
    content: (
      <>
        <Paragraph>
          Your password has been successfully changed on your account{" "}
        </Paragraph>
      </>
    ),
  });
};

export default Success;
