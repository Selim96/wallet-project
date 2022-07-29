import * as Yup from "yup";

const authValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter correct email")
    .min(2, "Please enter more than 2 character")
    .max(100, "Max 100")
    .matches(
      /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,100})$/i,
      "Please enter correct email"
    )
    .required("this field is required"),
  password: Yup.string()
    .min(6, "Please enter more than 5 character")
    .max(12, "Please enter not more than 12 character")
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,12}/,
      "password must contain one number,uppercase and lowercase character"
    )
    .required("this field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("this field is required"),
  username: Yup.string()
    .min(2, "Please enter more than 1 character")
    .max(12, "Please enter not more than 12 character")
    .matches(
      /^(?!.*\.\.)(?!\.)(?!.*\.$)(?!\d+$)[a-zA-Z0-9.]{2,12}$/,
      "Name is invalid"
    )
    .required("this field is required"),
});
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter correct email")
    .matches(
      /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,100})$/i,
      "Please enter correct email"
    )
    .max(254, "Max 254")
    .required("this field is required"),
  password: Yup.string()
    .min(6, "Please enter more than 5 character")
    .max(12, "Max 12")
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,12}/,
      "password must contain one number,uppercase and lowercase character"
    )
    .required("this field is required"),
});
export function validationSchema(type) {
  if (type === "signUp") {
    return authValidationSchema;
  } else {
    return loginValidationSchema;
  }
}
