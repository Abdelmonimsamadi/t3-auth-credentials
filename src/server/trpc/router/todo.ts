import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const todoRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        task: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { task } = input;
      const id = ctx.session.user.id;
      return ctx.prisma.todo.create({ data: { task, userId: id } });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    const id = ctx.session.user.id;
    return ctx.prisma.todo.findMany({ where: { userId: id } });
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const todo = await ctx.prisma.todo.findUnique({ where: { id } });
      if (!todo) throw new Error("Task no longer exist!");
      const userId = ctx.session.user.id;
      if (todo?.userId !== userId)
        throw new Error("You are not authorized to modify this task!");
      return ctx.prisma.todo.delete({ where: { id } });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        todo: z.object({
          task: z.string().optional(),
          completed: z.boolean().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, todo: newTodo } = input;
      const todo = await ctx.prisma.todo.findUnique({ where: { id } });
      if (!todo) throw new Error("Task no longer exist!");
      const userId = ctx.session.user.id;
      if (todo?.userId !== userId)
        throw new Error("You are not authorized to modify this task!");
      return ctx.prisma.todo.update({ where: { id }, data: newTodo });
    }),
});
