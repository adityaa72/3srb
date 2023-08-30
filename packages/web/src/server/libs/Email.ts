import { APP_NAME } from "@constants/app";
import "@/server-only";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailDocument, {
  type EmailDocumentProps,
} from "../email/components/Document";

type Props = {
  email: string;
  subject: string;
} & EmailDocumentProps;

const mail = {
  encryption: "tls",
  host: "jamsr.in",
  password: "Support790@",
  port: 587,
  userName: "support@jamsr.in",
};

export const sendEmail = async ({ email, subject, ...rest }: Props) => {
  const { encryption, host, password, port, userName } = mail;

  const transporter = nodemailer.createTransport({
    port,
    host,
    auth: {
      user: userName,
      pass: password,
    },
    secure: encryption === "ssl",
    tls: {
      rejectUnauthorized: false,
    },
  });
  const html = render(EmailDocument({ ...rest }));

  const mailOptions = {
    from: `${APP_NAME} ${userName}`,
    subject,
    html,
    to: email,
  };

  return transporter.sendMail(mailOptions);
};

export default class Email {}
