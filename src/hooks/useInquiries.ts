import { useMutation } from "@tanstack/react-query";
import { submitInquiry, type InquirySubmitPayload, type InquiryResult } from "@/lib/api/inquiries";

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: (payload: InquirySubmitPayload) => submitInquiry(payload),
  });
}

export type { InquirySubmitPayload, InquiryResult };
