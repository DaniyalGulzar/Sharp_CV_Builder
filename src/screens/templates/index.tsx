import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import TemplateManagement from "@/components/TemplateManagement";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { FaEye } from "react-icons/fa";
import LinkedIn from "next-auth/providers/linkedin";
import MainNavbar from "@/components/MainNavbar";

const colors = [
  { code: "#666666", name: "Gray" },
  { code: "#888888", name: "Black" },
  { code: "#48C9B0", name: "Turquoise" },
  { code: "#FF1A51", name: "Red" },
  { code: "#739cdb", name: "Blue" },
  { code: "#26A378", name: "Green" },
  { code: "#6F5392", name: "RoyalPurple" },
  { code: "#799ACC", name: "BlueGray" },
  { code: "#359EBF", name: "BlueGreen" },
];

export default function TemplatesScreen() {
  // const [activeToggle, setActiveToggle] = useState("recommended");
  const [selectedColor, setSelectedColor] = useState(colors[0].code);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status }: any = useSession(); // Access session data
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleEyeIconClick = (template: any) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTemplate(null);
  };

  const getCvinfo = (template: any) => {
    if (template === "tempate a") {
      return [
        { id: "2", name: "ProfessionalTitle" },
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "6", name: "Certification" },
        { id: "8", name: "Software" },
        { id: "10", name: "Accomplishment" },
      ];
    } else if (template === "tempate d") {
      return [
        { id: "2", name: "ProfessionalTitle" },
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "5", name: "Skill" },
        { id: "6", name: "Certification" },
        { id: "8", name: "Software" },
      ];
    } else if (template === "tempate e") {
      return [
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "6", name: "Certification" },
        { id: "7", name: "Interest" },
        { id: "10", name: "Accomplishment" },
      ];
    } else if (template === "tempate f") {
      return [
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "6", name: "Certification" },
        { id: "7", name: "Interest" },
        { id: "10", name: "Accomplishment" },
      ];
    } else if (template === "tempate g") {
      return [
        { id: "2", name: "ProfessionalTitle" },
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "6", name: "Certification" },
        { id: "8", name: "Software" },
      ];
    } else if (template === "tempate i") {
      return [
        { id: "1", name: "Heading" },
        { id: "2", name: "ProfessionalTitle" },
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "5", name: "Skill" },
        { id: "6", name: "Certification" },
        { id: "7", name: "Interest" },
        { id: "8", name: "Software" },
        { id: "9", name: "Language" },
        { id: "10", name: "Accomplishment" },
        { id: "11", name: "Portfolio" },
      ];
    } else if (template === "tempate h") {
      return [
        { id: "1", name: "Heading" },
        { id: "2", name: "ProfessionalTitle" },
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "5", name: "Skill" },
        { id: "6", name: "Certification" },
        { id: "7", name: "Interest" },
        { id: "8", name: "Software" },
        { id: "9", name: "Language" },
        { id: "10", name: "Accomplishment" },
        { id: "11", name: "Portfolio" },
      ];
    } else if (template === "tempate b") {
      return [
        { id: "1", name: "Heading" },
        { id: "2", name: "ProfessionalTitle" },
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "5", name: "Skill" },
        { id: "6", name: "Certification" },
        { id: "7", name: "Interest" },
        { id: "8", name: "Software" },
        { id: "9", name: "Language" },
        { id: "10", name: "Accomplishment" },
        { id: "11", name: "Portfolio" },
      ];
    } else if (template === "tempate c") {
      return [
        { id: "1", name: "Heading" },
        { id: "2", name: "ProfessionalTitle" },
        { id: "3", name: "WorkExperience" },
        { id: "4", name: "Education" },
        { id: "5", name: "Skill" },
        { id: "6", name: "Certification" },
        { id: "7", name: "Interest" },
        { id: "8", name: "Software" },
        { id: "9", name: "Language" },
        { id: "10", name: "Accomplishment" },
        { id: "11", name: "Portfolio" },
      ];
    }
  };

  const handleColorClick = (color: any) => {
    setSelectedColor(color.code);
    selectColor(color);
  };

  const resumeData = {
    result: {
      settings: {
        fontStyle: "",
        fontSize: "",
        lineSpacing: "",
        paragraphSpacing: "",
        sideMargin: "",
        color: "Red",
      },
      data: {
        summary: {
          value:
            "Experienced distribution manager with a proven track record in optimizing supply chain operations. Skilled in inventory management, logistics coordination, and ensuring timely deliveries. Strong leadership abilities, effective problem-solving skills, and a commitment to maximizing efficiency and customer satisfaction. I am highly proficient in financial analysis, forecasting, and budgeting. Experienced in managing accounts payable/receivable, using QuickBooks and Excel. Skilled in financial reporting and resolving discrepancies. Strong communication skills, collaborative team player, and adept at multitasking to meet deadlines.",
          postion: "",
          order: 0,
        },
        education: {
          data: [
            {
              schoolName: "University of California",
              degree: "Master of Commerce",
              fieldOfStudy: "Commerce",
              startMonth: "01",
              startYear: "2018",
              endMonth: "12",
              endYear: "2021",
              location1: "Boston",
            },
            {
              schoolName: "University of the South Wales",
              degree: "Bachelor of Commerce",
              fieldOfStudy: "Commerce",
              startMonth: "01",
              startYear: "2011",
              endMonth: "12",
              endYear: "2021",
              location1: "Wales",
            },
          ],
          postion: "",
          order: 0,
        },
        certificate: {
          data: [
            {
              name: "Web Developmemt",
              startDate: "2023-01-01",
              endDate: "2023-06-30",
            },
            {
              name: "AWS",
              startDate: "2024-01-01",
              endDate: "2024-03-30",
            },
          ],
          position: "",
          order: 0,
        },

        interest: {
          data: ["Cricket", "Travelling", "Reading"],
          postion: "",
          order: 0,
        },

        skill: {
          data: [
            {
              title: "JavaScript",
              rating: 5,
            },
            {
              title: "React",
              rating: 4,
            },
            {
              title: "TypeScript",
              rating: 3,
            },
          ],
        },
        software: {
          data: ["Vs Code", "Dev C++", "Sublime Text 2"],
          postion: "",
          order: 0,
        },

        language: {
          data: [
            { language: "English", level: "Fluent" },
            { language: "Dutch", level: "Native" },
            { language: "Urdu", level: "Native" },
          ],
          position: "",
          order: 0,
        },
        portfolio: {
          data: [
            {
              name: "Daniel profile",
              portfolio: "https://zippy-treacle-412fcc1.netlify.app",
            },
            {
              name: "Chris profile",
              portfolio: "https://zippy-treacle-415fcc1.netlify.app",
            },
          ],
          postion: "",
          order: 0,
        },
        accomplishment: {
          data: ["Rising Star", "Best Volunteer", "Employee of the month"],
          postion: "",
          order: 0,
        },
        workHistory: {
          data: [
            {
              jobTitle: "Distribution Manager",
              employer: "Hailey Traders",
              location: "Boston",
              startMonth: "01",
              startYear: "2018",
              endMonth: "12",
              endYear: "2021",
              isCurrent: false,
              description:
                "Distribution Manager at Hailey Traders including accounts, finance, warehouse management, staff management.",
            },
            {
              jobTitle: "Distribution Manager",
              employer: "IOT Pvt Ltd",
              location: "Texas",
              startMonth: "01",
              startYear: "2016",
              endMonth: "12",
              endYear: "2018",
              isCurrent: false,
              description: "",
            },
          ],
          postion: "",
          order: 0,
        },
        heading: {
          firstName: "Micheal",
          lastName: "John",
          profession: "Account Manager",
          city: "California",
          postalCode: "054810",
          country: "USA",
          phone: "+18123511589",
          email: "michealjohn@gmail.com",
          linkedin: "htttp.michealjohn06",
        },
      },
      title: "Resume_Micheal attendee_2024-09-06",
      progress: 0,
      user: "66c71eaeef1809b41eadd784",
      template: "66c71fbbef1809b41eadd795",
      _id: "66dad453fb3ab8f489cce0ad",
      createdAt: "2024-09-06T10:07:15.957Z",
      updatedAt: "2024-09-06T10:07:15.957Z",
      __v: 0,
    },
    message: "Request Successful",
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("color");
    if (savedColor) {
      setSelectedColor(JSON.parse(savedColor)); // Parse the saved color if stored as JSON
    }
  }, []);

  useEffect(() => {
    if (!session) return; // Early return if session is not available

    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const token = session.token; // Access token from user object
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/template`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTemplates(response.data.result);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [session]);

  const selectColor = (color: any) => {
    setSelectedColor(color.code);
  };

  const handleNext = (template: any) => {
    localStorage.setItem("template", JSON.stringify(template));
    localStorage.setItem("color", JSON.stringify(selectedColor));
    router.push("/experience1");
  };

  const [selectedExperience, setSelectedExperience] = useState("");

  useEffect(() => {
    const experience = localStorage.getItem("selectedExperience");
    if (experience) {
      setSelectedExperience(experience);
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";

      const preventScroll = (e: Event) => {
        if (showModal) {
          e.preventDefault();
        }
      };

      document.body.addEventListener("wheel", preventScroll, {
        passive: false,
      });
      document.body.addEventListener("touchmove", preventScroll, {
        passive: false,
      });

      return () => {
        document.body.style.overflow = "unset";
        document.body.removeEventListener("wheel", preventScroll);
        document.body.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [showModal]);

  return (
    <>
      <Loader loading={loading} />
      <div className="w-full bg-auth">
        {status === "authenticated" ? (
          <Navbar welcomeText="" showNavItems={true} showRight={true} />
        ) : (
          <MainNavbar />
        )}
        <div className="rounded w-full py-5 px-4 md:px-10">
          <span className="text-xl md:text-2xl text-0F172A font-semibold flex justify-center">
            Choose from our best templates for {selectedExperience} of
            experience
          </span>
          <span className="text-sm md:text-base text-555370 font-normal flex justify-center mt-2 md:mt-4">
            You can always change your template later.
          </span>

          <div className="w-full flex flex-col md:flex-row justify-between mt-6 md:mt-8">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <Button
                onClick={() => router.push("/experience")}
                className="h-8 bg-transparent border hover:bg-[#666666] hover:text-white border-666666 text-666666 px-10 rounded-lg "
              >
                Back
              </Button>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="cursor-pointer text-base md:text-md font-medium flex text-1E293B">
                Colors &nbsp;
                {colors.map((color) => (
                  <span
                    key={color.code}
                    className={`h-[20px] w-[20px] md:h-[26px] md:w-[26px] border-sm rounded-full border mr-1
              ${selectedColor === color.code ? "ring-2 ring-blue-500" : ""}`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorClick(color)}
                  ></span>
                ))}
              </span>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
            {templates.length > 0 ? (
              templates.map((template, index) => (
                <div
                  className="relative flex flex-col cursor-pointer group"
                  key={index}
                >
                  {/* Hover overlay with eye icon */}
                  <div
                    className="absolute h-[650px] inset-0 z-10 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition duration-300"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent the click from triggering parent events
                      handleEyeIconClick(template);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <FaEye />
                    </svg>
                  </div>

                  {/* Template card */}
                  <div className="bg-white shadow-lg relative z-0 overflow-hidden">
                    <TemplateManagement
                      name={template.title}
                      bgColor={`${selectedColor}`}
                      resumeData={resumeData.result}
                      cvInfo={getCvinfo(template.title)}
                      height={"650px"}
                      width={"100%"}
                      tag="html"
                    />
                  </div>

                  {/* Choose Template Button */}
                  <Button
                    className="mt-4 py-2 text-sm md:text-base font-semibold rounded-lg h-[50px] md:h-[60px] text-666666 border border-inherit hover:bg-[#6B84FE] hover:text-white w-full !hover:bg-[#6B84FE] !hover:text-white"
                    onClick={() => handleNext(template)}
                  >
                    Choose Template
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No templates available.
              </p>
            )}
            {showModal && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
              >
                <div
                  className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-[85vh] max-h-screen relative overflow-y-auto shadow-lg"
                  onWheel={(e) => {
                    const target = e.currentTarget;
                    const isAtTop = target.scrollTop === 0;
                    const isAtBottom =
                      target.scrollHeight - target.scrollTop ===
                      target.clientHeight;

                    if (isAtTop || isAtBottom) {
                      e.preventDefault();
                    }
                  }}
                >
                  <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                    aria-label="Close modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Adjust inner container */}
                  <div className="pt-10 mb-5 flex justify-center items-start h-full">
                    {selectedTemplate && (
                      <TemplateManagement
                        name={selectedTemplate.title}
                        bgColor={selectedColor}
                        resumeData={resumeData.result}
                        cvInfo={getCvinfo(selectedTemplate.title)}
                        height="90%"
                        width="100%"
                        tag="html"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
