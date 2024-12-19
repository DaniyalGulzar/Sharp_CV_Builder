import React, { useEffect, useRef, useState } from "react";
import Wrapper1 from "@/components/Wrapper";
import StepForm from "@/components/StepForm";
import Button from "@/components/Button";
import Image from "next/image";
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiFillDelete } from "react-icons/ai";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TemplateManagement from "@/components/TemplateManagement";
import toast from "react-hot-toast";

type ArrayAndSetter<T = any> = {
  array: T[];
  setter: (newArray: T[]) => void;
};

interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const SortableItem = ({ id, data, option, handleEdit }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-4 border border-gray-300 rounded-lg p-2"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#0F172A]">{option}</span>
        <div className="flex items-center gap-2">
          <div {...listeners} {...attributes} className="cursor-grab">
            <Image
              src="/images/svgs/dnd-icon.svg"
              alt="..."
              height={18}
              width={18}
            />
          </div>
          <Button
            className="flex items-center gap-1 text-blue-500"
            onClick={() => handleEdit(option)}
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
      <div className="flex flex-col">
        <div className="">{renderData(option, data)}</div>
      </div>
    </div>
  );
};

const renderData = (optionName: any, data: any) => {
  switch (optionName) {
    case "Websites, Portfolios, Profiles":
      return data.map((item: any, idx: any) => (
        <div key={idx} className="border-b border-[#DDDDDD] py-[4px]">
          <span className="text-sm font-normal text-[#555370]">
            Name: {item.name} <span className="text-[#BABABA]"> | </span>{" "}
            &nbsp;Portfolio: {item.portfolio}
          </span>
        </div>
      ));
    case "Languages":
      return data.map((item: any, idx: any) => (
        <div key={idx} className="border-b border-[#DDDDDD] py-[4px]">
          <span className="text-sm font-normal text-[#555370]">
            language: {item.language}{" "}
            <span className="text-[#BABABA]"> | </span> level: {item.level}
          </span>
        </div>
      ));
    case "Certifications":
      return data.map((item: any, idx: any) => (
        <div key={idx} className="border-b border-[#DDDDDD] py-[4px]">
          <span className="text-sm font-normal text-[#555370]">
            Certification: {item.name}
            <span className="text-[#BABABA]"> | </span>
            Start: {item.startDate} <span className="text-[#BABABA]"> | </span>
            End: {item.endDate}
          </span>
        </div>
      ));
    default:
      return data.map((item: any, idx: any) => (
        <div key={idx} className="border-b border-[#DDDDDD] py-[4px]">
          <span className="text-sm font-normal text-[#555370]">{item}</span>
        </div>
      ));
  }
};

const SortableFormField = ({ id, children, dragHandle = true }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative flex items-start gap-2 bg-white rounded-lg p-2"
    >
      {dragHandle && (
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab mt-14 text-gray-400 hover:text-gray-600"
        >
          <Image
            src="/images/svgs/dnd-icon.svg"
            alt="..."
            height={18}
            width={18}
          />
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
};

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleDivClick = () => {
    onChange();
  };

  const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    onChange();
  };

  return (
    <div
      className="flex items-center w-full p-4 bg-white border border-[#D9D9D9] rounded-lg cursor-pointer"
      onClick={handleDivClick}
    >
      <input
        type="checkbox"
        checked={checked}
        onClick={handleCheckboxClick}
        className="h-4 w-4 border-gray-300 rounded-sm focus:ring-0 checked:bg-blue-500 checked:border-transparent"
      />
      <span className="ml-4 text-gray-700">{label}</span>
    </div>
  );
};

const Finalize = () => {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<any>(null);
  const [options, setOptions] = useState<any>([
    { name: "Websites, Portfolios, Profiles", value: false, data: [] },
    { name: "Certifications", value: false, data: [] },
    { name: "Languages", value: false, data: [] },
    { name: "Software", value: false, data: [] },
    { name: "Accomplishments", value: false, data: [] },
    { name: "Interests", value: false, data: [] },
  ]);

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [cvInfo, setCvInfo] = useState<any>(null);
  const [templateKey, setTemplateKey] = useState(0);
  const [tips, setTips] = useState<any>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [websitePortfolio, setWebsitePortfolio] = useState([
    { name: "", portfolio: "" },
  ]);
  const [certification, setCertification] = useState([
    { name: "", startDate: "", endDate: "" },
  ]);

  const [subscriptionData, setSubscriptionData] = useState(null);
  const { data: session }: any = useSession(); // Access session data
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

  const [language, setLanguage] = useState([{ language: "", level: "" }]);
  const [software, setSoftware] = useState([""]);
  const [accomplishment, setAccomplishment] = useState([""]);
  const [interest, setInterest] = useState([""]);
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number | null>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = options.findIndex((opt: any) => opt.name === active.id);
      const newIndex = options.findIndex((opt: any) => opt.name === over?.id);

      setOptions((prevOptions: any) => {
        const newOptions = [...prevOptions];
        const [movedItem] = newOptions.splice(oldIndex, 1);
        newOptions.splice(newIndex, 0, movedItem);
        return newOptions;
      });
    }
  };

  const handleLanguageLevelChange = (index: number, value: string) => {
    const newLanguage = language.map((lang, i) =>
      i === index ? { ...lang, level: value } : lang
    );
    setLanguage(newLanguage);
  };

  const [formValid, setFormValid] = useState(false);

  // Function to check if all required fields are filled
  const checkFormValidity = () => {
    let isValid = true;

    // Check each form field based on the current option
    const optionName = options[currentOptionIndex!]?.name;
    switch (optionName) {
      case "Websites, Portfolios, Profiles":
        isValid = websitePortfolio.every(
          (entry) => entry.name?.trim() && entry.portfolio?.trim() // Both fields must be filled
        );
        break;
      case "Certifications":
        isValid = certification.every((cert) => {
          if (
            cert.name?.trim() &&
            cert.startDate?.trim() &&
            cert.endDate?.trim()
          ) {
            if (new Date(cert.endDate) < new Date(cert.startDate)) {
              toast.error("End date cannot be earlier than start date");
              return false;
            }
            return true;
          }
          return false;
        });
        break;
      case "Languages":
        isValid = language.every((lang) => lang.language && lang.level);
        break;
      case "Software":
        isValid = software.every((soft) => soft); // Check if all software fields are filled
        break;
      case "Accomplishments":
        isValid = accomplishment.every((acc) => acc); // Check if all accomplishments are filled
        break;
      case "Interests":
        isValid = interest.every((int) => int); // Check if all interests are filled
        break;
      default:
        isValid = false;
    }

    setFormValid(isValid);
  };

  useEffect(() => {
    checkFormValidity(); // Check form validity whenever input data changes
  }, [
    websitePortfolio,
    certification,
    language,
    software,
    accomplishment,
    interest,
  ]);

  useEffect(() => {
    let data: any = localStorage.getItem("resumeData");
    data = JSON.parse(data);
    if (data) {
      setResumeData(data);
      setOptions([
        {
          name: "Websites, Portfolios, Profiles",
          value:
            data.data.portfolio.data.length > 0 &&
            data.data.portfolio.data[0].name !== ""
              ? true
              : false,
          data:
            data.data.portfolio.data.length > 0 &&
            data.data.portfolio.data[0].name === ""
              ? []
              : data.data.portfolio.data,
        },
        {
          name: "Certifications",
          value:
            data.data.certificate.data.length > 0 &&
            data.data.certificate.data[0].name !== ""
              ? true
              : false,
          data:
            data.data.certificate.data.length > 0 &&
            data.data.certificate.data[0].name === ""
              ? [{ name: "", startDate: "", endDate: "" }]
              : data.data.certificate.data,
        },
        {
          name: "Languages",
          value:
            data.data.language.data.length > 0 &&
            data.data.language.data[0].language !== ""
              ? true
              : false,
          data:
            data.data.language.data.length > 0 &&
            data.data.language.data[0].language === ""
              ? [{ language: "", level: "" }]
              : data.data.language.data,
        },
        {
          name: "Software",
          value:
            data.data.software.data.length > 0 &&
            data.data.software.data[0] !== ""
              ? true
              : false,
          data:
            data.data.software.data.length > 0 &&
            data.data.software.data[0] === ""
              ? []
              : data.data.software.data,
        },
        {
          name: "Accomplishments",
          value:
            (data.data.accomplishment.data.length &&
              data.data.accomplishment.data[0] !== "") > 0
              ? true
              : false,
          data:
            data.data.accomplishment.data.length > 0 &&
            data.data.accomplishment.data[0] === ""
              ? []
              : data.data.accomplishment.data,
        },
        {
          name: "Interests",
          value:
            data.data.interest.data.length > 0 &&
            data.data.interest.data[0] !== ""
              ? true
              : false,
          data:
            data.data.interest.data.length > 0 &&
            data.data.interest.data[0] === ""
              ? []
              : data.data.interest.data,
        },
      ]);
    }
  }, []);

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
          { id: "5", name: "Skills" },
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
          { id: "5", name: "Skills"},
          { id: "6", name: "Certification" },
          { id: "7", name: "Interest" },
          { id: "8", name: "Software", href: "/final" },
          { id: "9", name: "Language", href: "/final" },
          { id: "10", name: "Accomplishment", href: "/final" },
          { id: "11", name: "Portfolio", href: "/final" },
        ]);
      } else if (resumeData.template.title === "tempate h") {
        setCvInfo([
          { id: "1", name: "Heading" },
          { id: "2", name: "ProfessionalTitle" },
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "5", name: "Skills" },
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
          { id: "5", name: "Skills" },
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
          { id: "5", name: "Skills" },
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

  const handleEyeIconClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (resumeData) {
      const updatedResumeData = {
        ...resumeData,
        data: {
          ...resumeData.data,
          portfolio: {
            ...resumeData.data.portfolio,
            data: options[0].data,
          },
          certificate: {
            ...resumeData.data.certificate,
            data: options[1].data,
          },
          language: {
            ...resumeData.data.language,
            data: options[2].data,
          },
          software: {
            ...resumeData.data.software,
            data: options[3].data,
          },
          accomplishment: {
            ...resumeData.data.accomplishment,
            data: options[4].data,
          },
          interest: {
            ...resumeData.data.interest,
            data: options[5].data,
          },
        },
      };
      setResumeData(updatedResumeData);
    }
  }, [options]);

  useEffect(() => {
    const data: any = localStorage.getItem("tips");
    if (data && tips.length == 0) {
      setTips(JSON.parse(data));
    }
  }, [tips]);

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

  const toggleOption = (index: number) => {
    setOptions((prevOptions: any) =>
      prevOptions.map((opt: any, i: number) =>
        i === index ? { ...opt, value: !opt.value } : opt
      )
    );

    if (!options[index].value) {
      setCurrentOptionIndex(index);
      setIsModalOpen(true);
    } else {
      setCurrentOptionIndex(null);
      setIsModalOpen(false);
    }
  };

  const handleSubmitNext = async (e: any) => {
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
      router.push("/preview");
    } catch (error) {}
  };

  const handleAddMore = (name: any) => {
    switch (name) {
      case "Websites, Portfolios, Profiles":
        setWebsitePortfolio([...websitePortfolio, { name: "", portfolio: "" }]);
        break;
      case "Certifications":
        setCertification([
          ...certification,
          { name: "", startDate: "", endDate: "" },
        ]);
        break;
      case "Languages":
        setLanguage([...language, { language: "", level: "" }]);
        break;
      case "Software":
        setSoftware([...software, ""]);
        break;
      case "Accomplishments":
        setAccomplishment([...accomplishment, ""]);
        break;
      case "Interests":
        setInterest([...interest, ""]);
        break;
      default:
        break;
    }
  };

  const handleDelete = (index: number, type: string) => {
    switch (type) {
      case "websitePortfolio":
        setWebsitePortfolio(websitePortfolio.filter((_, i) => i !== index));
        break;
      case "certification":
        setCertification(certification.filter((_, i) => i !== index));
        break;
      case "language":
        setLanguage(language.filter((_, i) => i !== index));
        break;
      case "software":
        setSoftware(software.filter((_, i) => i !== index));
        break;
      case "accomplishment":
        setAccomplishment(accomplishment.filter((_, i) => i !== index));
        break;
      case "interest":
        setInterest(interest.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const handleRoute = () => {
    router.push("/summary");
  };

  const handleAddData = (name: string) => {
    const selectedOption = options.find((option: any) => option.name === name);
    const index = options.findIndex((option: any) => option.name === name);

    setCurrentOptionIndex(index);

    if (selectedOption) {
      const lastDataEntry = selectedOption.data;

      switch (selectedOption.name) {
        case "Websites, Portfolios, Profiles":
          setWebsitePortfolio(
            lastDataEntry.length > 0
              ? lastDataEntry
              : [{ name: "", portfolio: "" }]
          );
          break;
        case "Certifications":
          setCertification(lastDataEntry.length > 0 ? lastDataEntry : [""]);
          break;
        case "Languages":
          setLanguage(
            lastDataEntry.length > 0
              ? lastDataEntry
              : [{ language: "", level: "" }]
          );
          break;
        case "Software":
          setSoftware(lastDataEntry.length > 0 ? lastDataEntry : [""]);
          break;
        case "Accomplishments":
          setAccomplishment(lastDataEntry.length > 0 ? lastDataEntry : [""]);
          break;
        case "Interests":
          setInterest(lastDataEntry.length > 0 ? lastDataEntry : [""]);
          break;
        default:
          break;
      }
    }
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentOptionIndex(null);
  };

  const handleSave = () => {
    if (currentOptionIndex !== null) {
      setOptions((prevOptions: any) =>
        prevOptions.map((option: any, idx: number) => {
          if (idx === currentOptionIndex) {
            switch (option.name) {
              case "Websites, Portfolios, Profiles":
                return { ...option, data: websitePortfolio };
              case "Certifications":
                return { ...option, data: certification };
              case "Languages":
                return { ...option, data: language };
              case "Software":
                return { ...option, data: software };
              case "Accomplishments":
                return { ...option, data: accomplishment };
              case "Interests":
                return { ...option, data: interest };
              default:
                return option;
            }
          } else {
            return option;
          }
        })
      );
      setIsModalOpen(false);
      setFormValid(false);
    }
  };

  const handleWebsitePortfolioChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedPortfolio = websitePortfolio.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setWebsitePortfolio(updatedPortfolio);
  };

  const handleCertificationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    let newValue = value;

    // Validate the date fields
    if (field === "startDate" || field === "endDate") {
      const dateValue = new Date(value);

      // Check if the date is valid
      if (isNaN(dateValue.getTime())) {
        // If the date is invalid, reset the value to an empty string
        newValue = "";
      }
    }

    const newCertification = certification.map((cert, i) =>
      i === index ? { ...cert, [field]: newValue } : cert
    );
    setCertification(newCertification);
    checkFormValidity();
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguage = language.map((lang, i) =>
      i === index ? { ...lang, language: value } : lang
    );
    setLanguage(newLanguage);
  };

  const handleSoftwareChange = (index: number, value: string) => {
    const newSoftware = software.map((soft, i) => (i === index ? value : soft));
    setSoftware(newSoftware);
  };

  const handleAccomplishmentChange = (index: number, value: string) => {
    const newAccomplishment = accomplishment.map((acc, i) =>
      i === index ? value : acc
    );
    setAccomplishment(newAccomplishment);
  };

  const handleInterestChange = (index: number, value: string) => {
    const newInterest = interest.map((int, i) => (i === index ? value : int));
    setInterest(newInterest);
  };

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleModalDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (active.id !== over.id) {
      const getArrayAndSetter = () => {
        switch (options[currentOptionIndex!]?.name) {
          case "Websites, Portfolios, Profiles":
            return {
              array: websitePortfolio,
              setter: setWebsitePortfolio,
            };
          case "Certifications":
            return {
              array: certification,
              setter: setCertification,
            };
          case "Languages":
            return {
              array: language,
              setter: setLanguage,
            };
          case "Software":
            return {
              array: software,
              setter: setSoftware,
            };
          case "Accomplishments":
            return {
              array: accomplishment,
              setter: setAccomplishment,
            };
          case "Interests":
            return {
              array: interest,
              setter: setInterest,
            };
          default:
            return null;
        }
      };

      const arrayAndSetter = getArrayAndSetter() as ArrayAndSetter;
      if (arrayAndSetter) {
        const { array, setter } = arrayAndSetter;
        const oldIndex = parseInt(active.id.toString().split("-")[1]);
        const newIndex = parseInt(over.id.toString().split("-")[1]);
        setter(arrayMove(array, oldIndex, newIndex) as any);
      }
    }
  };

  const renderModalContent = () => {
    if (currentOptionIndex === null) return null;

    const optionName = options[currentOptionIndex].name;
    let items: string[] = [];
    let content;

    switch (optionName) {
      case "Websites, Portfolios, Profiles":
        items = websitePortfolio.map((_, i) => `portfolio-${i}`);
        content = websitePortfolio.map((entry, index) => (
          <SortableFormField
            key={`portfolio-${index}`}
            id={`portfolio-${index}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <InputField
                label="Name"
                name={`name-${index}`}
                value={entry.name}
                required
                placeholder="e.g. Profile Name"
                onChange={(e) =>
                  handleWebsitePortfolioChange(index, "name", e.target.value)
                }
              />
              <InputField
                label="Portfolio"
                name={`portfolio-${index}`}
                required
                value={entry.portfolio}
                placeholder="e.g. https://dummyprofile.com"
                onChange={(e) =>
                  handleWebsitePortfolioChange(
                    index,
                    "portfolio",
                    e.target.value
                  )
                }
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index, "websitePortfolio")}
                  className="absolute top-6 right-2 text-red-500 hover:text-red-700"
                >
                  <AiFillDelete color="#ccc" />
                </button>
              )}
            </div>
          </SortableFormField>
        ));
        break;

      case "Certifications":
        items = certification.map((_, i) => `certification-${i}`);
        content = certification.map((cert, index) => (
          <SortableFormField
            key={`certification-${index}`}
            id={`certification-${index}`}
          >
            <div className="relative grid grid-cols-1 gap-4 w-full">
              {/* Certification Name Field */}
              <InputField
                label="Certification"
                name={`Certification-${index}`}
                required
                value={cert.name}
                placeholder="e.g. PMP, AWS Certified"
                onChange={(e) =>
                  handleCertificationChange(index, "name", e.target.value)
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Start Date"
                  type="date"
                  placeholder=""
                  name={`startDate-${index}`}
                  value={cert.startDate}
                  onChange={(e) =>
                    handleCertificationChange(
                      index,
                      "startDate",
                      e.target.value
                    )
                  }
                />

                <InputField
                  label="End Date"
                  type="date"
                  placeholder=""
                  name={`endDate-${index}`}
                  value={cert.endDate}
                  onChange={(e) =>
                    handleCertificationChange(index, "endDate", e.target.value)
                  }
                />
              </div>
              {/* Delete Button (only for index > 0) */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index, "certification")}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <AiFillDelete color="#ccc" />
                </button>
              )}
            </div>
          </SortableFormField>
        ));
        break;

      case "Languages":
        items = language.map((_, i) => `language-${i}`);
        content = language.map((lang, index) => (
          <SortableFormField key={`language-${index}`} id={`language-${index}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <InputField
                label="Language"
                required
                name={`Language-${index}`}
                value={lang.language}
                placeholder="e.g. English, Spanish"
                onChange={(e) => handleLanguageChange(index, e.target.value)}
              />
              <div className="mt-2">
                <label
                  htmlFor={`LanguageLevel-${index}`}
                  className="text-base font-medium"
                >
                  Language Level
                </label>
                <select
                  id={`LanguageLevel-${index}`}
                  name={`LanguageLevel-${index}`}
                  value={lang.level}
                  className="w-full px-4 py-[.8rem] text-sm border border-black-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent mt-2"
                  onChange={(e) =>
                    handleLanguageLevelChange(index, e.target.value)
                  }
                  required
                >
                  <option value="">Select a Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Fluent">Fluent</option>
                </select>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index, "language")}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <AiFillDelete color="#ccc" />
                </button>
              )}
            </div>
          </SortableFormField>
        ));
        break;

      case "Software":
        items = software.map((_, i) => `software-${i}`);
        content = software.map((soft, index) => (
          <SortableFormField key={`software-${index}`} id={`software-${index}`}>
            <div className="relative grid grid-cols-1 gap-4 w-full">
              <InputField
                label="Software"
                name={`Software-${index}`}
                required
                value={soft}
                placeholder="e.g. Photoshop, Excel, VS Code"
                onChange={(e) => handleSoftwareChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index, "software")}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <AiFillDelete color="#ccc" />
                </button>
              )}
            </div>
          </SortableFormField>
        ));
        break;

      case "Accomplishments":
        items = accomplishment.map((_, i) => `accomplishment-${i}`);
        content = accomplishment.map((acc, index) => (
          <SortableFormField
            key={`accomplishment-${index}`}
            id={`accomplishment-${index}`}
          >
            <div className="relative grid grid-cols-1 gap-4 w-full">
              <InputField
                label="Accomplishment"
                name={`Accomplishment-${index}`}
                required
                value={acc}
                placeholder="e.g. Employee of the Month"
                onChange={(e) =>
                  handleAccomplishmentChange(index, e.target.value)
                }
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index, "accomplishment")}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <AiFillDelete color="#ccc" />
                </button>
              )}
            </div>
          </SortableFormField>
        ));
        break;

      case "Interests":
        items = interest.map((_, i) => `interest-${i}`);
        content = interest.map((int, index) => (
          <SortableFormField key={`interest-${index}`} id={`interest-${index}`}>
            <div className="relative grid grid-cols-1 gap-4 w-full">
              <InputField
                label="Interest"
                name={`Interest-${index}`}
                required
                value={int}
                placeholder="e.g. Reading, Traveling"
                onChange={(e) => handleInterestChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index, "interest")}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <AiFillDelete color="#ccc" />
                </button>
              )}
            </div>
          </SortableFormField>
        ));
        break;
    }

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleModalDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {content}
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <>
      {tips && (
        <div className="flex w-full">
          <Wrapper1>
            <div className="bg-[#F3F3F3] h-[calc(100vh-65px)] overflow-auto">
              <div className="m-6">
                <StepForm
                  stepNumber={4}
                />
              </div>
              <div className="flex gap-4 m-6">
                <div className="w-full">
                  <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-white rounded-xl col-span-2">
                      <div className="mb-6 flex justify-between">
                        <div>
                          {tips.length !== 0 && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: tips[5].header,
                              }}
                              className="flex-1"
                            />
                          )}
                        </div>

                        {tips.length !== 0 && tips[5].tips ? (
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
                              <div className="absolute right-0 mt-2 w-80 z-50">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: tips[5].tips,
                                  }}
                                />
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

                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex flex-col w-full lg:w-1/2 gap-4">
                          <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
                            {options.map((option: any, index: number) => (
                              <CheckboxOption
                                key={index}
                                label={option.name}
                                checked={option.value}
                                onChange={() => toggleOption(index)}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col w-full lg:w-1/2 gap-4 bg-[#F9F9F9] shadow-md px-4 py-4 overflow-auto h-[474px]">
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                          >
                            <SortableContext
                              items={options
                                .filter(
                                  (option: any) =>
                                    option.value &&
                                    option.data &&
                                    option.data.length > 0
                                )
                                .map((option: any) => option.name)}
                              strategy={verticalListSortingStrategy}
                            >
                              {options
                                .filter(
                                  (option: any) =>
                                    option.value &&
                                    option.data &&
                                    option.data.length > 0
                                )
                                .map((option: any) => (
                                  <SortableItem
                                    key={option.name}
                                    id={option.name}
                                    data={option.data}
                                    option={option.name}
                                    handleEdit={() =>
                                      handleAddData(option.name)
                                    }
                                  />
                                ))}
                            </SortableContext>
                          </DndContext>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 col-span-2">
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button
                          onClick={handleRoute}
                          className="h-12 bg-transparent hover:bg-[#666666] hover:text-white border border-[#666666] text-[#666666] px-14 rounded-lg sm:w-full"
                        >
                          Back
                        </Button>
                      </div>
                      <div className="w-full lg:w-[250px] md:w-[250px] mt-2 text-center">
                        <ProgressBar
                          completed={100}
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
                          className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </form>

                  {isModalOpen && (
                    <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="modal-newspaper bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
                        <button
                          onClick={handleClose}
                          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>

                        <p className="my-2 text-2xl text-center mb-6 font-bold">
                          {options[currentOptionIndex!]?.name}
                        </p>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="grid grid-cols-1 gap-4">
                            {renderModalContent()}
                          </div>
                        </form>

                        <div className="flex justify-center mt-6 gap-4">
                          <Button
                            onClick={() => {
                              handleAddMore(options[currentOptionIndex!]?.name);
                            }}
                            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                          >
                            Add More
                          </Button>

                          <button
                            type="button"
                            onClick={handleSave}
                            disabled={!formValid}
                            className={`py-2 px-6 rounded text-white ${
                              formValid
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Wrapper1>
        </div>
      )}
    </>
  );
};

export default Finalize;
