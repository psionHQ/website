export const MESSAGES = {
  auth: {
    genericError: "Unable to complete authentication right now.",
    invalidCredentials: "Invalid email or password.",
    emailNotVerified: "Please verify your email address to continue.",
    accountExists: "An account with this email already exists.",
  },
  contact: {
    submitError: "Unable to send your message right now. Please try again.",
  },
  validation: {
    required: "This field is required.",
    invalidEmail: "Please enter a valid email address.",
    passwordMinLength: "Password must be at least 8 characters.",
    passwordMismatch: "Passwords do not match.",
  },
} as const;
