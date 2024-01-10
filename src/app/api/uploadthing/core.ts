import { authProviders } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await getServerSession(authProviders);

      if (!user?.user) throw new Error("Unauthorized");

      return { user: user.user.name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for user:", metadata.user);

      console.log("file url", file.url);
      return { imageUrl: file.url };
    }),
  videoUploader: f({ video: { maxFileSize: "64MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await getServerSession(authProviders);

      if (!user?.user) throw new Error("Unauthorized");

      return { user: user.user.name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for user:", metadata.user);

      console.log("file url", file.url);
      return { videoUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
