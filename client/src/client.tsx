import { createTRPCProxyClient, createWSClient, httpBatchLink, loggerLink, wsLink, splitLink } from "@trpc/client";
import type { AppRouter } from "../../server/server.ts";

const wsClient = createWSClient({
  url: "ws://localhost:8000/trpc"
})

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: op => {
        return op.type === "subscription"
      },
      true: wsLink({
        client: wsClient
      }),
      false: httpBatchLink({
          url: "http://localhost:8000/trpc",
          headers: { Authorization: "TOKEN" }
        }),
    })    
  ],
});

document.addEventListener("click", () => {
  client.users.update.mutate({ userId: "1", name: "ank" })
})

async function main() {
  // const result = await client.secretData.query()
  // console.log(result);
  client.users.onUpdate.subscribe(undefined, {
    onData: id => {
      console.log("updated", id)
    }
  })
  wsClient.close()
}

main();



