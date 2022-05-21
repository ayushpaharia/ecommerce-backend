import { object, string, ref, mixed } from "yup"

const payload = {
  email: string().required("Email is required").email("Must be a valid email"),
  password: string()
    .required("Password is required")
    .min(6, "Password is too short - should be 8 characters or longer")
    .matches(
      /^[a-zA-Z0-9._-]*$/,
      "Password can only contain alphabets, numbers , underscore, period and dash",
    ),
}

export const registerUserSchema = object({
  body: object({
    ...payload,
    type: mixed().required("Type is required").oneOf(["buyer", "seller"]),
  }),
})
// passwordConfirmation: string().oneOf(
//   [ref("password"), null],
//   "Passwords must match",
// ),

export const loginUserSchema = object({
  body: object({
    ...payload,
  }),
})
