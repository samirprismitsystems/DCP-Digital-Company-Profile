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

export const companyDetailsFormSchema = yup.object({
  fullName: yup.string().required(),
  businessType: yup.string().required(),
  phoneNumber: yup.number().required(),
  alternatePhoneNumber: yup.mixed().optional(),
  emailID: yup.string().email().required(),
  houseNumber: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  postalCode: yup.number().required(),
  companyEstDate: yup.string().optional(),
  workingHours: yup.string().optional(),
  aboutCompany: yup.string().optional(),
  mapAddress: yup.string().optional(),
  workingHoursDay: yup.string(),
  workingHoursFromTime: yup.string(),
  workingHoursToTime: yup.string(),
  logoPath: yup.mixed(),
  bannerPath: yup.mixed(),
});
