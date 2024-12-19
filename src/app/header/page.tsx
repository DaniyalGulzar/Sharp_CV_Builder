"use client";

import React, { useEffect, useState } from "react";
import Wrapper1 from "@/components/Wrapper";
import StepForm from "@/components/StepForm";
import Form from "@/components/Form";
import withAuth from "@/app/auth/auth/authHOC";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

function Header() {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const { data: session }: any = useSession();
  
  const fetchUserSubscriptionStatus = async () => {
    if (!session) return;
    try {
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/show/${session.user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubscriptionData(response.data.result.subscription);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch subscription details.";
      toast.error(errorMessage);
    } finally {
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserSubscriptionStatus();
    }
  }, [session]);

  return (
    <div className="flex w-full">
      <Wrapper1>
        <div className="bg-[#F3F3F3] h-[calc(100vh-65px)] overflow-auto">
          <div className="m-[24px]">
            <StepForm stepNumber={-1} key={subscriptionData}/>
          </div>
          <div className="flex gap-4 m-[24px]">
            <div className="w-full">
              <Form />
            </div>
          </div>
        </div>
      </Wrapper1>
    </div>
  );
}

export default withAuth(Header);
