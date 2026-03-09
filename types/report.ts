import type { ID, ISODateTimeString } from "./common";

export type ReportTargetType = "ARTWORK" | "USER";

export type ReportStatus = "RECEIVED" | "IN_REVIEW" | "ACTIONED" | "REJECTED";

export type ReportReasonCode =
  | "COPYRIGHT"
  | "INAPPROPRIATE"
  | "SCAM"
  | "PAYMENT_ISSUE"
  | "OTHER";

export type Report = {
  report_id: ID;
  reporter_id: ID;
  target_type: ReportTargetType;
  target_id: ID;
  reason_code: ReportReasonCode;
  description?: string;
  status: ReportStatus;
  created_at: ISODateTimeString;
  actioned_at?: ISODateTimeString;
};

export type ReportCreateRequest = {
  reporter_id: ID;
  target_type: ReportTargetType;
  target_id: ID;
  reason_code: ReportReasonCode;
  description?: string;
  // attachments?: multipart/form-data
};

export type ReportCreateResponse = {
  report_id: ID;
  status: "RECEIVED";
  created_at: ISODateTimeString;
};
