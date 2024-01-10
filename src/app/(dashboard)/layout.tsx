import AuthProvider from "@/components/AuthProvider";
import React from "react";
import { Toaster } from "sonner";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authProviders } from "@/lib/auth";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authProviders);
  if (!session) {
    return redirect("/sign-in");
  }
  return (
    <AuthProvider>
      <Toaster richColors position="top-center" />
      <div className="bg-[#15202b] h-fit md:w-fit">
        <Navbar />
        <div className="flex">
          <div className="ms-3 lg:hidden">
            <SideBar />
          </div>
          {children}
        </div>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayout;
