import { MESSAGES } from "@/constants/messages";
import type { ContactFormInput, FormErrors, SignInInput, SignUpInput } from "@/types/forms";
import { hasMinLength, isNonEmpty, isValidEmail } from "@/utils/validators";

export function validateContactForm(
  input: ContactFormInput,
): FormErrors<"name" | "email" | "message"> {
  const errors: FormErrors<"name" | "email" | "message"> = {};

  if (!isNonEmpty(input.name)) errors.name = MESSAGES.validation.required;
  if (!isValidEmail(input.email)) errors.email = MESSAGES.validation.invalidEmail;
  if (!isNonEmpty(input.message)) errors.message = MESSAGES.validation.required;

  return errors;
}

export function validateSignInInput(
  input: SignInInput,
): FormErrors<"email" | "password"> {
  const errors: FormErrors<"email" | "password"> = {};

  if (!isValidEmail(input.email)) errors.email = MESSAGES.validation.invalidEmail;
  if (!hasMinLength(input.password, 8)) {
    errors.password = MESSAGES.validation.passwordMinLength;
  }

  return errors;
}

export function validateSignUpInput(
  input: SignUpInput,
): FormErrors<"fullName" | "email" | "password" | "confirmPassword" | "agreed"> {
  const errors: FormErrors<"fullName" | "email" | "password" | "confirmPassword" | "agreed"> =
    {};

  if (!isNonEmpty(input.fullName)) errors.fullName = MESSAGES.validation.required;
  if (!isValidEmail(input.email)) errors.email = MESSAGES.validation.invalidEmail;
  if (!hasMinLength(input.password, 8)) {
    errors.password = MESSAGES.validation.passwordMinLength;
  }
  if (input.password !== input.confirmPassword) {
    errors.confirmPassword = MESSAGES.validation.passwordMismatch;
  }
  if (!input.agreed) {
    errors.agreed = MESSAGES.validation.required;
  }

  return errors;
}
