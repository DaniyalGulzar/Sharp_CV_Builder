import React, { useEffect, useRef, useState } from "react";
import Wrapper1 from "@/components/Wrapper";
import StepForm from "@/components/StepForm";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Image from "next/image";
import { useSession } from "next-auth/react";
import DELETE from "../../../public/images/svgs/fluent_delete-24-regular.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import { Lock } from "lucide-react";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
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
import TemplateManagement from "@/components/TemplateManagement";
import toast from "react-hot-toast";
import {
  additionalEducation,
  degreesData,
  fieldsOfStudyData,
  monthsData,
} from "@/utils/data";

interface Education {
  id: string;
  degree: string;
  schoolName: string;
  fieldOfStudy: string;
  location: string;
  endMonth?: string;
  endYear?: string;
  description: string | null;
}

interface SortableItemProps {
  education: Education;
  index: number;
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  openAddDescription: (index: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  education,
  index,
  handleEdit,
  handleDelete,
  openAddDescription,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index.toString() }); // Ensure ID is a string

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-xl p-6 mb-5 bg-white border-[#DBEAFE] shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          {/* Display the item text */}
          <span className="text-xl font-bold">
            {education.degree}, {education.schoolName} -{" "}
            {education.fieldOfStudy}
          </span>

          <div className="flex items-center space-x-4">
            <div {...listeners} {...attributes} className="cursor-grab pr-2">
              <span className="">
                <FaUpDownLeftRight className="text-2xl text-[rgb(95,95,95)]" />
              </span>
            </div>

            <span
              onClick={(e) => {
                e.stopPropagation(); // Prevent drag from overriding the click
                handleEdit(index);
              }}
              className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
            >
              <FaPencil className="text-2xl text-[rgb(95,95,95)]" />
            </span>

            {/* Delete button */}
            <Image
              onClick={(e) => {
                e.stopPropagation(); // Prevent drag from overriding the click
                handleDelete(index);
              }}
              className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
              src={DELETE}
              alt="Delete"
              height={24}
              width={24}
            />
          </div>
        </div>

        {/* Location and description */}
        <span className="text-md font-medium mt-1 text-[#666]">
          {education.location} |
          {education.endMonth && education.endYear && (
            <>
              {education.endMonth}, {education.endYear}
            </>
          )}
        </span>
        <div>
          {education.description ? (
            education.description
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

        <div>
          <span>
            {education.description === null ? (
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent drag from overriding the click
                  openAddDescription(index);
                }}
                className="text-[#6B84FE] cursor-pointer"
              >
                Add Description
              </div>
            ) : (
              <div>
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent drag from overriding the click
                    openAddDescription(index);
                  }}
                  className="text-[#6B84FE] cursor-pointer"
                >
                  Edit Description
                </span>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Wrapper() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [index, setIndex] = useState<number>();
  const [education, setEducation] = useState<any[]>([]);
  const [tips, setTips] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<any>(null);
  const { data: session, status }: any = useSession();
  const [modalOpenDescription, setModalOpenDescription] = useState(false);
  const [cvInfo, setCvInfo] = useState<any>(null);
  const [showModalView, setShowModalView] = useState(false);
  const [templateKey, setTemplateKey] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const [subscriptionData, setSubscriptionData] = useState(true);

  const accordionItems = additionalEducation;
  const degrees = degreesData;
  const months = monthsData;
  const fieldsOfStudy = fieldsOfStudyData;

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
      if (response.data.result.subscription === null) {
        setSubscriptionData(false);
      }
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

  const handleEditorChange = (content: string) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData, // Spread previous state
        description: content, // Update description field
      };
    });
  };

  const toggleOptionStatus = (sectionIndex: number, optionIndex: number) => {
    const selectedOption = accordionItems[sectionIndex].options[optionIndex];

    setFormData((prevFormData) => {
      const parser = new DOMParser();
      const doc = prevFormData.description
        ? parser.parseFromString(prevFormData.description, "text/html")
        : document.implementation.createHTMLDocument();

      let ulElement = doc.querySelector("ul");
      if (!ulElement) {
        ulElement = doc.createElement("ul");
        doc.body.appendChild(ulElement);
      }

      const newLi = doc.createElement("li");
      newLi.style.color = "#68b4fe";
      newLi.style.fontSize = "1rem";
      newLi.textContent = selectedOption.showText;
      ulElement.appendChild(newLi);

      const updatedDescription = doc.body.innerHTML;

      return {
        ...prevFormData,
        description: updatedDescription,
      };
    });
  };

  const accordionContent = accordionItems.map((section, sectionIndex) => ({
    title: section.title,
    content: (
      <div className="p-4 bg-white">
        {section.options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            onClick={() => toggleOptionStatus(sectionIndex, optionIndex)}
            className={`mb-2 p-2 border rounded-3xl flex justify-between items-center ${
              option.status ? "bg-blue-100" : "bg-white"
            }`}
          >
            <span
              className={`font-semibold flex items-center text-sm cursor-pointer ${
                option.status ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {option.name}
            </span>
          </div>
        ))}
      </div>
    ),
  }));

  const [formData, setFormData] = useState({
    schoolName: "",
    degree: "",
    fieldOfStudy: "",
    location: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
  });

  const editModalClose = () => {
    setEditModalOpen(false);
    setSelectedEducation(null);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      schoolName: "",
      degree: "",
      fieldOfStudy: "", // Updated field
      location: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: "",
    });
  };

  const calculateProgress = (data: any) => {
    const sections = {
      personalInfo: 20,
      summary: 15,
      education: 25,
      workExperience: 25,
      skill: 15,
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
      score += sections.skill;
    }

    return (score / totalWeight) * 100;
  };

  useEffect(() => {
    if (resumeData) {
      const data = {
        ...resumeData,
        data: {
          ...resumeData.data,
          education: {
            data: education,
          },
        },
      };
      const progress = calculateProgress(data);
      const updatedResumeData = {
        ...resumeData,
        progress: progress,
        data: {
          ...resumeData.data,
          education: {
            data: education,
          },
        },
      };
      setResumeData(updatedResumeData);
    }
  }, [education]);

  const closeModalDescription = () => {
    setModalOpenDescription(false);
  };

  const router = useRouter();

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const formattedValue =
      type === "text" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    setFormData((prevState) => ({ ...prevState, [name]: formattedValue }));
  };

  useEffect(() => {
    const data: any = localStorage.getItem("tips");
    if (data && tips.length == 0) {
      setTips(JSON.parse(data)); // Parse the JSON string back to an object
    }
  }, [tips]);

  useEffect(() => {
    let data: any = localStorage.getItem("resumeData");
    data = JSON.parse(data);
    if (data) {
      setResumeData(data);
      setEducation(data?.data?.education?.data || []);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (selectedEducation) {
      const updatedEducation = education.map((exp, i) =>
        i === index ? formData : exp
      );
      setEducation(updatedEducation);
      editModalClose();
      const updatedResumeData = {
        ...resumeData,
        data: {
          ...resumeData.data,
          education: {
            ...resumeData.data.education,
            data: updatedEducation,
          },
        },
      };
      setResumeData(updatedResumeData);
      localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
    } else {
      setEducation((prevEducation) => [formData, ...prevEducation]);
      const updatedResumeData = {
        ...resumeData,
        data: {
          ...resumeData.data,
          education: {
            ...resumeData.data.education,
            data: [formData, ...(resumeData.data.education.data || [])],
          },
        },
      };
      setResumeData(updatedResumeData);
      localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
    }
    formCloseModal();
    setLoading(false);
  };

  const handleSubmitNext = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
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
      router.push("/skills");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const formCloseModal = () => setFormModalOpen(false);

  const startYear = 1990;
  const endYear = 2050;

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleClose = () => {
    setDropdownOpen(false);
  };

  const handleEdit = (index: number) => {
    const educationToEdit = education[index];
    setSelectedEducation(educationToEdit);
    setFormData(educationToEdit);
    setEditModalOpen(true);
    setIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
    const updatedResumeData = {
      ...resumeData,
      data: {
        ...resumeData.data,
        education: {
          ...resumeData.data.education,
          data: updatedEducation,
        },
      },
    };
    setResumeData(updatedResumeData);
    localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
  };

  const handleRoute = () => {
    router.push("/history");
  };

  const openAddDescription = (educationIndex: number) => {
    const educationToEdit = education[educationIndex];
    setModalOpenDescription(true);
    setFormData(educationToEdit);
    setModalOpenDescription(true);
    setIndex(educationIndex);
  };

  const submitModalDescription = () => {
    const updatedEducation = education.map((edu, i) => {
      if (i === index) {
        return formData;
      }
      return edu;
    });
    setEducation(updatedEducation);
    setModalOpenDescription(false);
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

      setEducation((prev) => {
        const updatedEducation = [...prev];
        const [movedItem] = updatedEducation.splice(oldIndex, 1);
        updatedEducation.splice(newIndex, 0, movedItem);

        return updatedEducation;
      });
    }
  };

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

  return (
    <>
      {loading && (
        <div className="z-[100] absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <Loader loading={loading} />
        </div>
      )}
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
                  <StepForm stepNumber={1} />
                </div>
                <div className="flex gap-4 m-[24px] flex-col">
                  <div className="w-full bg-white rounded-xl p-5 relative">
                    {!subscriptionData && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/60 backdrop-blur-[1px] flex flex-col justify-center items-center z-[50]">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-[90%]">
                          <div className="mb-4 p-3 bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
                            <Lock className="w-6 h-6 text-gray-600" />
                          </div>
                          <h2 className="text-xl font-bold mb-2">
                            Premium Feature
                          </h2>
                          <p className="text-gray-600 mb-4 text-sm">
                            Subscribe to unlock our powerful job search feature
                            and access pre-written examples.
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="mb-6 flex justify-between items-center">
                      <div>
                        {tips.length !== 0 && (
                          <div
                            dangerouslySetInnerHTML={{ __html: tips[2].header }}
                          />
                        )}
                      </div>

                      {tips.length !== 0 && tips[2].tips && (
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
                                    __html: tips[2].tips,
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
                        if (subscriptionData) {
                          resetFormData(); // Reset form data each time before opening the modal
                          setFormModalOpen(true);
                        } else {
                          toast.error("Please subscribe to use this feature");
                        }
                      }}
                      className="w-full flex justify-center items-center border-2 border-dashed border-[#1B76FF] text-[#1B76FF] font-bold hover:text-white p-5 rounded-lg cursor-pointer hover:bg-[#2ca1dc]"
                    >
                      <span className="flex justify-center items-center">
                        <Image
                          src="/images/svgs/add-post.svg"
                          alt="Add Post Icon"
                          width={16}
                          height={16}
                          className="mr-2 image-hover"
                        />
                        Add Education
                      </span>
                    </Button>
                    <div className="mt-5">
                      <SortableContext
                        items={education.map((_, index) => index.toString())} // Ensure IDs are strings
                        strategy={verticalListSortingStrategy}
                      >
                        {education.map((edu, index) => (
                          <SortableItem
                            key={index}
                            education={edu}
                            index={index}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            openAddDescription={openAddDescription}
                          />
                        ))}
                      </SortableContext>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between my-2 gap-4 col-span-2">
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
              </div>
            </DndContext>
          </Wrapper1>

          {tips.length !== 0 && (
            <Modal isOpen={modalOpen}>
              <div
                dangerouslySetInnerHTML={{ __html: tips[2].youNeedToKnow }}
              />
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

          {(formModalOpen || editModalOpen) && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg animate-wave-effect">
                <h2 className="text-3xl font-bold text-gray-800">
                  {editModalOpen ? "Edit Education" : "Add Education"}
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="w-full pb-6 bg-white rounded-xl col-span-2">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <InputField
                            label="School Name"
                            name="schoolName"
                            value={formData.schoolName}
                            placeholder="e.g Punjab University"
                            required={true}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex-1 mt-2">
                          <label className="block text-base font-medium mb-2">
                            Degree<span className="text-red-500">&nbsp;*</span>
                          </label>
                          <select
                            name="degree"
                            value={formData.degree}
                            onChange={handleInputChange}
                            required={true}
                            className="w-full h-[47px] px-4 py-[.8rem] text-sm border border-black-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                          >
                            <option value="">Select Degree</option>
                            {degrees.map((degree, index) => (
                              <option key={index} value={degree}>
                                {degree}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <InputField
                          label="Location"
                          name="location"
                          value={formData.location}
                          placeholder="Enter your location"
                          required={true}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-span-1 mt-2">
                        <label className="block text-base font-medium">
                          Field of Study
                          <span className="text-red-500">&nbsp;*</span>
                        </label>
                        <div className="flex gap-4">
                          <select
                            name="fieldOfStudy"
                            value={formData.fieldOfStudy}
                            onChange={handleInputChange}
                            required={true}
                            className=" mt-2 w-full px-4 py-[.8rem] text-sm border border-black-500 rounded-xl h-[47px] focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                          >
                            <option value="">Select Field of Study</option>
                            {fieldsOfStudy.map((field, index) => (
                              <option key={index} value={field}>
                                {field}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-base font-medium">
                            Graduation Date (or Expected Graduation Date)
                            <span className="text-red-500">&nbsp;*</span>
                          </label>
                          <div className="flex gap-4">
                            <select
                              name="endMonth"
                              value={formData.endMonth}
                              onChange={handleInputChange}
                              required={true}
                              className=" mt-2 w-full px-4 py-[.8rem] text-sm border border-black-500 rounded-xl h-[47px] focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                            >
                              <option value="">Month</option>
                              {months.map((month, index) => (
                                <option key={index} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            <select
                              name="endYear"
                              value={formData.endYear}
                              onChange={handleInputChange}
                              required={true}
                              className=" mt-2 w-full px-4 py-[.8rem] text-sm border border-black-500 rounded-xl h-[47px] focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                            >
                              <option value="">Year</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 col-span-2 justify-end">
                    <Button
                      type="button"
                      onClick={() => {
                        formCloseModal();
                        editModalClose(); // Close both modals
                      }}
                      className="h-12 bg-transparent border border-gray-500 hover:bg-[#666666] hover:text-white text-gray-500 px-10 rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="h-12 bg-transparent border border-[#6B84FE] hover:bg-[#6B84FE] hover:text-white text-[#6B84FE] px-14 rounded-lg"
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
              <div className="bg-white p-4 rounded-lg w-1/2 max-h-[420px] overflow-auto">
                <p className="font-semibold text-xl mb-5">
                  Ready To Use Examples
                </p>

                <div className="mt-5">
                  {accordionContent &&
                    accordionContent.map((accordionItem, index) => (
                      <div key={index} className="border rounded-lg mb-2">
                        <button
                          className="w-full bg-gray-200 p-2 text-left font-semibold flex justify-between items-center"
                          onClick={() =>
                            setExpandedIndex(
                              expandedIndex === index ? null : index
                            )
                          }
                        >
                          <div className="w-full">{accordionItem.title}</div>
                        </button>
                        {expandedIndex === index && (
                          <div className="p-1 bg-white">
                            {accordionItem.content}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-white rounded-lg w-1/2 p-4">
                <SunEditor
                  height="320px"
                  onChange={handleEditorChange}
                  setOptions={{
                    buttonList: [
                      ["bold", "underline", "italic"],
                      ["fontSize"],
                      ["align", "list", "lineHeight"],
                    ],
                  }}
                  setContents={formData.description}
                  placeholder="Write your content here..."
                />
              </div>
            </div>
            <Button
              onClick={submitModalDescription}
              className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
            >
              Next
            </Button>
          </Modal>
        </div>
      )}
    </>
  );
}
