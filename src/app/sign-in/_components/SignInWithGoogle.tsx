"use client";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/../public/google.png";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInWithGoogle() {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: `${window.location.origin}`,
        })
      }
      className="mt-6"
      variant="secondary"
    >
      Login with Google{" "}
      <Image
        src={GoogleIcon}
        width={10}
        height={10}
        alt="google-icon"
        className="w-4 h-4 ml-4"
      />
    </Button>
  );
}
