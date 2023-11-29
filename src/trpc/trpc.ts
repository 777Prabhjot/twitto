import { authProviders } from "@/lib/auth";
import db from "@/lib/db";
import { initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const data = await getServerSession(authProviders);
  const user = await db.user.findUnique({
    where: {
      email: data?.user?.email!,
    },
  });
  return opts.next({
    ctx: {
      userId: user?.id,
      user,
    },
  });
});
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
