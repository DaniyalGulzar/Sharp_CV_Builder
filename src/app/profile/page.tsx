"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Education from "@/components/userProfile/Education";
import Skill from "@/components/userProfile/skills";
import Experience from "@/components/userProfile/History";
import Header from "@/components/userProfile/Header";
import Summary from "@/components/userProfile/summary";

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const initialStep = searchParams?.get("step");
    if (initialStep) {
      const stepNumber = parseInt(initialStep, 10);
      if (stepNumber >= 1 && stepNumber <= 5) {
        setCurrentStep(stepNumber);
      }
    }
  }, [searchParams]);

  const handleNavigation = (step: number) => {
    if (step === 0 || step === 6) {
      router.push("/dashboard");
    } else {
      setCurrentStep(step);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Header onScreen={handleNavigation} />;
      case 2:
        return <Summary onScreen={handleNavigation} />;
      case 3:
        return <Experience onScreen={handleNavigation} />;
      case 4:
        return <Education />;
      case 5:
        return <Skill onScreen={handleNavigation} />;
      default:
        return null;
    }
  };

  return <div>{renderCurrentStep()}</div>;
};

const ProfilePage: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Profile />
  </Suspense>
);

export default ProfilePage;

