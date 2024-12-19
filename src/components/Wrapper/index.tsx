import React from "react";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import MainNavbar from "@/components/MainNavbar";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex flex-col overflow-auto h-[100vh]">
      {status === "authenticated" ? <Navbar welcomeText="" showNavItems={true} showRight={true} /> : <MainNavbar/> }
        <div className="h-[calc(100vh - 93px)] overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
