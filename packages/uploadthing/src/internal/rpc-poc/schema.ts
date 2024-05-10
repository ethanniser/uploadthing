import * as S from "@effect/schema/Schema";

import {
  FailureActionPayload,
  MultipartCompleteActionPayload,
  PresignedURLResponseSchema,
  UploadActionPayload,
} from "../shared-schemas";

const ERROR_SCHEMA = S.Never;

export type AllRequests = UploadRequest | FailureRequest | MultipartCompleteRequest;

export class UploadRequest extends S.TaggedRequest<UploadRequest>()(
  "UploadRequest",
  ERROR_SCHEMA,
  PresignedURLResponseSchema,
  {
    payload: UploadActionPayload,
  },
) {}

export class FailureRequest extends S.TaggedRequest<FailureRequest>()(
  "FailureRequest",
  ERROR_SCHEMA,
  S.Void,
  {
    payload: FailureActionPayload,
  },
) {}

export class MultipartCompleteRequest extends S.TaggedRequest<MultipartCompleteRequest>()(
  "MultipartCompleteRequest",
  ERROR_SCHEMA,
  S.Void,
  {
    payload: MultipartCompleteActionPayload,
  },
) {}
