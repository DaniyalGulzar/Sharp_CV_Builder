"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SubscriptionDashboard from "@/components/SubscriptionDashboard";
import MainNavbar from "@/components/MainNavbar";
import Navbar from "@/components/Navbar";

function SubscriptionPage() {
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
      <SubscriptionDashboard />
    </div>
  );
}

export default SubscriptionPage;
