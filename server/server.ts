import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index.ts";
import { createContext } from "./context.ts"
import { applyWSSHandler } from "@trpc/server/adapters/ws"
import { WebSocketServer } from "ws"

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

const server = app.listen(8000, () => {
  console.log(`Server is up and running on PORT 8000`);
});

const wss = new WebSocketServer({ server })

applyWSSHandler({
  wss,
  router: appRouter,
  createContext: () => {
    return { isAdmin: true }
  }
})

export type AppRouter = typeof appRouter;
