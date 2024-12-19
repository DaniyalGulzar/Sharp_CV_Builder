// import { useEffect, useState } from "react";
// import Image from "next/image";

// interface StepFormProps {
//   stepNumber: number; // Explicitly type 'stepNumber' as a number
// }

// export default function StepForm({ stepNumber }: StepFormProps) {
//   const [currentStep, setCurrentStep] = useState(stepNumber);
//   const steps = [
//     {
//       name: "Heading",
//       image: "/images/svgs/first.svg",
//       completedImage: "/images/svgs/second.svg",
//     },
//     {
//       name: "Summary",
//       image: "/images/svgs/first.svg",
//       completedImage: "/images/svgs/second.svg",
//     },
//     {
//       name: "Work History",
//       image: "/images/svgs/first.svg",
//       completedImage: "/images/svgs/second.svg",
//     },
//     {
//       name: "Education",
//       image: "/images/svgs/first.svg",
//       completedImage: "/images/svgs/second.svg",
//     },
//     {
//       name: "Skills",
//       image: "/images/svgs/first.svg",
//       completedImage: "/images/svgs/second.svg",
//     },
//   ];

//   useEffect(() => {
//     setCurrentStep(stepNumber);
//   }, [stepNumber]);

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg">
//       {/* Step Indicator */}
//       <div className="flex flex-col flex-wrap justify-start xl:flex-row gap-1 md:gap-2 p-2 md:p-4">
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className={`flex items-center ${
//               index < steps.length - 1 ? "mr-1" : ""
//             } w-auto`}
//           >
//             <Image
//               src={index <= currentStep ? step.completedImage : step.image}
//               alt={step.name}
//               width={26}
//               height={26}
//               className="block cursor-pointer"
//             />
//             <p
//               className={`ml-0.5 mb-0 text-sm md:text-base lg:text-lg font-medium cursor-pointer ${
//                 index === currentStep ? "text-gray-600" : "text-gray-400"
//               }`}
//             >
//               {step.name}
//             </p>
//             {/* </Link> */}
//             {index < steps.length - 1 && (
//               <span className="hidden xl:block border-[#6B84FE] border-2 w-24 ml-2" />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Step {
  name: string;
  image: string;
  completedImage: string;
  route?: string;
}

interface StepFormProps {
  stepNumber: number;
  onStepClick?: (stepIndex: number) => void;
}

export default function StepForm({ stepNumber, onStepClick }: StepFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(stepNumber);

  const steps: Step[] = [
    {
      name: "Heading",
      image: "/images/svgs/first.svg",
      completedImage: "/images/svgs/second.svg",
      route: "/profile?step=1",
    },
    {
      name: "Summary",
      image: "/images/svgs/first.svg",
      completedImage: "/images/svgs/second.svg",
      route: "/profile?step=2",
    },
    {
      name: "Work History",
      image: "/images/svgs/first.svg",
      completedImage: "/images/svgs/second.svg",
      route: "/profile?step=3",
    },
    {
      name: "Education",
      image: "/images/svgs/first.svg",
      completedImage: "/images/svgs/second.svg",
      route: "/profile?step=4",
    },
    {
      name: "Skills",
      image: "/images/svgs/first.svg",
      completedImage: "/images/svgs/second.svg",
      route: "/profile?step=5",
    },
  ];

  useEffect(() => {
    setCurrentStep(stepNumber);
  }, [stepNumber]);

  const handleStepClick = (index: number) => {
    if (onStepClick) {
      onStepClick(index);
      return;
    }

    const step = steps[index];
    if (step.route) {
      router.push(step.route);
      return;
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg">
      <div className="flex flex-col flex-wrap justify-start xl:flex-row gap-1 md:gap-2 p-2 md:p-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index < steps.length - 1 ? "mr-1" : ""
            } w-auto`}
            onClick={() => handleStepClick(index)}
          >
            <Image
              src={index <= currentStep ? step.completedImage : step.image}
              alt={step.name}
              width={26}
              height={26}
              className="block cursor-pointer"
            />
            <p
              className={`ml-0.5 mb-0 text-sm md:text-base lg:text-lg font-medium cursor-pointer ${
                index === currentStep ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {step.name}
            </p>
            {index < steps.length - 1 && (
              <span className="hidden xl:block border-[#6B84FE] border-2 w-24 ml-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
