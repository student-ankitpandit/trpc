import { t } from "../trpc.ts"

export const userRouter = t.router({
	getUser: t.procedure.query(() => {
		return { id: 1, name: "ank" }
	})	 
})