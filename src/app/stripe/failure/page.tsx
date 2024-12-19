"use client";
import FailureScreen from "@/screens/stripe-payment/failure";

export default function Signup() {
  return (
    <div className="flex w-full">
      <FailureScreen />
    </div>
  );
}
