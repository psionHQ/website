import { env } from "@/config/env";
import { MESSAGES } from "@/constants/messages";
import { apiClient } from "@/lib/api/client";
import { AppError } from "@/lib/errors";
import type { Result } from "@/types/common";
import type { ContactFormInput } from "@/types/forms";
import { err, ok } from "@/utils/result";

interface ContactSubmitResponse {
  received: boolean;
}

export async function submitContactForm(
  payload: ContactFormInput,
): Promise<Result<ContactSubmitResponse, AppError>> {
  if (!env.contactFormEnabled) {
    return ok({ received: true });
  }

  const response = await apiClient.request<ContactSubmitResponse, ContactFormInput>(
    "/contact",
    {
      method: "POST",
      body: payload,
    },
  );

  if (!response.ok) {
    return err(
      new AppError({
        code: response.error.code,
        message: MESSAGES.contact.submitError,
        status: response.error.status,
        details: response.error.details,
      }),
    );
  }

  return response;
}
