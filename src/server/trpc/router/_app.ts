import { router } from "../trpc";
import { authRouter } from "./auth";
import { todoRouter } from "./todo";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
