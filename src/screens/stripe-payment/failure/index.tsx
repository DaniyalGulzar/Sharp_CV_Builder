import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function FailurePages() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/subscription"); // Navigate to the login page
  };

  return (
    <div className="w-full bg-E3F1F2 flex flex-col h-[100vh] items-center px-10 overflow-auto	">
      <Image
        src="/images/pngs/vector.png"
        width={100}
        height={120}
        className="absolute top-0 left-0"
        alt="Vector 1"
      />
      <Image
        src="/images/pngs/vector1.png"
        width={200}
        height={170}
        className="absolute top-0 right-0"
        alt="Vector 2"
      />
      <Image
        src="/images/pngs/vector2.png"
        width={250}
        height={120}
        className="absolute bottom-0 left-0"
        alt="Vector 3"
      />
      <Image
        src="/images/pngs/vector3.png"
        width={100}
        height={100}
        className="absolute bottom-0 right-0"
        alt="Vector 4"
      />
      <Image
        src="/images/svgs/logo.svg"
        width={169}
        height={45}
        className="mt-3 cursor-pointer"
        alt="Logo"
        onClick={() => router.push("/")}
      />
      <div className="min-w-[300px] max-w-[560px] w-full flex flex-col my-20">
        <Image
          src="/images/svgs/Frame.svg"
          width={100}
          height={100}
          className="mx-auto"
          alt="Checked Icon"
        />
        <span className="text-32px font-bold text-slate-900 text-center mt-3">
          Payment Unsuccessful
        </span>
        {/* <Button
          type="button"
          onClick={handleBackToLogin}
          className="w-full h-[60px] bg-blue-600 text-white hover:bg-blue-700 mt-8 px-6 py-3 rounded-lg "
        >
          Back To Packages
        </Button> */}
        <Button
          type="button"
          onClick={handleBackToLogin}
          className="w-[200px] h-[48px] bg-blue-600 text-white hover:bg-blue-700 mt-6 px-4 py-2 rounded-md mx-auto"
        >
          Back To Packages
        </Button>
      </div>
    </div>
  );
}
