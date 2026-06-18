import express from "express"
import cors from "cors"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from "./routers/index.ts"

const app = express()

app.use(cors({ origin: "http://localhost:5173" }))

app.use("/trpc", createExpressMiddleware({ router: appRouter }))

app.listen(8000, () => {
	console.log(`Server is up and running on PORT 8000`)
})

export type AppRouter = typeof appRouter