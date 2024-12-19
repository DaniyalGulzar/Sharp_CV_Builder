import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MainNavbar from "@/components/MainNavbar";
import axios from "axios";
import Loader from "@/components/Loader";
interface Card {
  boldText: string;
  content: string;
  imageSrc: string;
  active: boolean;
}

const Experience1 = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
  const { data: session, status }: any = useSession(); // Access session data
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<any>({});
  const [color, setColor] = useState<any>({});
  const router = useRouter();

  const cards: Card[] = [
    {
      boldText: "Start with a New Resume",
      content:
        "Get step-by-step support with expert content suggestions at your fingertips!",
      imageSrc: "/greencard.svg",
      active: false,
    },
    {
      boldText: "Upload an existing Resume",
      content:
        "Edit your resume using expertly generated content in a fresh, new design",
      imageSrc: "/bluecard.svg",
      active: false,
    },
  ];

  useEffect(() => {
    let data: any = localStorage.getItem("template");
    data = JSON.parse(data);
    if (data) {
      setTemplate(data);
    }
  }, []);

  useEffect(() => {
    let data: any = localStorage.getItem("color");
    data = JSON.parse(data);
    if (data) {
      setColor(data);
    }
  }, []);

  const handleNextClick = async () => {
    setLoading(true);
    try {
      // Replace this with your API endpoint and data
      const token = session.token; // Access token from user object
      if (activeCardIndex === 0) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume`,
          {
            template: template._id,
            title: template.title,
            color: color,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.setItem(
            "resumeData",
            JSON.stringify(response.data.result)
          );
          router.push("/header");
        }
      } else {
        router.push("/upload");
      }
    } catch (error) {
      setLoading(false);
      // Handle error appropriately, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="w-full bg-auth">
      {status === "authenticated" ? <Navbar welcomeText="" showNavItems={true} showRight={true} /> : <MainNavbar/>}
        <div className="relative h-screen py-5 px-10">
          <span className="text-32px md:text-24px font-semibold text-0F172A flex justify-center mt-12">
            Are You Uploading An Existing Resume?
          </span>
          <span className="text-base md:text-sm font-normal text-555370 flex justify-center mt-4">
            Just review, edit and update it with new information
          </span>
          <div className="max-w-[1060px] mx-auto rounded-lg p-6 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`cursor-pointer`}
                  onClick={() => setActiveCardIndex(index)}
                >
                  <Card
                    boldText={card.boldText}
                    content={card.content}
                    imageSrc={card.imageSrc}
                    index={index}
                    activeIndex={activeCardIndex}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-6 gap-4 md:gap-0">
              <Button
                onClick={() => router.push("/templates")}
                className="h-12 bg-transparent hover:bg-[#666666] hover:text-white border border-666666 text-666666 px-14 rounded-lg"
              >
                Back
              </Button>
              <Button
                onClick={handleNextClick}
                disabled={activeCardIndex === -1}
                className={`h-12 px-14 rounded-lg ${
                  activeCardIndex === -1
                    ? "opacity-50 text-gray-500 border-gray-300 cursor-not-allowed"
                    : "bg-transparent hover:bg-[#6B84FE] hover:text-white border border-[#6B84FE] text-666666"
                }`}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience1;
