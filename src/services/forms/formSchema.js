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
  fullName: yup.string().optional(),
  companyID: yup.mixed().optional(),
  businessType: yup.string().optional(),
  phoneNumber: yup
    .string()
    .optional()
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be a 10-digit number (e.g., 1234567890)"
    ),
  alternatePhoneNumber: yup
    .string()
    .optional()
    .matches(
      /^[0-9]{10}$/,
      "Alternate phone number must be a 10-digit number (e.g., 1234567890)"
    ),
  emailID: yup.string().email().optional(),
  houseNumber: yup.string().optional(),
  country: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  postalCode: yup.mixed().optional(),
  companyEstDate: yup.string().optional(),
  workingHours: yup.string().optional(),
  aboutCompany: yup.string().optional(),
  mapAddress: yup.string().optional(),
  workingHoursDay: yup.string(),
  workingHoursFromTime: yup.string(),
  workingHoursToTime: yup.string(),
  mapLocation: yup.object().shape({
    lat: yup.number().optional(),
    lon: yup.number().optional(),
    displayName: yup.string().optional().default(""),
  }),
  logoPath: yup.string().optional(),
  bannerPath: yup.string().optional(),
  company_banner: yup.mixed().optional(),
  company_logo: yup.mixed().optional(),
});

export const socialLinkFormSchema = yup.object({
  socialData: yup.array().of(
    yup.object().shape({
      company_id: yup.string().optional().default(""),
      company_social_id: yup.string().optional().default(""),
      created_at: yup.string().optional().default(""),
      link: yup.string().optional().default(""),
      social_id: yup.string().optional().default(""),
      socialmedia_color: yup.string().optional().default(""),
      socialmedia_logo: yup.string().optional().default(""),
      socialmedia_name: yup.string().optional().default(""),
      updated_at: yup.string().optional().default(""),
    })
  ),
});

export const adminSiteSettingFormSchema = yup.object({
  siteTitle: yup.string().optional(),
  siteDescription: yup.string().optional(),
  siteEmail: yup.string().optional(),
  facebook: yup.string().optional(),
  instagram: yup.string().optional(),
  linkedIn: yup.string().optional(),
  siteLogo: yup.mixed().optional(),
  footer_pages: yup.mixed().optional(),
  beforeTag: yup.string().optional(),
  afterTag: yup.string().optional(),
});

export const paymentOptionFormSchema = yup.object({
  bankName: yup.string().optional(),
  QRCodeImage: yup.mixed().optional(),
  logo: yup.mixed().optional(),
  bankAccountNumber: yup.string().optional(),
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

export const adminSocialMediaInfo = yup.object({
  adminSocialMediaInfo: yup.array().of(
    yup.object().shape({
      socialmedia_logo: yup.mixed().optional(),
      socialmedia_name: yup.string().optional(),
      socialmedia_color: yup.string().optional(),
      link: yup.string().optional(),
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

export const themeFormSchema = yup.object({
  theme_data: yup.array().of(
    yup.object().shape({
      theme_image: yup.mixed().optional(),
      theme_name: yup.string().optional(),
      theme_id: yup.string().optional(),
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

export const googleAnalyticsFormSchema = yup.object({
  beforeTag: yup.string().optional(),
  afterTag: yup.string().optional(),
});

export const adminProfileFormSchema = yup.object({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().optional(),
  mobile: yup.string().optional(),
  userID: yup.string().optional(),
  profilePhoto: yup.string().optional(),
});

export const adminChangePasswordFormSchema = yup.object({
  email: yup.string().optional(),
  currentPassword: yup.string().optional(),
  newPassword: yup.string().optional(),
  confirmPassword: yup
    .string()
    .optional()
    .test(
      "passwords-match",
      "New Password and Confirm Password not match!",
      function (value) {
        const { newPassword } = this.parent;
        return newPassword === value;
      }
    ),
});

export const adminAddCompanyFormSchema = yup.object({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().optional(),
  mobile: yup.string().matches(
      /^[0-9]{10}$/,
      "Phone number must be a 10-digit number (e.g., 1234567890)"
    ),
  createPassword: yup.string().optional(),
  confirmPassword: yup
    .string()
    .optional()
    .test(
      "passwords-match",
      "New Password and Confirm Password not match!",
      function (value) {
        const { createPassword } = this.parent;
        return createPassword === value;
      }
    ),
});

export const adminSocialMediaClassFormSchema = yup.object({
  socialcolor: yup.array().of(
    yup.object().shape({
      created_at: yup.string().optional(),
      socialmedia_color_id: yup.string().optional(),
      socialmedia_color_name: yup.string().optional(),
      updated_at: yup.string().optional(),
    })
  ),
  socialMediaClass: yup.string().optional(),
});

export const adminUserReviewFormSchema = yup.object({
  userName: yup.string().optional(),
  userReview: yup.string().optional(),
});
