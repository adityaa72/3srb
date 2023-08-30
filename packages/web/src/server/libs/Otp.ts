import "@/server-only";
import { ClientError } from "@/utils/errors";
import { type Otp_Purpose, type Prisma } from "@prisma/client";
import {
  OTP_EXPIRE_TIME,
  OTP_LENGTH,
} from "@constants/values";
import { getCurrentDate } from "@share/common/utils/fns";
import crypto from "crypto";
import { addMinutes, isAfter } from "date-fns";
import { prisma, type PrismaTransaction } from "../db";

type OtpParams = Omit<Prisma.OtpCreateInput, "validTill" | "id">;

export default class Otp {
  // =========== Public Static Methods ===========

  public static async deleteOtp(data: OtpParams, prismaTx: PrismaTransaction) {
    await prismaTx.otp.delete({ where: { otp_email_purpose: data } });
  }

  public static async getNewOtp(
    email: string,
    purpose: Otp_Purpose,
    expireTime?: number,
  ) {
    const row = await prisma.otp.findFirst({ where: { email, purpose } });

    let newOtp: number;
    let isNew = true;

    if (row) {
      const { otp } = row;
      const isValid = await this.isOtpValid({ email, otp, purpose });
      if (isValid) {
        await this.updateOtp({ email, otp, purpose }, expireTime);
        newOtp = otp;
        isNew = false;
      } else {
        await prisma.otp.deleteMany({ where: { email, purpose } });
        newOtp = await this.getDBUniqueOtp();
      }
    } else {
      newOtp = await this.getDBUniqueOtp();
    }

    if (isNew) {
      await this.createOtp({
        email,
        purpose,
        otp: newOtp,
        validTill: addMinutes(getCurrentDate(), expireTime ?? OTP_EXPIRE_TIME),
      });
    }
    return newOtp;
  }

  public static async isOtpValid(input: OtpParams) {
    const row = await prisma.otp.findFirst({ where: input });
    if (!row) return false;
    const { validTill } = row;
    return isAfter(validTill, getCurrentDate());
  }

  public static async validateOtp(input: OtpParams) {
    const isOtpValid = await this.isOtpValid(input);
    if (!isOtpValid) throw ClientError("Otp is invalid");
    return undefined;
  }

  // =========== Private Static Methods ===========

  private static async createOtp(data: Prisma.OtpCreateInput) {
    return prisma.otp.create({ data });
  }

  private static generateRandomOtp(): number {
    const min = 10 ** (OTP_LENGTH - 1);
    const max = 10 ** OTP_LENGTH - 1;
    return crypto.randomInt(min, max);
  }

  private static async getDBUniqueOtp() {
    let otp = this.generateRandomOtp();
    let isOtp = await prisma.otp.findFirst({ where: { otp } });
    while (isOtp) {
      otp = this.generateRandomOtp();
      // eslint-disable-next-line no-await-in-loop
      isOtp = await prisma.otp.findFirst({ where: { otp } });
    }
    return otp;
  }

  private static async updateOtp(input: OtpParams, expireTime?: number) {
    const validTill = addMinutes(
      getCurrentDate(),
      expireTime ?? OTP_EXPIRE_TIME,
    );
    await prisma.otp.update({
      where: {
        otp_email_purpose: input,
      },
      data: {
        validTill,
      },
    });
  }
}
