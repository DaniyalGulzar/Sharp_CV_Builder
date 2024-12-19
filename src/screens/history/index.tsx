import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Wrapper1 from "@/components/Wrapper";
import StepForm from "@/components/StepForm";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

import { useSession } from "next-auth/react";
import Modal from "@/components/Modal";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { AiOutlineSearch } from "react-icons/ai";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { FaPencil, FaUpDownLeftRight } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TemplateManagement from "@/components/TemplateManagement";
import { Lock } from "lucide-react";

interface Experience {
  jobTitle: string;
  employer: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  isCurrent: boolean;
  description: string | null;
}

interface SortableItemProps {
  experience: Experience;
  index: number;
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  openAddDescription: (index: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  experience,
  index,
  handleEdit,
  handleDelete,
  openAddDescription,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: index.toString(), // Ensure ID is a string
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-xl p-6 mb-5 bg-white border-[#dbeafe] shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {experience.jobTitle}, {experience.employer}
          </span>
          <div className="flex items-center space-x-4">
            <div {...listeners} {...attributes} className="cursor-grab pr-2">
              <FaUpDownLeftRight className="text-2xl text-gray-500" />
            </div>
            <FaPencil
              onClick={(e) => {
                e.stopPropagation(); // Prevent drag from overriding the click
                handleEdit(index);
              }}
              className="cursor-pointer hover:opacity-90 transition-opacity duration-300 text-2xl text-gray-500"
            />
            <Image
              onClick={(e) => {
                e.stopPropagation(); // Prevent drag from overriding the click
                handleDelete(index);
              }}
              className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
              src={"/images/svgs/fluent_delete-24-regular.svg"}
              alt="Delete"
              height={24}
              width={24}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>
            {experience.startMonth && experience.startYear
              ? `${experience.startMonth} ${experience.startYear} - ${
                  experience.isCurrent
                    ? "Present"
                    : `${experience.endMonth} ${experience.endYear}`
                }`
              : ""}
          </span>
        </div>
        <div>
          {experience.description ? (
            experience.description
              .split(".")
              .map(
                (item, index) =>
                  item.trim() && (
                    <span
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item.trim() }}
                    ></span>
                  )
              )
          ) : (
            <span>No description available</span>
          )}
        </div>

        {/* <div>
          {experience.description ? (
            <ul className="list-disc list-inside text-sm font-normal">
              {experience.description
                .split('.')
                .map((item, index) => (
                  item.trim() && (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item.trim() }} />
                  )
                ))}
            </ul>
          ) : (
            <span className="text-sm font-normal">No description available</span>
          )}
        </div> */}

        <span className="text-md font-medium mt-1 text-gray-600">
          {experience.location}
        </span>
        <div>
          {experience.description === null ? (
            <div>
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent drag from overriding the click
                  openAddDescription(index);
                }}
                className="text-blue-600 cursor-pointer"
              >
                Add Description
              </span>
            </div>
          ) : (
            <div>
              <span
                className="text-blue-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent drag from overriding the click
                  openAddDescription(index);
                }}
              >
                Edit Description
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function HistoryScreen() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(true);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [index, setIndex] = useState<number>();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpenDescription, setModalOpenDescription] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null); // State for the selected experience
  const [tips, setTips] = useState<any>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const { data: session, status }: any = useSession();
  const [loadingSection, setLoadingSection] = useState(false);
  const [cvInfo, setCvInfo] = useState<any>(null);
  const [showModalView, setShowModalView] = useState(false);
  const [templateKey, setTemplateKey] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const fetchUserSubscriptionStatus = async () => {
    if (!session) return;
    try {
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
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserSubscriptionStatus();
    }
  }, [session]);

  const [formData, setFormData] = useState({
    jobTitle: "",
    employer: "",
    location: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    isCurrent: false,
    description: null,
  });
  const [experiences, setExperiences] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeModal = () => setModalOpen(false);
  const closeModalDescription = () => {
    setModalOpenDescription(false);
  };
  const formCloseModal = () => setFormModalOpen(false);
  const editModalClose = () => {
    setEditModalOpen(false);
    setSelectedExperience(null);
    resetFormData();
  };

  const handleEyeIconClick = () => {
    setShowModalView(true);
  };
  const closeModall = () => {
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

  const resetFormData = () => {
    setFormData({
      jobTitle: "",
      employer: "",
      location: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      isCurrent: false,
      description: null,
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    setLoadingSection(true);
    try {
      const token = session.token; // Access token from user object
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/jobdescription`,
        {
          params: {
            keyword: searchTerm,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(response.data.result); // Handle the response as needed
      setLoadingSection(false);
    } catch (error) {
      setLoadingSection(false);
    }
  };

  const [items, setItems] = useState<any>([]);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let formattedValue = value;

    if (type === "text") {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    const updatedFormData = {
      ...formData,
      [name]: formattedValue,
    };

    const getMonthNumber = (monthName: string): number => {
      return months.indexOf(monthName) + 1;
    };

    if (["startMonth", "startYear", "endMonth", "endYear"].includes(name)) {
      const startMonth =
        name === "startMonth"
          ? getMonthNumber(formattedValue)
          : getMonthNumber(formData.startMonth);
      const startYear =
        name === "startYear"
          ? parseInt(formattedValue)
          : parseInt(formData.startYear);
      const endMonth =
        name === "endMonth"
          ? getMonthNumber(formattedValue)
          : getMonthNumber(formData.endMonth);
      const endYear =
        name === "endYear"
          ? parseInt(formattedValue)
          : parseInt(formData.endYear);

      if (
        !formData.isCurrent &&
        startMonth &&
        startYear &&
        endMonth &&
        endYear
      ) {
        const startDate = new Date(startYear, startMonth - 1);
        const endDate = new Date(endYear, endMonth - 1);

        if (endDate < startDate) {
          toast.error("End date cannot be less than the start date");
          return;
        }
      }
    }

    setFormData(updatedFormData);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData((prevState) => ({
      ...prevState,
      isCurrent: isChecked,
      endMonth: isChecked ? "" : prevState.endMonth,
      endYear: isChecked ? "" : prevState.endYear,
    }));
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    let data: any = localStorage.getItem("resumeData");
    data = JSON.parse(data);
    if (data) {
      setResumeData(data);
      setExperiences(data?.data?.workHistory?.data || []);
    }
  }, []);

  useEffect(() => {
    const data: any = localStorage.getItem("tips");
    if (data && tips.length == 0) {
      setTips(JSON.parse(data));
    }
  }, [tips]);

  useEffect(() => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((experience, indexx) =>
        indexx === index
          ? { ...experience, description: editorContent }
          : experience
      )
    );
  }, [editorContent]);

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

  useEffect(() => {
    if (resumeData) {
      const data = {
        ...resumeData,
        data: {
          ...resumeData.data,
          workHistory: {
            data: experiences,
          },
        },
      };
      const progress = calculateProgress(data);
      const updatedResumeData = {
        ...resumeData,
        progress: progress,
        data: {
          ...resumeData.data,
          workHistory: {
            data: experiences,
          },
        },
      };
      setResumeData(updatedResumeData);
    }
  }, [experiences]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If editing an existing experience, allow it regardless of subscription
    if (selectedExperience) {
      const updatedExperiences = experiences.map((exp, i) =>
        i === index ? formData : exp
      );
      setExperiences(updatedExperiences);
      editModalClose();

      const updatedResumeData = {
        ...resumeData,
        data: {
          ...resumeData.data,
          workHistory: {
            ...resumeData.data.workHistory,
            data: updatedExperiences,
          },
        },
      };

      setResumeData(updatedResumeData);
      setFormData({
        jobTitle: "",
        employer: "",
        location: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        isCurrent: false,
        description: null,
      });

      localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
      return;
    }

    if (!subscriptionData && experiences.length >= 1) {
      toast.error(
        "You must have an active subscription to add more than one experience."
      );
      formCloseModal();
      return;
    }

    setExperiences((prevExperiences) => [formData, ...prevExperiences]);

    const updatedResumeData = {
      ...resumeData,
      data: {
        ...resumeData.data,
        workHistory: {
          ...resumeData.data.workHistory,
          data: [...(resumeData.data.workHistory.data || []), formData],
        },
      },
    };

    setResumeData(updatedResumeData);
    localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
    formCloseModal();
  };

  const handleSubmitNext = async (e: any) => {
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
      router.push("/education");
    } catch (error) {}
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDelete = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
    const updatedResumeData = {
      ...resumeData,
      data: {
        ...resumeData.data,
        workHistory: {
          ...resumeData.data.workHistory,
          data: updatedExperiences,
        },
      },
    };
    setResumeData(updatedResumeData);
    localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );
  const handleClose = () => {
    setDropdownOpen(false);
  };

  const handleEdit = (index: number) => {
    const experienceToEdit = experiences[index];
    setSelectedExperience(experienceToEdit);
    setFormData(experienceToEdit);
    setEditModalOpen(true);
    setIndex(index);
  };

  const openAddDescription = (index: number) => {
    const experienceToEdit = experiences[index];
    setEditorContent(experienceToEdit.description);
    setSearchTerm(experiences[index].jobTitle);
    setModalOpenDescription(true);
    setIndex(index);
    handleSearch();
  };

  const handleToggle = (index: number) => {
    setEditorContent(
      (prevContent) =>
        `${prevContent === null ? "" : prevContent}${items[index].description}`
    ); // Append new text to editor content
  };

  const handleRoute = () => {
    router.push("/header");
  };

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

      setExperiences((prev) => {
        const updatedExperiences = [...prev];
        const [movedItem] = updatedExperiences.splice(oldIndex, 1);
        updatedExperiences.splice(newIndex, 0, movedItem);

        return updatedExperiences;
      });
    }
  };

  return (
    <>
      {tips && (
        <div className="flex w-full">
          <Wrapper1>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="bg-[#F3F3F3] h-[calc(100vh-65px)] overflow-auto">
                <div className="m-[24px]">
                  <StepForm stepNumber={0} />
                </div>
                <div className="flex gap-4 m-[24px] flex-col">
                  <div className="w-full bg-white rounded-xl p-5">
                    <div className="mb-6 flex justify-between items-center">
                      <div>
                        {tips.length !== 0 && (
                          <div
                            dangerouslySetInnerHTML={{ __html: tips[1].header }}
                          />
                        )}
                      </div>

                      {tips.length !== 0 && tips[1].tips && (
                        <div
                          className="flex items-center space-x-3 relative"
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

                          {/* Eye icon with button */}
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
                            <div className="absolute right-4 top-5 mt-2 w-96 z-50">
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
                                    __html: tips[1].tips,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Modal for the Eye Icon */}
                    {showModalView && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
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

                    <Button
                      onClick={() => {
                        if (!subscriptionData && experiences.length >= 1) {
                          toast.error(
                            "You must have an active subscription to add more than one experience."
                          );
                          return;
                        }
                        resetFormData(); // Reset form data each time before opening the modal
                        setFormModalOpen(true);
                      }}
                      className="w-full flex justify-center items-center border-2 border-dashed border-[#1b76ff] text-[#1b76ff] font-bold hover:text-white p-5 rounded-lg cursor-pointer hover:bg-[#2ca1dc]"
                    >
                      <span className="flex justify-center items-center">
                        <Image
                          src="/images/svgs/add-post.svg"
                          alt="Add Post Icon"
                          width={16}
                          height={16}
                          className="mr-2 image-hover"
                        />
                        Add Experience
                      </span>
                    </Button>
                    <div className="mt-5">
                      <SortableContext
                        items={experiences.map((_, index) => index.toString())} // Ensure IDs are strings
                        strategy={verticalListSortingStrategy}
                      >
                        {experiences.map((experience, index) => (
                          <SortableItem
                            key={index}
                            experience={experience}
                            index={index}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            openAddDescription={openAddDescription}
                          />
                        ))}
                      </SortableContext>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between my-2 gap-4 col-span-2 mx-[24px]">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      onClick={handleRoute}
                      className="h-12 bg-transparent border border-[#666666] hover:bg-[#666666] hover:text-white text-[#666666] px-14 rounded-lg"
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
                    <Button
                      type="button"
                      onClick={handleSubmitNext}
                      className="h-12 bg-transparent hover:text-white hover:bg-[#6B84FE] border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </DndContext>
          </Wrapper1>
        </div>
      )}
      {tips.length !== 0 && (
        <Modal isOpen={modalOpen}>
          <div dangerouslySetInnerHTML={{ __html: tips[1].youNeedToKnow }} />
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
      <> </>

      {(formModalOpen || editModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white animate-wave-effect p-6 rounded-lg w-full max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              {editModalOpen ? "Edit Experience" : "Add Experience"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="">
                  <InputField
                    label="Job Title"
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    required={true}
                  />
                </div>
                <div className="">
                  <InputField
                    label="Employer"
                    type="text"
                    name="employer"
                    value={formData.employer}
                    onChange={handleInputChange}
                    placeholder="Employer"
                    required={true}
                  />
                </div>
              </div>
              <div className="mb-4">
                <InputField
                  label="Location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                />
              </div>
              <div className="mb-4 flex gap-2">
                <div className="w-1/2">
                  <label
                    htmlFor="startMonth"
                    className="block text-base font-medium"
                  >
                    Start Month<span className="text-red-500">&nbsp;*</span>
                  </label>
                  <select
                    name="startMonth"
                    value={formData.startMonth}
                    onChange={handleInputChange}
                    className="w-full border rounded-xl h-[48px] px-3 py-2 mt-3"
                    required={true}
                  >
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="startYear"
                    className="block text-base font-medium"
                  >
                    Start Year<span className="text-red-500">&nbsp;*</span>
                  </label>
                  <select
                    id="startYear"
                    name="startYear"
                    required={true}
                    value={formData.startYear}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startYear: e.target.value,
                      }))
                    }
                    className="w-full border rounded-xl h-[48px] px-3 py-2 mt-3"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {!formData.isCurrent && (
                <div className="mb-4 flex gap-2">
                  <div className="w-1/2">
                    <label
                      htmlFor="endMonth"
                      className="block text-base font-medium"
                    >
                      End Month<span className="text-red-500">&nbsp;*</span>
                    </label>
                    <select
                      name="endMonth"
                      value={formData.endMonth}
                      onChange={handleInputChange}
                      className="w-full border rounded-xl h-[48px] px-3 py-2 mt-3"
                      disabled={formData.isCurrent}
                      required={true}
                    >
                      <option value="">Select Month</option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="endYear"
                      className="block text-base font-medium"
                    >
                      End Year<span className="text-red-500">&nbsp;*</span>
                    </label>
                    <select
                      id="endYear"
                      name="endYear"
                      value={formData.endYear}
                      onChange={handleInputChange}
                      className="w-full border rounded-xl h-[48px] px-3 py-2 mt-3"
                      disabled={formData.isCurrent}
                      required={true}
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="currentJob"
                  checked={formData.isCurrent}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="currentJob" className="ml-2">
                  Currently Employed
                </label>
              </div>
              <div className="flex gap-4 col-span-2 justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    formCloseModal();
                    editModalClose(); // Close both modals
                  }}
                  className="h-12 bg-transparent  border hover:bg-[#666666] hover:text-white border-gray-500 text-gray-500 px-10 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
                >
                  {editModalOpen ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal isOpen={modalOpenDescription}>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-4">Add Description</h2>
          <span onClick={closeModalDescription} className="cursor-pointer">
            &times;
          </span>
        </div>

        <div className="bg-[#F9F9F9] p-4 rounded-lg mb-5 flex gap-4">
          {/* <div className="bg-white p-4 h-[44vh] overflow-auto rounded-lg w-1/2">
            <div className="rounded-lg">
              <label className="block text-base font-medium mb-2">
                Search By Job Title For Pre-Written Examples
              </label>
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                <input
                  name="degree"
                  placeholder="Title, Industry, Keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown} // Added handler here
                  className="w-full px-4 py-[.4rem] h-[40px] text-sm border outline-none border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent mb-4 lg:mb-0"
                />

                <button
                  type="button"
                  className="bg-[#6B84FE] text-white rounded-md  h-[40px] w-[40px] justify-center items-center flex hover:underline cursor-pointer"
                  onClick={handleSearch}
                  disabled={!subscriptionData}
                >
                  <AiOutlineSearch className="text-lg" />
                </button>
              </div>
            </div>
            <div className="relative">
              <p className="font-semibold text-xl mb-5">
                Search Results for keyword {`"${searchTerm}"`}
              </p>
              {loadingSection ? (
                <div className="absolute inset-0 flex justify-center items-center bg-white/50 backdrop-blur-sm rounded-lg z-10">
                  <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mt-[150px]"></div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  {items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`w-full border rounded-lg p-2 cursor-pointer flex items-center space-x-2`}
                      onClick={() => handleToggle(index)}
                    >
                      <span className="flex-1">{item.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div> */}
          <div className="bg-white p-4 h-[44vh] overflow-auto rounded-lg w-1/2 relative">
            {!subscriptionData && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex flex-col justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-[90%]">
                  <div className="mb-4 p-3 bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Premium Feature</h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Subscribe to unlock our powerful job search feature and
                    access pre-written examples.
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-lg">
              <label className="block text-base font-medium mb-2">
                Search By Job Title For Pre-Written Examples
              </label>
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                <input
                  name="degree"
                  placeholder="Title, Industry, Keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-[.4rem] h-[40px] text-sm border outline-none border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent mb-4 lg:mb-0"
                />
                <button
                  type="button"
                  className="bg-[#6B84FE] text-white rounded-md h-[40px] w-[40px] justify-center items-center flex hover:underline cursor-pointer"
                  onClick={handleSearch}
                  disabled={!subscriptionData}
                >
                  <AiOutlineSearch className="text-lg" />
                </button>
              </div>
            </div>

            <div className="relative mt-4">
              <p className="font-semibold text-xl mb-5">
                Search Results for keyword {`"${searchTerm}"`}
              </p>
              {loadingSection ? (
                <div className="absolute inset-0 flex justify-center items-center bg-white/50 backdrop-blur-sm rounded-lg">
                  <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                subscriptionData && (
                  <div className="flex flex-col md:flex-row flex-wrap gap-4">
                    {items.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="w-full border rounded-lg p-2 cursor-pointer flex items-center space-x-2"
                        onClick={() => handleToggle(index)}
                      >
                        <span className="flex-1">{item.description}</span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="bg-white p-4 h-[44vh] overflowy-auto rounded-lg w-1/2">
            <SunEditor
              height="270px"
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
        <Button
          onClick={closeModalDescription}
          className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
        >
          Next
        </Button>
      </Modal>
    </>
  );
}
