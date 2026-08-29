import type { Inquiry, InquirySubmitPayload, InquiryResult } from "@/types/domain";
import { apiClient } from "./client";

export type { Inquiry, InquirySubmitPayload, InquiryResult };

export async function submitInquiry(payload: InquirySubmitPayload): Promise<InquiryResult> {
  if (!payload.email || !payload.email.includes("@")) {
    throw new Error("Invalid email address provided.");
  }

  const response = await apiClient.post<InquiryResult>("/inquiries", payload);
  return response as InquiryResult;
}
