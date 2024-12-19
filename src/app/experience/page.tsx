"use client";

import Option from "@/components/Options";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Button from "@/components/Button";
import withAuth from "../auth/auth/authHOC";
import MainNavbar from "@/components/MainNavbar";
import { useSession } from "next-auth/react";


function Experience() {
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption) {
      localStorage.setItem("selectedExperience", selectedOption); // Save the selection to localStorage
      router.push("/templates");
    }
  };

  return (
    <div className="w-full relative h-screen px-10 bg-auth">
      {status === "authenticated" ? <Navbar welcomeText="" showNavItems={true} showRight={true} /> : <MainNavbar/>}
      <span className="text-32px font-semibold text-0F172A flex justify-center mt-12">
        How long have you been working?
      </span>
      <span className="text-base font-normal text-555370 flex justify-center mt-4">
        {"We'll find the best templates for your experience level."}
      </span>
      <div className="max-w-[1065px] mx-auto rounded-lg p-0 md:p-6 mt-5 md:mt-0 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "No Experience", value: "no-experience" },
            { label: "Less Than 3 Years", value: "less than 3 years" },
            { label: "3 - 5 Years", value: "3 - 5 Years" },
            { label: "5 - 10 Years", value: "5 - 10 years" },
            { label: "10+ Years", value: "10+ Years" },
            { label: "20+ Years", value: "20+ Years" },
          ].map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`cursor-pointer ${
                selectedOption === option.value ? "border-blue-500" : ""
              }`}
            >
              <Option
                label={option.label}
                value={option.value}
                name="experience"
                checked={selectedOption === option.value}
                onChange={() => handleOptionSelect(option.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <Button
            onClick={() => router.push("/steps")}
            className="h-12 bg-transparent border hover:bg-[#666666] hover:text-white border-666666 text-666666 px-14 rounded-lg "
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`h-12 px-14 rounded-lg ${
              selectedOption
                ? "hover:bg-[#6B84FE] hover:text-white bg-transparent border border-[#6b84fe] text-[#6b84fe]"
                : "bg-blue-500 opacity-50 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Experience);
