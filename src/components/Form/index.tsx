import { useEffect, useRef, useState } from "react";
import InputField from "../InputField";
import Image from "next/image";
import Button from "../Button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import ProgressBar from "@ramonak/react-progress-bar";
import TemplateManagement from "../TemplateManagement";

export default function CustomForm() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [tips, setTips] = useState<any>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [cvInfo, setCvInfo] = useState<any>(null);
  const [templateKey, setTemplateKey] = useState(0);

  const resume_email = session.user.resume_email;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    email: resume_email,
    linkedin: "",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;

    let formattedValue = value;
    if (type === "text") {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let formattedValue = value;
    setFormData({ ...formData, [name]: formattedValue });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let data: any = localStorage.getItem("resumeData");

    data = JSON.parse(data);
    if (data) {
      setResumeData(data);
      if (data?.data?.heading) {
        const heading = data?.data?.heading;
        setFormData(data?.data?.heading);
      }
    }
  }, []);

  useEffect(() => {
    const data: any = localStorage.getItem("tips");
    if (data && tips.length == 0) {
      setTips(JSON.parse(data));
    }
  }, [tips]);

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
      cvData?.heading?.email &&
      cvData?.heading?.phone &&
      cvData?.heading?.country
    ) {
      score += sections.personalInfo;
    }
    if (cvData?.summary && cvData?.summary?.value) {
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

  const updateHeading = () => {
    const data = {
      ...resumeData,
      data: {
        ...resumeData?.data,
        heading: formData,
      },
    };
    const progress = calculateProgress(data);
    setResumeData((prevData: any) => ({
      ...prevData,
      progress: progress,
      data: {
        ...prevData.data,
        heading: formData,
      },
    }));
  };

  useEffect(() => {
    updateHeading();
  }, [formData]);

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
      router.push("/history");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEyeIconClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
          { id: "1", name: "PersonalInfo" },
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
          { id: "1", name: "PersonalInfo" },
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
          { id: "1", name: "PersonalInfo" },
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
          { id: "1", name: "PersonalInfo" },
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

  return (
    <>
      <Loader loading={loading} />
      {tips && (
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="w-full p-6 pb-6 bg-white rounded-xl col-span-2">
            <div className="mb-6 flex justify-between">
              <div>
                {tips.length !== 0 && (
                  <div dangerouslySetInnerHTML={{ __html: tips[0].header }} />
                )}
              </div>
              {tips.length !== 0 && tips[0].tips ? (
                <div className="relative" ref={dropdownRef}>
                  <Image
                    src="/images/svgs/bulb.svg"
                    alt="Skill Highlight"
                    width={55}
                    height={21}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="cursor-pointer"
                  />

                  {dropdownOpen && (
                    <div className="absolute right-0 p-4 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
                      <div className="text-xl font-bold">Tips</div>
                      <button
                        type="button"
                        className="flex items-center p-2 text-red-500 hover:text-red-700 w-full"
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: tips[0].tips }}
                        />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button onClick={handleEyeIconClick}>
                    <Image
                      src="/images/pngs/eye.png"
                      width={30}
                      height={30}
                      className="mb-8"
                      alt="eye"
                    />
                  </Button>
                  {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                      <div className="bg-white modal-newspaper rounded-lg p-10 w-11/12 md:w-3/4 lg:w-1/2 relative">
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

                        {/* Content of the modal */}
                        <div className="overflow-hidden w-full max-w-4xl">
                          {cvInfo ? (
                            <TemplateManagement
                              key={templateKey}
                              name={resumeData.template.title}
                              // name={"tempate g"}
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
                </>
              )}
            </div>

            {/* <div className="flex justify-between rounded-lg w-[225px] h-[80px] mt-2">
              <div className="w-[80px] h-[80px] bg-gray-100 flex items-center justify-center rounded-lg mr-4">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="h-full w-full rounded-lg"
                  />
                ) : (
                  <Image
                    src="/user.svg"
                    alt="Upload"
                    width={28}
                    height={28}
                    className="h-6 w-6"
                  />
                )}
              </div>
              <div className="flex items-end">
                <Button
                  iconSrc="/upload.svg"
                  iconAlt="Upload Icon"
                  iconSize={16}
                  onClick={handleUploadClick}
                  className="text-black-200"
                >
                  Upload Photo
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div> */}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1">
                <InputField
                  label="First Name"
                  name="firstName"
                  required={true}
                  value={formData.firstName}
                  placeholder="Enter your first name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-1">
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Enter your last name"
                  required={true}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-1">
                <InputField
                  label="Profession"
                  name="profession"
                  required={true}
                  value={formData.profession}
                  placeholder="Enter your profession"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-1">
                <InputField
                  label="City"
                  required={true}
                  name="city"
                  value={formData.city}
                  placeholder="Enter your city"
                  onChange={handleInputChange}
                />
              </div>

              {/* Postal Code */}
              <div className="col-span-1">
                <InputField
                  label="Postal Code"
                  name="postalCode"
                  required={true}
                  value={formData.postalCode}
                  placeholder="Enter your postal code"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-1">
                <InputField
                  label="Country"
                  name="country"
                  required={true}
                  value={formData.country}
                  placeholder="Enter your country"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-1">
                <InputField
                  type="number"
                  label="Phone"
                  name="phone"
                  required={true}
                  value={formData.phone}
                  placeholder="Enter your phone number"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-1">
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  required={true}
                  disabled={true}
                  value={formData.email}
                  placeholder="Enter your email address"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-2">
                <InputField
                  label="LinkedIn"
                  type="text"
                  name="linkedin"
                  required={false}
                  value={formData.linkedin}
                  placeholder="Enter your Linkedin"
                  onChange={handleInputChange1}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between  gap-2 col-span-2">
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => router.push("/dashboard")}
                className="h-12 bg-transparent border border-666666 hover:bg-[#666666] hover:text-white text-666666 px-14 rounded-xl"
              >
                Back
              </Button>
            </div>
            <div className="w-full lg:w-[250px] md:w-[250px] mt-2 text-center">
              <ProgressBar
                completed={resumeData?.progress || 0}
                bgColor="#6B84FE"
                labelAlignment="center"
              />
              <span className="text-base text-[#666] font-semibold pt-2">
                Resume Completeness
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                type="submit"
                className="h-12 bg-transparent border border-[#6B84FE] hover:bg-[#6B84FE] hover:text-white text-[#6B84FE] px-14 rounded-xl"
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
