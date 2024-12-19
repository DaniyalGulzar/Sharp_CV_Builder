import React from "react";
import Wrapper1 from "@/components/Wrapper";
import Button from "@/components/Button";
import Image from "next/image";
import Resumelist from "@/screens/resume-list";
import Link from "next/link";

const DASHBOARD = () => {
  return (
    <>
      <div className="flex w-full">
        <Wrapper1>
          <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            {/* First Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center p-4 border bg-gray-100 border-gray-200 rounded-lg shadow-lg w-full max-w-[1000px] mb-6">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/svgs/id.svg"
                  alt="Description"
                  height={40}
                  width={40}
                />
                <div>
                  <p className="font-bold text-lg">Claim Your custom URL</p>
                  <p className="text-gray-600 text-justify lg:w-[700px] w-full">
                    {
                      " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    }
                  </p>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 w-full lg:w-auto">
                <Link href="/coming-soon">
                  <Button className="h-12 w-full lg:w-40 bg-transparent border border-gray-500 text-[#0D1987] font-semibold rounded-3xl">
                    Claim my URL
                  </Button>
                </Link>
              </div>
            </div>

            {/* Second Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center p-4 border bg-gray-100 border-gray-200 rounded-lg shadow-lg w-full max-w-[1000px]">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/svgs/comment .svg"
                  alt="Description"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-bold text-lg">Ace Your Interviews</p>
                  <p className="text-gray-600 text-justify lg:w-[700px] w-full">
                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"}
                  </p>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 w-full lg:w-auto">
                <Link href="/coming-soon">
                  <Button className="h-12 w-full lg:w-40 bg-transparent border border-gray-500 text-[#0D1987] font-semibold rounded-3xl">
                    Visit Big Interview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Resumelist />
          </div>
        </Wrapper1>
      </div>
    </>
  );
};

export default DASHBOARD;
