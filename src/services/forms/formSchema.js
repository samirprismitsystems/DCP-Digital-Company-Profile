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

export const socialLinkFormSchema = yup.object({
  facebookLink: yup.string().required(),
  instagramLink: yup.string().required(),
  linkedInLink: yup.string().required(),
  twitterLink: yup.string().required(),
  whatsAppLink: yup.string().required(),
  pintrestLink: yup.string().required(),
  telegramLink: yup.string().required(),
  youtubeLink: yup.string().required(),
});

export const paymentOptionFormSchema = yup.object({
  bankName: yup.string().optional(),
  QRCodeImage: yup.mixed().optional(),
  bankAccountNumber: yup.number().optional(),
  accountHolderName: yup.string().optional(),
  payTMNumber: yup.string().optional(),
  googlePayNumber: yup.string().optional(),
  phonePeNumber: yup.string().optional(),
  keyID: yup.string().optional(),
  keySecret: yup.string().optional(),
  bankIFSCCode: yup.string().optional(),
  accountType: yup.string().optional(),
});

export const productFormSchema = yup.object({
  product_data: yup.array().of(
    yup.object().shape({
      product_image: yup.mixed().optional(),
      product_name: yup.string().required(),
      product_price: yup.string().required(),
      product_desc: yup.string().required(),
    })
  ),
});

export const serviceFormSchema = yup.object({
  service_data: yup.array().of(
    yup.object().shape({
      service_image: yup.mixed().optional(),
      service_name: yup.string().required(),
      service_price: yup.string().required(),
      service_desc: yup.string().required(),
    })
  ),
});

export const clientFormSchema = yup.object({
  client_data: yup.array().of(
    yup.object().shape({
      client_image: yup.mixed().optional(),
      client_name: yup.string().required(),
    })
  ),
});

export const portfolioFormSchema = yup.object({
  portfolio_data: yup.array().of(
    yup.object().shape({
      portfolio_image: yup.mixed().optional(),
      portfolio_name: yup.string().required(),
      portfolio_desc: yup.string().required(),
    })
  ),
});
