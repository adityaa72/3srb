import { create } from "zustand";
import { type RouterInputs } from "../types";

type RegisterInput = RouterInputs["user"]["auth"]["register"];

type RegisterState = RegisterInput;
type Step1 = Extract<RegisterState, { step: 1 }>;
type Step2 = Extract<RegisterState, { step: 2 }>;

type RegisterAction = {
  reset: () => void;
  setStep1: () => void;
  setStep2: (data: Step1) => void;
};

const defaultValue: Step1 = {
  step: 1,
  confirmPassword: "",
  email: "",
  name: "",
  password: "",
};

export const useRegister = create<RegisterState & RegisterAction>()((set) => ({
  ...defaultValue,
  reset: () => set(defaultValue),
  setStep1: () => {
    set((state) => ({ ...state, step: 1 }));
  },
  setStep2(data) {
    set({ ...data, step: 2, otp: "" } satisfies Step2);
  },
}));
