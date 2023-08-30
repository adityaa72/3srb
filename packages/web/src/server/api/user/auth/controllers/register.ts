import { OTP_SENT_MESSAGE } from "@constants/text";
import { type Context } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { Emails } from "@/server/email";
import Otp from "@/server/libs/Otp";
import User from "@/server/libs/User";
import { type ResponseMessage } from "@/types";
import { createHash } from "@/utils/bcrypt";
import { ClientError } from "@/utils/errors";
import { Otp_Purpose } from "@prisma/client";
import { type Schema } from "@validations/user/auth";

const register = async ({
  ctx: _,
  input,
}: {
  ctx: Context;
  input: Schema["register"];
}) => {
  const { step, email, name, password } = input;

  // check if user exits
  const isUser = await User.isEmail(email);
  if (isUser) throw ClientError("Email already registered");

  const otpPurpose = Otp_Purpose.Register;
  // send registration otp
  if (step === 1) {
    const newOtp = await Otp.getNewOtp(email, otpPurpose);
    await Emails.Registration.Verification({
      email,
      otp: newOtp,
    });

    return {
      message: OTP_SENT_MESSAGE,
      email,
    } satisfies ResponseMessage;
  }

  // validate otp
  const { otp } = input;
  if (!otp) throw ClientError("Otp is required");
  await Otp.validateOtp({
    otp,
    email,
    purpose: otpPurpose,
  });

  // hash password
  const hashedPassword = await createHash(password);

  // create user id
  const userId = await User.createUserId();

  // create user
  await prisma.$transaction([
    prisma.user.create({
      data: {
        userId,
        email,
        name,
        password: hashedPassword,
      },
    }),
    prisma.otp.delete({
      where: {
        otp_email_purpose: {
          email,
          otp,
          purpose: otpPurpose,
        },
      },
    }),
  ]);

  // send registration success email
  void Emails.Registration.Success({
    email,
  });

  return { message: "Register Successful" } satisfies ResponseMessage;
};
export default register;
