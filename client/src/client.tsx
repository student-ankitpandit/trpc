import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/server.ts"

const client = createTRPCProxyClient<AppRouter>({
	links: [httpBatchLink({
		url: "http://localhost:8000/trpc"
	})]
}) 

async function main() {
	const result = await client.users.getUser.query()
	console.log(result)
}

main()