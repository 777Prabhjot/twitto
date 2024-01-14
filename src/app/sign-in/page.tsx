import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInForm from "./_components/SignInForm";
import SigninWithGithub from "./_components/SigninWithGithub";
import { authProviders } from "@/lib/auth";
import SignInWithGoogle from "./_components/SignInWithGoogle";

export default async function SignIn() {
  const session = await getServerSession(authProviders);

  if (session) {
    return redirect("/");
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Please sign in </CardTitle>
          <CardDescription>
            To access the private pages you have to be authenticated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <SignInForm />

            <SignInWithGoogle />

            <SigninWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
