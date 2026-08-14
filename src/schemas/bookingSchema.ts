import * as yup from "yup";

export const bookingSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: yup
    .string()
    .trim()
    .required("Phone number is required"),

  reason: yup
    .string()
    .required("Please choose a reason"),
});

export type BookingFormValues = yup.InferType<
  typeof bookingSchema
>;