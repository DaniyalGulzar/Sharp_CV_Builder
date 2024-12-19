import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import axios from "axios";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import MainNavbar from "@/components/MainNavbar";

export default function StepsScreen() {
  const { data: session, status }: any = useSession(); // Access session data
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleContinueClick = async () => {
    setLoading(true);
    const token = session.token; // Access token from user object
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NEXT_URL}api/step`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      localStorage.setItem("tips", JSON.stringify(response.data.result));
      router.push("/experience");
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="w-full relative h-screen  px-10 bg-auth">
      {status === "authenticated" ? <Navbar welcomeText="" showNavItems={true} showRight={true} /> : <MainNavbar/>}
        <span className="text-5xl font-bold text-555370 flex justify-center mt-12">
          {"Here's what you need to know"}
        </span>
        <div className="w-full justify-between items-center flex flex-col md:flex-row mt-12">
          <div className="w-[350px] items-center flex flex-col">
            <Image
              src="/images/pngs/step1.png"
              width={88}
              height={88}
              alt="Logo"
            />
            <span className="text-lg font-semibold mt-6 text-0F172A">
              Step 1
            </span>
            <p className="text-base font-normal text-center mt-3 text-555370">
              Check out our pre-designed templates and guided steps, allowing
              you to create a polished resume faster.
            </p>
          </div>
          <div className="w-[350px] items-center flex flex-col">
            <Image
              src="/images/pngs/step2.png"
              width={88}
              height={88}
              alt="Logo"
            />
            <span className="text-lg font-semibold mt-6 text-0F172A">
              Step 2
            </span>
            <p className="text-base font-normal text-center mt-3 text-555370">
              Get the right words to describe what you do. Search by job title
              and find pre-written content of your skills and responsibilities.
            </p>
          </div>
          <div className="w-[350px] items-center flex flex-col">
            <Image
              src="/images/pngs/step3.png"
              width={88}
              height={88}
              alt="Logo"
            />
            <span className="text-lg font-semibold mt-6 text-0F172A">
              Step 3
            </span>
            <p className="text-base font-normal text-center mt-3 text-555370">
              {
                "We'll help you fine-tune the details, quickly  generate each section, and download your new resume. That's it - you're ready to apply!"
              }
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <Button
            onClick={() => router.push("/dashboard")}
            className="h-12 bg-transparent border hover:bg-[#666666] hover:text-white border-666666 text-666666 px-14 rounded-lg "
          >
            Back
          </Button>
          <Button
            className={`h-12 px-14 rounded-lg hover:bg-[#6B84FE] hover:text-white bg-transparent border border-[#6b84fe] text-[#6b84fe]`}
            onClick={handleContinueClick}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
