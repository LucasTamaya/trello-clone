import * as Yup from "yup";

// schema de validation pour register
const loginValidation = Yup.object({
  email: Yup.string()
    .email("You must enter a valid email address")
    .required("You must enter your email address"),
  password: Yup.string()
    .min(6, "This password is too short")
    .required("You must enter a password"),
}).required();

export default loginValidation;
