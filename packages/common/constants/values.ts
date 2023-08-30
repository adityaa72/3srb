export const RESPONSIVE_GAP = { xs: 1, md: 2 };
export const DECIMAL_SCALE = 2;
export const OTP_LENGTH = 6; // max 8
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_LOGIN_SESSION = 5;
export const OTP_EXPIRE_TIME = 3; // minutes
export const ADMIN_OTP_EXPIRE_TIME = 1; // minutes

// ! don't update these values ⬇️
export const MAX_OTP_VALUE = 10 ** OTP_LENGTH - 1;
export const MIN_OTP_VALUE = 10 ** (OTP_LENGTH - 1);
