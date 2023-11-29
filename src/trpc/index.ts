import db from "@/lib/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { NextResponse } from "next/server";
import { TRPCClientError } from "@trpc/client";
import { getServerSession } from "next-auth";
import { authProviders } from "@/lib/auth";

export const appRouter = router({
  users: publicProcedure.query(async () => {
    return { name: "prabhjot" };
  }),
  addUser: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ input }) => {
      const { name, email } = input;
      const userInfo = await getServerSession(authProviders);

      try {
        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          await db.user.create({
            data: {
              name,
              email,
              image: userInfo?.user?.image && userInfo?.user?.image,
            },
          });

          return NextResponse.json(
            { message: "User created successfully" },
            { status: 200 }
          );
        }

        return null;
      } catch (error) {
        return error;
      }
    }),

  addTweet: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user && !ctx.userId) {
        new TRPCClientError("Unothorized");
      }

      try {
        await db.tweet.create({
          data: {
            content: input,
            userId: ctx.userId,
          },
        });

        return { success: true };
      } catch (error) {
        return error;
      }
    }),

  allTweets: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.user && !ctx.userId) {
      new TRPCClientError("Unothorized");
    }
    return await db.tweet.findMany({
      include: {
        User: true,
      },
    });
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
