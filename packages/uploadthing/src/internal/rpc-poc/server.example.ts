import * as HttpApp from "@effect/platform/Http/App";
import { Router, Rpc } from "@effect/rpc";
import { HttpRouter } from "@effect/rpc-http";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";

import {
  FailureRequest,
  MultipartCompleteRequest,
  UploadRequest,
} from "./schema";

const router = Router.make(
  Rpc.effect(UploadRequest, (req) => Effect.succeed({} as any)),
  Rpc.effect(FailureRequest, (req) => Effect.succeed({} as any)),
  Rpc.effect(MultipartCompleteRequest, (req) => Effect.succeed({} as any)),
);

export type RouterType = typeof router;

export const POST = pipe(router, HttpRouter.toHttpApp, HttpApp.toWebHandler);
