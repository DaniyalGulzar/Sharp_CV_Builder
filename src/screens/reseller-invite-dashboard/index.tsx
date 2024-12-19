"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import Wrapper1 from "@/components/Wrapper"; 

export default function ChangeEmailRequest() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session }: any = useSession();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = session.token;
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/reseller/invite`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Invite sent successfully!");
      router.push('/reseller-referral-list');
    } catch (error: any) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />

      <div className="flex w-full">
        <Wrapper1>
          {/* Email Change Form Content */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-white w-full rounded-lg">

              <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h1 className="text-xl font-semibold text-center mb-4">
                    Invite User
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <InputField
                      label="Enter Email"
                      type="email"
                      name="email"
                      required={true}
                      value={email}
                      placeholder="Enter your new email"
                      onChange={handleInputChange}
                    />
                    <div className="mt-4 flex justify-center">
                      <Button
                        type="submit"
                        className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6"
                      >
                        Send Invite
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Wrapper1>
      </div>
    </>
  );
}