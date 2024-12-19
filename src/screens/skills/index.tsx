import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Wrapper1 from "@/components/Wrapper";
import StepForm from "@/components/StepForm";
import Button from "@/components/Button";
import ReactStars from "react-rating-stars-component";
import { useSession } from "next-auth/react";
import axios from "axios";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import ProgressBar from "@ramonak/react-progress-bar";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaUpDownLeftRight } from "react-icons/fa6";
import TemplateManagement from "@/components/TemplateManagement";
import { FaEdit, FaPlus } from "react-icons/fa";
import InputField from "@/components/InputField";

interface StarItem {
  id: number;
  title: string;
  rating: number;
}

const SortableItem = ({
  index,
  item,
  handleRatingChange,
  handleDelete,
  handleEdit,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: index.toString(),
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex flex-col items-stretch"
    >
      <div className="flex justify-between items-center mb-2">
        <ReactStars
          key={item.id}
          count={5}
          value={item.rating || 0} // Ensure undefined ratings are displayed as 0
          onChange={(newRating: any) => handleRatingChange(item.id, newRating)}
          size={24}
          activeColor="#6B84FE"
          emptyIcon={<i className="far fa-star"></i>}
        />
        <div className="flex gap-2">
          <div
            className="cursor-grab flex items-center justify-center"
            {...listeners}
            tabIndex={0}
            role="button"
            aria-label="Drag handle"
          >
            <FaUpDownLeftRight size={20} />
          </div>
          <Image
            onClick={() => handleDelete(index)}
            className="cursor-pointer"
            src="/images/svgs/fluent_delete-24-regular.svg"
            alt="del"
            height={16}
            width={16}
          />
          <Button
            className="flex items-center gap-1 text-blue-500"
            onClick={() => handleEdit(item)}
          >
            <Image
              src="/images/svgs/edit-icon.svg"
              alt="..."
              height={18}
              width={18}
            />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 rounded-lg border border-gray-300">
        <div className="text-left">
          <span className="font-medium text-[#666666] text-sm">
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [starItems, setStarItems] = useState<StarItem[]>([]);
  const [tips, setTips] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [resumeData, setResumeData] = useState<any>(null);
  const [loadingSection, setLoadingSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status }: any = useSession(); // Access session data
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cvInfo, setCvInfo] = useState<any>(null);
  const [showModal, setShowModalView] = useState(false);
  const [templateKey, setTemplateKey] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const [skills, setSkills] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over?.id);

      setStarItems((prev) => {
        const updatedItems = [...prev];
        const [movedItem] = updatedItems.splice(oldIndex, 1);
        updatedItems.splice(newIndex, 0, movedItem);
        return updatedItems;
      });
    }
  };

  const closeModal = () => {
    localStorage.setItem("youmayknowmodal-skills", "1");
    setModalOpen(false);
  };

  useEffect(() => {
    const data: any = localStorage.getItem("tips");
    if (data && tips.length == 0) {
      setTips(JSON.parse(data)); // Parse the JSON string back to an object
    }
  }, [tips]);

  const toggleStatus = (index: number) => {
    skills.map((skill: any, i) => {
      if (i === index) {
        if (skill) {
          const newItem = {
            id: Date.now(), // Use timestamp for unique ID
            title: skill.title,
            rating: 0, // Explicitly set to 0
          };

          setStarItems((prevItems) => {
            if (prevItems.some((item) => item.title === newItem.title)) {
              toast.error("Already Added");
              return prevItems;
            }
            return [newItem, ...prevItems];
          });
        }
      }
    });
  };

  useEffect(() => {
    let data: any = localStorage.getItem("resumeData");
    data = JSON.parse(data);
    if (data) {
      setResumeData(data);
      const skillsWithRatings = (data?.data?.skill?.data || []).map(
        (skill: any) => ({
          ...skill,
          rating: skill.rating || 0,
        })
      );
      setStarItems(skillsWithRatings);
    }
    let modalStatus =
      localStorage.getItem("youmayknowmodal-skills") == "1" ? false : true;
    setModalOpen(modalStatus);
  }, []);

  useEffect(() => {
    if (resumeData) updateSkills();
  }, [starItems]);
  useEffect(() => {
    if (resumeData) {
      if (searchTerm?.length === 0) {
        setSearchTerm(resumeData.data.heading?.profession);
        handleSearch();
      }
    }
  }, [resumeData]);

  const calculateProgress = (data: any) => {
    // Define the sections and their weights
    const sections = {
      personalInfo: 20, // Personal information (Name, Address, etc.)
      summary: 15, // Summary/Objective statement
      education: 25, // Education (Institutes, Degrees, etc.)
      workExperience: 25, // WorkExperience (Companies, Roles, etc.)
      skills: 15, // Skills
    };

    let score = 0;
    let totalWeight = 100;

    const cvData = data.data;

    // Check if each section is completed and add the corresponding weight to the score
    if (
      cvData.heading &&
      cvData?.heading?.firstName &&
      cvData?.heading?.lastName &&
      cvData?.heading?.email
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
    // if (cvData.certification && cvData.certification.length > 0) {
    //  score += sections.certification;
    // }
    // if (cvData.languages && cvData.languages.length > 0) {
    //  score += sections.languages;
    // }

    // Calculate the percentage progress
    return (score / totalWeight) * 100;
  };

  const updateSkills = () => {
    const data = {
      ...resumeData,
      data: {
        ...resumeData.data,
        skill: {
          ...resumeData.data.skill,
          data: starItems,
        },
      },
    };
    const progress = calculateProgress(data);
    const updatedResumeData = {
      ...resumeData,
      progress: progress,
      data: {
        ...resumeData.data,
        skill: {
          ...resumeData.data.skill,
          data: starItems,
        },
      },
    };
    setResumeData(updatedResumeData);
  };

  const handleRatingChange = (id: number, newRating: number) => {
    setStarItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        rating: item.id === id ? newRating : item.rating,
      }))
    );
  };

  const handleDelete = (index: number) => {
    setStarItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    try {
      setLoadingSection(true);

      const token = session.token; // Access token from user object
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/skills`,
        {
          params: {
            keyword: searchTerm,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSkills(response.data.result);
      setLoadingSection(false);
    } catch (error) {
      setLoadingSection(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const token = session.token; // Access token from user object
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
      router.push("/summary");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDropdownOpen(false);
  };

  const hanldeRoute = () => {
    router.push("/education");
  };

  // Define the key down handler
  // const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault(); // Prevent form submission
  //     handleSearch(); // Call the search function
  //   }
  // };

  const handleEyeIconClick = () => {
    setShowModalView(true);
  };
  const closeModall = () => {
    setShowModalView(false); // This function should set your modal state to `false`
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

  const [openAddModal, setOpenAddModal] = useState(false);
  const [formData, setFormData] = useState({
    skills: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (!subscriptionData && starItems.length >= 3) {
      toast.error(
        "You can only add up to 3 skills without an active subscription."
      );
      setOpenAddModal(false);
      return;
    }

    if (formData.skills.trim()) {
      const newItem = {
        id: Date.now(), // Use timestamp for unique ID
        title: formData.skills.trim(),
        rating: 0, // Explicitly set to 0
      };

      setStarItems((prevItems) => {
        if (
          prevItems.some(
            (item) => item.title.toLowerCase() === newItem.title.toLowerCase()
          )
        ) {
          toast.error("Already Added");
          return prevItems;
        }
        return [newItem, ...prevItems];
      });

      setFormData({ skills: "" });
      setOpenAddModal(false);
    }
  };

  useEffect(() => {
    {
    }
  }, [starItems]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StarItem | null>(null);

  // Handle edit click
  const handleEdit = (item: any, index: any) => {
    setGloalIndex(index);
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  // Save the edited item
  const handleSave = (newName: string) => {
    setStarItems((prevItems) => {
      const updatedItems = [...prevItems]; // Create a copy of the array
      if (globalIndex || globalIndex === 0) {
        updatedItems[globalIndex] = {
          ...updatedItems[globalIndex],
          title: newName,
        };
      }
      return updatedItems;
    });
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const [globalIndex, setGloalIndex] = useState<number>();
  return (
    <>
      <Loader loading={loading} />
      {tips && (
        <div className="flex w-full">
          <Wrapper1>
            <div className="bg-[#F3F3F3] h-[calc(100vh-65px)] overflow-auto">
              <div className="m-[24px]">
                <StepForm stepNumber={2} />
              </div>
              <div className="flex gap-4 m-[24px]">
                <form
                  onSubmit={handleSubmit}
                  className="w-full grid grid-cols-1 md:grid-cols-1"
                >
                  <div className="w-full bg-white rounded-xl mb-4">
                    <div className="w-full p-5 pb-5 col-span-2">
                      <div className="mb-6 flex justify-between items-center">
                        <div>
                          {tips.length !== 0 && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: tips[3].header,
                              }}
                              className="flex-1"
                            />
                          )}
                        </div>

                        <div
                          className="ml-auto flex items-center space-x-4 relative"
                          ref={dropdownRef}
                        >
                          {tips.length !== 0 && tips[3].tips && (
                            <>
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
                                        __html: tips[3].tips,
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Modal View */}
                      {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
                          <div className="bg-white modal-newspaper rounded-lg p-10 w-11/12 md:w-3/4 lg:w-1/2 relative">
                            <button
                              onClick={closeModall} // Ensure 'closeModal' is the correct function name
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

                      {openAddModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
                          <div className="bg-white modal-newspaper rounded-lg p-10 w-11/12 md:w-3/4 lg:w-1/2 relative">
                            <button
                              onClick={() => setOpenAddModal(false)}
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

                            <div className="w-full max-w-4xl">
                              <span className="text-3xl font-semibold">
                                Add Skills
                              </span>
                            </div>
                            <div>
                              <InputField
                                label=""
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="Add new Skills"
                              />
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button
                                onClick={handleAddSkill}
                                className="bg-[#6B84FE] text-white rounded-md h-[40px] px-6"
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      {!loading && (
                        <div className="bg-[#F9F9F9] p-4 rounded-lg mt-5">
                          <div className="">
                            <div
                              className={`grid gap-4 grid-cols-1" md:grid-cols-2`}
                            >
                              {/* {subscriptionData && ( */}
                              <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-[60vh] overflow-auto relative">
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
                                        Subscribe to unlock our powerful job
                                        search feature and access pre-written
                                        examples.
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <div className="rounded-lg">
                                  <label className="block text-base font-medium mb-2">
                                    Search By Job Title For Pre-Written Examples
                                    {/* {"11 "} */} {searchTerm}
                                  </label>

                                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                                    <input
                                      name="degree"
                                      placeholder="Title, Industry, Keyword"
                                      value={searchTerm}
                                      onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault();
                                        }
                                      }}
                                      // onKeyDown={handleKeyDown} // Added handler here
                                      disabled={!subscriptionData}
                                      className="w-full px-4 py-[.4rem] h-[40px] text-sm border outline-none border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent mb-4 lg:mb-0"
                                    />
                                    <button
                                      type="button"
                                      className="bg-[#6B84FE] text-white rounded-md  h-[40px] w-[40px] justify-center items-center flex hover:underline cursor-pointer"
                                      disabled={!subscriptionData}
                                      onClick={() => handleSearch()}
                                    >
                                      <AiOutlineSearch className="text-lg" />
                                    </button>
                                  </div>
                                </div>
                                <div className="relative">
                                  <p className="font-semibold text-xl mb-5">
                                    Search Results for keyword
                                    {`"${searchTerm}"`}
                                  </p>
                                  {loadingSection ? (
                                    <div className="absolute inset-0 flex justify-center items-center bg-white/50 backdrop-blur-sm rounded-lg z-10">
                                      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mt-[150px]"></div>
                                    </div>
                                  ) : (
                                    subscriptionData && (
                                      <>
                                        {skills.map((item: any, index) => (
                                          <div
                                            onClick={() => toggleStatus(index)}
                                            key={index}
                                            className={`border rounded-3xl p-2 w-full flex items-center space-x-2 cursor-pointer mb-2`}
                                          >
                                            <span className="flex-1">
                                              {item.title}
                                              {item.rating}
                                            </span>
                                          </div>
                                        ))}
                                      </>
                                    )
                                  )}
                                </div>
                              </div>
                              {/* )} */}
                              <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-[60vh] overflow-auto">
                                <div className="flex justify-end">
                                  <button
                                    type="button"
                                    className="w-[100px] bg-blue-500 py-1 px-2 text-sm rounded-lg text-white cursor-pointer"
                                    onClick={() => setOpenAddModal(true)}
                                  >
                                    Add Skills
                                  </button>
                                </div>

                                <DndContext
                                  sensors={sensors}
                                  collisionDetection={closestCenter}
                                  onDragEnd={handleDragEnd}
                                >
                                  <SortableContext
                                    items={starItems.map((_, index) =>
                                      index.toString()
                                    )}
                                    strategy={verticalListSortingStrategy}
                                  >
                                    {starItems.map((item, index) => (
                                      <SortableItem
                                        key={item.id}
                                        index={index}
                                        item={item}
                                        handleRatingChange={handleRatingChange}
                                        handleDelete={handleDelete}
                                        // edit yaha call hoga
                                        handleEdit={() =>
                                          handleEdit(item, index)
                                        }
                                      />
                                    ))}
                                  </SortableContext>
                                </DndContext>
                              </div>
                            </div>
                            {isEditModalOpen && selectedItem && (
                              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
                                <div className="bg-white p-6 rounded-lg w-[500px] flex flex-col">
                                  <h2>Edit Item</h2>
                                  <input
                                    type="text"
                                    value={selectedItem.title || ""}
                                    onChange={(e) =>
                                      setSelectedItem((prev) =>
                                        prev
                                          ? { ...prev, title: e.target.value }
                                          : null
                                      )
                                    }
                                    className="border p-2 rounded w-full"
                                  />
                                  <div className="flex justify-end gap-2 mt-4">
                                    <button
                                      onClick={() => setIsEditModalOpen(false)}
                                      className="px-4 py-2 bg-gray-200 rounded"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                        selectedItem &&
                                        handleSave(selectedItem.title)
                                      }
                                      className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 col-span-2">
                      {/* Commented out Tabs component */}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between  gap-4 col-span-2">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button
                        onClick={hanldeRoute}
                        className="h-12 bg-transparent border border-[#666666] text-[#666666] hover:bg-[#666666] hover:text-white px-14 rounded-lg sm:w-full"
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
                        className="h-12 bg-transparent border border-[#6B84FE] text-[#6B84FE] hover:bg-[#6B84FE] hover:text-white px-14 rounded-lg"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </form>

                {/* <Asider /> */}
              </div>
            </div>
          </Wrapper1>
        </div>
      )}
      {tips.length !== 0 && (
        <Modal isOpen={modalOpen}>
          <div dangerouslySetInnerHTML={{ __html: tips[3].youNeedToKnow }} />
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

export default Skills;
