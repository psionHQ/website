export type FormErrors<TFields extends string> = Partial<Record<TFields, string>>;

export interface ContactFormInput {
  name: string;
  email: string;
  subject: "General" | "Support" | "Partnership" | "Press";
  message: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}
