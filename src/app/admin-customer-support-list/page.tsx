"use client";
import React, { useEffect, useState } from "react";
import CustomerSupportCRUD from "@/screens/super-admin/customer-support-list";
import { useSession } from "next-auth/react";

function CustomerSupportList() {
  const [role, setRole] = useState<string | null>(null);
  const { data: session }: any = useSession();
  useEffect(() => {
    if (!session) return;
    setRole(session.user.role);
  }, [session]);
  return (
    <>
      {role === "SuperAdmin" ? (
        <div className="flex w-full">
          <CustomerSupportCRUD />
        </div>
      ) : null}
    </>
  );
}

export default CustomerSupportList;