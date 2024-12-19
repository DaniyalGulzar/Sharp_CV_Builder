import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Wrapper1 from "@/components/Wrapper";
import StepForm from "@/components/StepForm";
import Button from "@/components/Button";

import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import ProgressBar from "@ramonak/react-progress-bar";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TemplateManagement from "@/components/TemplateManagement";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

const Summary = () => {
  const [editorContent, setEditorContent] = useState("");
  const [resumeData, setResumeData] = useState<any>(null);
  const [tips, setTips] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [loadingSection, setLoadingSection] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cvInfo, setCvInfo] = useState<any>(null);
  const [showModal, setShowModalView] = useState(false);
  const [templateKey, setTemplateKey] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const { data: session, status }: any = useSession(); // Access session data
  const router = useRouter();

  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    let data: any = localStorage.getItem("resumeData");
    data = JSON.parse(data);
    if (data) {
      setResumeData(data);
      setEditorContent(data?.data?.summary?.value || "");
    }
  }, []);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const data: any = localStorage.getItem("tips");
    if (data && tips.length==0) {
      setTips(JSON.parse(data)); // Parse the JSON string back to an object
    }
  }, [tips]);

  function stripHtml(html: any) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleSearch(); // Call the search function
    }
  };

  const calculateProgress = (data: any) => {
    const sections = {
      personalInfo: 20,
      summary: 15,
      education: 25,
      workExperience: 25,
      skills: 15,
    };

    let score = 0;
    let totalWeight = 100;

    const cvData = data.data;

    if (
      cvData.heading &&
      cvData?.heading?.firstName &&
      cvData?.heading?.lastName &&
      cvData?.heading?.email
    ) {
      score += sections.personalInfo;
    }

    if (cvData?.summary && stripHtml(cvData.summary.value) != "") {
      score += sections.summary;
    }
    if (cvData?.education && cvData?.education?.data?.length > 0) {
      score += sections.education;
    }
    if (cvData?.workHistory && cvData?.workHistory?.data?.length > 0) {
      score += sections.workExperience;
    }
    if (cvData?.skill && cvData?.skill?.data?.length > 0) {
      score += sections.skills;
    }
    return (score / totalWeight) * 100;
  };
  const updateSummary = () => {
    const data = {
      ...resumeData,
      data: {
        ...resumeData.data,
        summary: {
          ...resumeData.data.summary,
          value: editorContent,
        },
      },
    };
    const progress = calculateProgress(data);
    const updatedResumeData = {
      ...resumeData,
      progress: progress,
      data: {
        ...resumeData.data,
        summary: {
          ...resumeData.data.summary,
          value: editorContent,
        },
      },
    };
    setResumeData(updatedResumeData);
  };

  useEffect(() => {
    if (resumeData) updateSummary();
  }, [editorContent]);

  useEffect(() => {
    if (resumeData) {
      setSearchTerm(resumeData.data.heading?.profession);
      handleSearch;
    }
  }, [resumeData]);

  const handleToggle = (index: number) => {
    setEditorContent(
      (prevContent) => `${prevContent}${items[index].description}`
    );
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/${resumeData._id}`,
        resumeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      router.push("/final");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDropdownOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    setLoadingSection(true);
    try {
      const token = session.token; // Access token from user object
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/summary`,
        {
          params: {
            keyword: searchTerm,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(response.data.result);
      setLoadingSection(false);
    } catch (error) {
      setLoadingSection(false);
    }
  };

  const hanldeRoute = () => {
    router.push("/skills");
  };

  const handleEyeIconClick = () => {
    setShowModalView(true);
  };
  const closeModalll = () => {
    setShowModalView(false);
  };

  useEffect(() => {
    if (resumeData) {
      if (resumeData.template.title === "tempate a") {
        setCvInfo([
          { id: "2", name: "ProfessionalTitle" },
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "6", name: "Certification" },
          { id: "8", name: "Software" },
          { id: "10", name: "Accomplishment" },
        ]);
      } else if (resumeData.template.title === "tempate d") {
        setCvInfo([
          { id: "2", name: "ProfessionalTitle" },
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "5", name: "Skill" },
          { id: "6", name: "Certification" },
          { id: "8", name: "Software" },
        ]);
      } else if (resumeData.template.title === "tempate e") {
        setCvInfo([
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "6", name: "Certification" },
          { id: "7", name: "Interest" },
          { id: "10", name: "Accomplishment" },
        ]);
      } else if (resumeData.template.title === "tempate f") {
        setCvInfo([
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "6", name: "Certification" },
          { id: "7", name: "Interest" },
          { id: "10", name: "Accomplishment" },
        ]);
      } else if (resumeData.template.title === "tempate g") {
        setCvInfo([
          { id: "2", name: "ProfessionalTitle" },
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "6", name: "Certification" },
          { id: "8", name: "Software" },
        ]);
      } else if (resumeData.template.title === "tempate i") {
        setCvInfo([
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
        ]);
      } else if (resumeData.template.title === "tempate h") {
        setCvInfo([
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
        ]);
      } else if (resumeData.template.title === "tempate b") {
        setCvInfo([
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
        ]);
      } else if (resumeData.template.title === "tempate c") {
        setCvInfo([
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
        ]);
      }
    }
  }, [resumeData]);

  const fetchUserSubscriptionStatus = async () => {
    if (!session) return;
    try {
      setLoading(true);
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/show/${session.user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubscriptionData(response.data.result.subscription);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch subscription details.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserSubscriptionStatus();
    }
  }, [session]);

  return (
    <>
      <Loader loading={loading} />
      {tips && (
        <div className="flex w-full">
          <Wrapper1>
            <div className="bg-[#F3F3F3] h-[calc(100vh-65px)] overflow-auto">
              <div className="m-[24px]">
                <StepForm stepNumber={3} />
              </div>
              <div className="flex gap-4 m-[24px]">
                <div className="w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="w-full p-5 pb-6 bg-white rounded-xl col-span-2">
                      <div className="mb-6 flex justify-between items-center">
                        <div>
                        {tips.length !==0 && <div
                          dangerouslySetInnerHTML={{ __html: tips[4].header }}
                          className="flex-1"
                        />}
                        </div>
                        {tips.length !==0 && tips[4].tips ? (
                          <div
                            className="flex items-center space-x-4 relative"
                            ref={dropdownRef}
                          >
                            <Image
                              src="/images/svgs/bulb.svg"
                              alt="Skill Highlight"
                              width={55}
                              height={21}
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              className="cursor-pointer"
                            />
                            <Button onClick={handleEyeIconClick}>
                              <Image
                                src="/images/pngs/eye.png"
                                width={30}
                                height={30}
                                className="cursor-pointer"
                                alt="eye"
                              />
                            </Button>

                            {dropdownOpen && (
                              <div className="absolute right-4 mt-2 w-96 z-50">
                                <div className="relative p-4 bg-white border rounded-lg shadow-lg">
                                  <button
                                    type="button"
                                    onClick={handleClose}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                  >
                                    &times;
                                  </button>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: tips[4].tips,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>

                      {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                          <div className="bg-white modal-newspaper rounded-lg p-10 w-11/12 md:w-3/4 lg:w-1/2 relative">
                            <button
                              onClick={closeModalll} // Ensure 'closeModal' is the correct function name
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

                            {/* Content of the modal */}
                            <div className="overflow-hidden w-full max-w-4xl">
                              {cvInfo ? (
                                <TemplateManagement
                                  key={templateKey}
                                  name={resumeData.template.title}
                                  bgColor={resumeData.settings.color}
                                  resumeData={resumeData}
                                  cvInfo={cvInfo}
                                  height={"600px"}
                                  tag="html"
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                      {!loading && (
                        <div className="bg-[#F9F9F9] p-4 rounded-lg flex flex-col md:flex-row gap-4">
                          {/* Left box */}
                          <div className="bg-white p-4 rounded-lg w-full md:w-1/2 relative ">
                            {!subscriptionData && (
                              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex flex-col justify-center items-center z-[50]">
                                <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-[90%]">
                                  <div className="mb-4 p-3 bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
                                    <Lock className="w-6 h-6 text-gray-600" />
                                  </div>
                                  <h2 className="text-xl font-bold mb-2">
                                    Premium Feature
                                  </h2>
                                  <p className="text-gray-600 mb-4 text-sm">
                                    Subscribe to unlock our powerful job search
                                    feature and access pre-written examples.
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="rounded-lg mb-5">
                              <label className="block text-base font-medium mb-5">
                                Search By Job Title For Pre-Written Examples
                              </label>
                              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                                <input
                                  name="degree"
                                  placeholder="Title, Industry, Keyword"
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  onKeyDown={handleKeyDown} // Added handler here
                                  disabled={!subscriptionData}
                                  className="w-full px-4 py-[.4rem] h-[40px] text-sm border outline-none border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent mb-4 lg:mb-0"
                                />

                                <button
                                  type="button"
                                  className="bg-[#6B84FE] text-white rounded-md  h-[40px] w-[40px] justify-center items-center flex hover:underline cursor-pointer"
                                  disabled={!subscriptionData}
                                  onClick={handleSearch}
                                >
                                  <AiOutlineSearch className="text-lg" />
                                </button>
                              </div>
                            </div>
                            <div className="relative max-h-[300px] overflow-auto">
                              <p className="font-semibold text-xl mb-5">
                                Search Results for keyword {`"${searchTerm}"`}
                              </p>

                              {/* Loader */}
                              {loadingSection ? (
                                <div className="absolute inset-0 flex justify-center items-center bg-white/50 backdrop-blur-sm rounded-lg z-10">
                                  <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mt-[100px]"></div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex flex-col md:flex-row flex-wrap gap-4">
                                    {items.map((item: any, index: number) => (
                                      <div
                                        key={index}
                                        className="w-full border rounded-lg p-2 cursor-pointer flex items-center space-x-2"
                                        onClick={() => handleToggle(index)}
                                      >
                                        <span className="flex-1">
                                          {item.description}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Right box */}
                          <div className="bg-white p-4 rounded-lg w-full md:w-1/2">
                            <SunEditor
                              height="320px"
                              setOptions={{
                                buttonList: [
                                  ["bold", "underline", "italic"],
                                  ["fontSize"],
                                  ["align", "list", "lineHeight"],
                                ],
                              }}
                              setContents={editorContent}
                              onChange={handleEditorChange}
                              placeholder="Write your content here..."
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between  gap-4 col-span-2">
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button
                          onClick={hanldeRoute}
                          className="h-12 bg-transparent hover:bg-[#666666] hover:text-white border border-[#666666] text-[#666666] px-14 rounded-lg"
                        >
                          Back
                        </Button>
                      </div>
                      <div className="w-full lg:w-[250px] md:w-[250px] mt-2 text-center">
                        <ProgressBar
                          completed={resumeData?.progress}
                          bgColor="#6B84FE"
                          labelAlignment="center"
                        />
                        <span className="text-base text-[#666] font-semibold pt-2">
                          Resume Completeness
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* <Button className="h-12 bg-transparent border border-[#666666] text-[#666666] px-14 rounded-lg">
													Preview
												</Button> */}
                        <Button
                          type="submit"
                          className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* <div className="w-[340px] hidden sm:block">
              <Asider />
            </div> */}
              </div>
            </div>
          </Wrapper1>
        </div>
      )}
      {tips.length !==0 && tips && (
        <Modal isOpen={modalOpen}>
          <div dangerouslySetInnerHTML={{ __html: tips[4].youNeedToKnow }} />
          <div className="flex justify-end">
                <Button
                  onClick={closeModal}
                  className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
                >
                  Next
                </Button>
              </div>
        </Modal>
      )}
    </>
  );
};

export default Summary;
