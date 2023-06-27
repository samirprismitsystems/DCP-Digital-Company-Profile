import * as yup from "yup";

export const loginSchema = yup.object({
  userID: yup.string().required(),
  password: yup.string(),
});

export const forgotPasswordSchema = yup.object({
  userID: yup.string(),
});

export const createNewAccountSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  mobile: yup.number().required(),
  createPassword: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("createPassword"), null], "Passwords must be match"),
});
