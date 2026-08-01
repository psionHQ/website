export const MESSAGES = {
  auth: {
    pending: "Authentication will be enabled in a future platform phase.",
    genericError: "Unable to complete authentication right now.",
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
