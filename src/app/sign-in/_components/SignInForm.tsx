"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { toast } from "sonner";

export default function SignInForm() {
  const [email, setEmail] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [loading, setLoading] = useState(false);

  async function SignInWithEmail() {
    setLoading(true);
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (!signInResult?.ok) {
      setLoading(false);
      return toast.error("Something went wrong, please try again");
    }

    setLoading(false);
    setEmail("");
    return toast.success("Check your email");
  }
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <Label>Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          placeholder="name@example.com"
        />
      </div>

      <Button
        disabled={loading}
        onClick={SignInWithEmail}
        className="mt-4 w-full disabled:cursor-none"
      >
        {loading && <MoonLoader className="me-1" size={13} color="white" />}
        Login with Email
      </Button>
    </>
  );
}
