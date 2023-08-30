
import { MAX_OTP_VALUE, MIN_OTP_VALUE, MIN_PASSWORD_LENGTH, OTP_LENGTH } from "../constants/values";
import { number, string, type RawCreateParams } from "zod";
import { isObjectId } from "./fns";

const objectId = (message: string) =>
  string().refine(isObjectId, {
    message,
  });

const otp = () =>
  string()
    .length(OTP_LENGTH, `Otp must be ${OTP_LENGTH} characters long`)
    .transform(Number)
    .pipe(number().positive().min(1))
    .or(number().min(MIN_OTP_VALUE).max(MAX_OTP_VALUE));

const password = (name: string) =>
  string()
    .nonempty(`${name} is required`)
    .min(
      MIN_PASSWORD_LENGTH,
      `${name} must be at least ${MIN_PASSWORD_LENGTH} characters`
    )
    .max(20, `${name} must be at most 20 characters`);

const enumError = (message: string): RawCreateParams => ({
  errorMap: (issue) => {
    switch (issue.code) {
      case "invalid_enum_value":
        return {
          message,
        };
      default:
        return {
          message,
        };
    }
  },
});

const zodSchemas = {
  enumError,
  objectId,
  otp,
  password,
};
export default zodSchemas;
