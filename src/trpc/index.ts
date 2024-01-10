import db from "@/lib/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { NextResponse } from "next/server";
import { TRPCClientError } from "@trpc/client";
import { getServerSession } from "next-auth";
import { authProviders } from "@/lib/auth";
import { UTApi } from "uploadthing/server";
import { TRPCError } from "@trpc/server";

const utapi = new UTApi();

export const appRouter = router({
  userInfo: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.user && !ctx.userId) {
      new TRPCClientError("Unothorized");
    }

    const user = await db.user.findUnique({
      where: {
        id: ctx.userId,
      },
      include: {
        followers: true,
        following: true,
      },
    });

    const tweets = await db.tweet.findMany({
      where: {
        userId: ctx.userId,
      },
    });

    return { tweets, user };
  }),
  getUserById: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userId = input;

      const user = await db.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          tweets: true,
          followers: true,
          following: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return user;
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
    .input(
      z.object({
        content: z.string(),
        imageUrl: z.string(),
        videoUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user && !ctx.userId) {
        new TRPCClientError("Unothorized");
      }

      try {
        await db.tweet.create({
          data: {
            content: input.content,
            image: input.imageUrl,
            video: input.videoUrl,
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
    const tweets = await db.tweet.findMany({
      include: {
        User: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { tweets, currentUserId: ctx.userId };
  }),

  likeTweet: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user && !ctx.userId) {
        new TRPCClientError("Unothorized");
      }

      const userId = ctx.userId;
      const tweetId = input;

      const existingLike = await db.like.findFirst({
        where: { tweetId, userId },
      });

      if (existingLike) {
        new TRPCClientError("Tweet already liked");
      }

      await db.like.create({
        data: {
          Tweet: { connect: { id: tweetId } },
          User: { connect: { id: userId } },
        },
      });

      return { success: true };
    }),

  removeTweetLike: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user && !ctx.userId) {
        new TRPCClientError("Unothorized");
      }

      const userId = ctx.userId;
      const tweetId = input;

      const existingLike = await db.like.findFirst({
        where: { tweetId, userId },
      });

      if (existingLike) {
        await db.like.delete({
          where: {
            id: existingLike.id,
          },
        });

        return { success: true };
      }

      return NextResponse.json(
        { message: "Tweet is already liked" },
        { status: 400 }
      );
    }),

  deleteTweet: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user && !ctx.userId) {
        new TRPCClientError("Unothorized");
      }

      const tweet = await db.tweet.findUnique({
        where: {
          id: input,
          userId: ctx.userId,
        },
      });

      if (!tweet) {
        return { message: "Tweet not found" };
      }

      await db.like.deleteMany({
        where: {
          tweetId: input,
        },
      });

      if (tweet.image) {
        const parts = tweet.image.split("/");
        const imageName = parts[parts.length - 1];
        await utapi.deleteFiles(imageName);
      }
      if (tweet.video) {
        const parts = tweet.video.split("/");
        const videoName = parts[parts.length - 1];
        await utapi.deleteFiles(videoName);
      }
      await db.tweet.delete({
        where: {
          id: input,
          userId: ctx.userId,
        },
      });

      return NextResponse.json(
        { message: "Tweet deleted successfully" },
        { status: 200 }
      );
    }),

  existingMessages: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (!ctx.user && !ctx.userId) {
        new TRPCClientError("Unothorized");
      }

      return await db.message.findMany({
        where: {
          chatRoomId: input,
        },
      });
    }),

  followUser: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userIdToFollow = input;

      if (!ctx.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const alreadyFollowing = await db.follow.findFirst({
        where: {
          followerId: ctx.userId,
          followingId: userIdToFollow,
        },
      });

      if (alreadyFollowing) {
        new TRPCClientError("Already following");
      }

      await db.follow.create({
        data: {
          followerId: ctx.userId,
          followingId: userIdToFollow,
        },
      });

      return {
        success: true,
      };
    }),

  unfollowUser: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userIdToUnfollow = input;

      if (!ctx.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      await db.follow.delete({
        where: {
          followerId_followingId: {
            followerId: ctx.userId,
            followingId: userIdToUnfollow,
          },
        },
      });

      return {
        success: true,
      };
    }),

  deleteFile: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user && !ctx.userId) {
        new TRPCClientError("Unothorized");
      }

      try {
        const parts = input.split("/");
        const fileName = parts[parts.length - 1];
        await utapi.deleteFiles(fileName);

        return { success: true };
      } catch (error) {
        return error;
      }
    }),

  updateProfile: privateProcedure
    .input(
      z.object({
        name: z.string(),
        bio: z.string(),
        link: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user && !ctx.userId) {
        new TRPCClientError("Unothorized");
      }

      try {
        await db.user.update({
          where: {
            id: ctx.userId,
          },
          data: input,
        });

        return NextResponse.json(
          { message: "Profile updated successfully" },
          { status: 200 }
        );
      } catch (error) {
        return error;
      }
    }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
