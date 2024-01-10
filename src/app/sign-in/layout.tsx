import React from "react";
import { Toaster } from "sonner";

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster position="bottom-right" />
      {children}
    </div>
  );
};

export default SignInLayout;
