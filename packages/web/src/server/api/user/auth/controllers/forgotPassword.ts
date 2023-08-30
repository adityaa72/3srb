import { type Context } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { Emails } from "@/server/email";
import Otp from "@/server/libs/Otp";
import User from "@/server/libs/User";
import { type ResponseMessage } from "@/types";
import { createHash } from "@/utils/bcrypt";
import { OTP_SENT_MESSAGE } from "@constants/text";
import { Otp_Purpose } from "@prisma/client";
import { type Schema } from "@validations/user/auth";

const forgotPassword = async ({
  ctx: _,
  input,
}: {
  ctx: Context;
  input: Schema["forgotPassword"];
}) => {
  const { email, step } = input;

  // check user
  await User.getInstance(
    email,
    "No account is registered with this email address",
  );

  // send email
  const otpPurpose = Otp_Purpose.ResetPassword;
  if (step === 1) {
    const otp = await Otp.getNewOtp(email, otpPurpose);
    await Emails.ResetPassword.Verification({ otp, email });
    return { message: OTP_SENT_MESSAGE } satisfies ResponseMessage;
  }

  // step 2
  const { otp, password } = input;

  // validate otp
  await Otp.validateOtp({
    otp,
    email,
    purpose: otpPurpose,
  });

  const hashedPassword = await createHash(password);
  await prisma.$transaction([
    // update password
    prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    }),
    // delete otp
    prisma.otp.delete({
      where: {
        otp_email_purpose: { otp, email, purpose: otpPurpose },
      },
    }),
  ]);

  // send success email
  void Emails.ResetPassword.Success({ email });

  return { message: "Password reset successful" } satisfies ResponseMessage;
};
export default forgotPassword;
