import * as yup from "yup";

export const loginSchema = yup
  .object({
    userID: yup.string().required("User ID is required"),
    password: yup.string().min(6).required("Password is required"),
  })
  .required();
