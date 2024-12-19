import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    name: "Heading",
    image: "/images/svgs/first.svg",
    completedImage: "/images/svgs/second.svg",
    url: "/header",
  },
  {
    name: "Work History",
    image: "/images/svgs/first.svg",
    completedImage: "/images/svgs/second.svg",
    url: "/history",
  },
  {
    name: "Education",
    image: "/images/svgs/first.svg",
    completedImage: "/images/svgs/second.svg",
    url: "/education",
  },
  {
    name: "Skills",
    image: "/images/svgs/first.svg",
    completedImage: "/images/svgs/second.svg",
    url: "/skills",
  },
  {
    name: "Summary",
    image: "/images/svgs/first.svg",
    completedImage: "/images/svgs/second.svg",
    url: "/summary",
  },
  {
    name: "Additional",
    image: "/images/svgs/first.svg",
    completedImage: "/images/svgs/second.svg",
    url: "/final",
  },
  {
    name: "Finalize",
    image: "/images/svgs/first.svg",
    completedImage: "/images/svgs/second.svg",
    url: "/preview",
  },
];

export default function StepForm({ stepNumber }) {
  const [currentStep, setCurrentStep] = useState(stepNumber);

  useEffect(() => {
    setCurrentStep(stepNumber);
  }, [stepNumber]);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg">
      {/* Step Indicator */}
      <div className="flex flex-col flex-wrap justify-start xl:flex-row gap-1 md:gap-2 p-2 md:p-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index < steps.length - 1 ? "mr-1" : "" // Reduced margin between steps
            } w-auto`}
          >
            <Link href={step.url}>
            {/* Wrap Image directly in Link */}
            <Image
              src={index <= currentStep ? step.completedImage : step.image}
              alt={step.name}
              width={26}
              height={26}
              className="block cursor-pointer"
            />
            </Link>
            <Link href={step.url}>
            {/* Wrap Step Name directly in Link */}
            <p
              className={`ml-0.5 mb-0 text-sm md:text-base lg:text-lg font-medium cursor-pointer ${
                index === currentStep ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {step.name}
            </p>
            </Link>
            {/* Border Line */}
            {index < steps.length - 1 && (
              <span className="hidden xl:block border border-[#6B84FE] border-2 w-24 ml-2" /> // Reduced width and margin of border line
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
