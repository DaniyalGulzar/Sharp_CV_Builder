"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NewResumeDashboard from "@/components/createNewResume";
import Navbar from "@/components/Navbar";
import MainNavbar from "@/components/MainNavbar";

function CreateResmeDashbaord() {
  const [role, setRole] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.role) {
      setRole(session.user.role);
    }
  }, [session]);

  return (
    <div className="flex w-full flex-col">
      {status === "authenticated" ? <Navbar welcomeText="" showNavItems={true} showRight={true} /> : <MainNavbar />}
      <NewResumeDashboard />
    </div>
  );
}

export default CreateResmeDashbaord;
