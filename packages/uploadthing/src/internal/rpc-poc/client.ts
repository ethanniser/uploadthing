import * as Http from "@effect/platform/HttpClient";
import { Resolver } from "@effect/rpc";
import { HttpResolver } from "@effect/rpc-http";



import { type AllRequests, UploadRequest } from "./schema.js";
import type { RouterType } from "./server.example.js";
import { type Router } from "@effect/rpc/Router";

// can use type from backend (or just from defined requests)
type SuedoRouter = Router<AllRequests, never>;

// Create the client
const client = HttpResolver.make<RouterType>(
  Http.client.fetchOk.pipe(
    Http.client.mapRequest(
      Http.request.prependUrl("http://localhost:3000/rpc"),
    ),
  ),
).pipe(Resolver.toClient);

client(new UploadRequest({
    payload: {
        files: [],
        input: "{}"
    }
}))