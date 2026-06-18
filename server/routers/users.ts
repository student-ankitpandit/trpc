import { t } from "../trpc.ts";
import { z } from "zod";
import { observable } from "@trpc/server/observable"
import { EventEmitter } from "stream";

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));
const eventEmitter = new EventEmitter

export const userRouter = t.router({
  getUser: userProcedure.query(({ input }) => {
    return { id: input.userId };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ name: z.string(), id: z.string }))
    .mutation((req) => {
      console.log(req.ctx.isAdmin)
      console.log(
        `Updating user ${req.input.userId} to have the name ${req.input.name}`,
      );

      return { id: req.input.userId, name: req.input.name };
    }),
    onUpdate: t.procedure.subscription(() => {
      return observable<string>(emit => {
        eventEmitter.on("update", emit.next)

        return () => {
          eventEmitter.off("update", emit.next  )
        }
      })
    })
});
