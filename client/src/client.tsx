import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "../../server/server.ts";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:8000/trpc",
      headers: { Authorization: "TOKEN" }
    }),
  ],
});

async function main() {
  const result = await client.secretData.query()
  console.log(result);
}

main();
