import AuthProvider from "@/components/AuthProvider";
import React from "react";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Toaster richColors position="top-center" />
      {children}
    </AuthProvider>
  );
};

export default DashboardLayout;
