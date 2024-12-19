"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import Wrapper1 from "@/components/Wrapper";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TemplateManagement from "@/components/TemplateManagement";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import Template1 from "@/components/Templates/Template1";
import Template2 from "@/components/Templates/Template2";
import Template3 from "@/components/Templates/Template3";
import Template4 from "@/components/Templates/Template4";
import Template5 from "@/components/Templates/Template5";
import Template6 from "@/components/Templates/Template6";
import Template7 from "@/components/Templates/Template7";
import Template8 from "@/components/Templates/Template8";
import Template9 from "@/components/Templates/Template9";

import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import withAuth from "@/app/auth/auth/authHOC";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaEye, FaSadTear } from "react-icons/fa";

const Finalize = () => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [templateKey, setTemplateKey] = useState(0);
  const router = useRouter();
  const [cvInfo, setCvInfo] = useState<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status }: any = useSession();
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("#6b84fe");
  const [previewColor, setPreviewColor] = useState("#6b84fe");
  const [tempSelectedColor, setTempSelectedColor] = useState("#6b84fe");
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("tab1");
  const [resumeEdit, setResumeEdit] = useState<any>([
    {
      name: "Heading",
      id: "Heading",
      route: "/header",
    },
    {
      name: "Work History",
      id: "Work History",
      route: "/history",
    },
    {
      name: "Education",
      id: "Education",
      route: "/education",
    },
    {
      name: "Skill",
      id: "Skill",
      route: "/skills",
    },
    {
      name: "Summary",
      id: "Summary",
      route: "/summary",
    },
    {
      name: "Additional",
      id: "Additional",
      route: "/final",
    },
  ]);

  const closeModal = () => {
    setShowModal(false);
    // setSelectedTemplate(null);
  };

  const handleColorClick = (color: any) => {
    setTempSelectedColor(color.code);
    setPreviewColor(color.code);
    setSelectedColor(color.code);
  };

  const handleTemplateSelection = async (template: any) => {
    setIsTemplateLoading(true);
    setLoading(true);
    try {
      const updatedResumeData = {
        ...resumeData,
        template: {
          ...resumeData.template,
          title: template.title,
          id: template._id,
        },
      };
      setResumeData(updatedResumeData);
      localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
      const newCvInfo = getCvinfo(template.title);
      setCvInfo(newCvInfo);

      setIsBottomSheetOpen(false);
      setTemplateKey((prev) => prev + 1);
      setIsTemplateLoading(false);
      setLoading(false);
    } catch (error) {
      setIsTemplateLoading(false);
      setLoading(false);
    }
  };

  const handleEyeIconClick = (template: any) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

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
        const filteredTemplates = response.data.result.filter(
          (template: any, index: number) => index !== 1 && index !== 3
        );

        setTemplates(filteredTemplates);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [session]);

  const toggleBottomSheet = () => {
    if (!isBottomSheetOpen) {
      setTempSelectedColor(selectedColor);
      setPreviewColor(selectedColor);
    }
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const cvvinfo = [
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
  ];

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = cvInfo.findIndex((item: any) => item.id === active.id);
      const newIndex = cvInfo.findIndex((item: any) => item.id === over?.id);

      setCvInfo((prev: any) => {
        const updatedCvInfo = [...prev];
        const [movedItem] = updatedCvInfo.splice(oldIndex, 1);
        updatedCvInfo.splice(newIndex, 0, movedItem);
        return updatedCvInfo;
      });
    }
  };

  // const handleEvaluate = () => {
  //   router.push("/dashboard");
  // };

  const handleEvaluate = async (id: any) => {
    // setLoading(true);
    try {
      const token = session.token;

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/update-template/${resumeData?._id}`,
        {
          template: resumeData.template?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/dashboard");
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    selectedTemplate;
  }, [selectedTemplate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("resumeData") || "{}");

    if (data) {
      setResumeData(data);
    }
  }, []);

  useEffect(() => {
    if (resumeData != null) {
      if (resumeData.template?.title === "tempate a") {
        setCvInfo([
          { id: "2", name: "ProfessionalTitle" },
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "6", name: "Certification" },
          { id: "8", name: "Software" },
          { id: "10", name: "Accomplishment" },
        ]);
      } else if (resumeData.template?.title === "tempate d") {
        setCvInfo([
          { id: "2", name: "ProfessionalTitle" },
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "5", name: "Skill" },
          { id: "6", name: "Certification" },
          { id: "8", name: "Software" },
        ]);
      } else if (resumeData.template?.title === "tempate e") {
        setCvInfo([
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "6", name: "Certification" },
          { id: "7", name: "Interest" },
          { id: "10", name: "Accomplishment" },
        ]);
      } else if (resumeData.template?.title === "tempate f") {
        setCvInfo([
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "6", name: "Certification" },
          { id: "7", name: "Interest" },
          { id: "10", name: "Accomplishment" },
        ]);
      } else if (resumeData.template?.title === "tempate g") {
        setCvInfo([
          { id: "2", name: "ProfessionalTitle" },
          { id: "3", name: "WorkExperience" },
          { id: "4", name: "Education" },
          { id: "6", name: "Certification" },
          { id: "8", name: "Software" },
        ]);
      } else if (resumeData.template?.title === "tempate i") {
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
      } else if (resumeData.template?.title === "tempate h") {
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
      } else if (resumeData.template?.title === "tempate b") {
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
      } else if (resumeData.template?.title === "tempate c") {
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
    if (resumeData) {
      getParsedScore(resumeData.score);
    }
  }, [resumeData]);

  const getTemplateComponent = () => {
    if (!resumeData) return null;
    switch (resumeData.template?.title) {
      case "tempate a":
        return (
          <Template1
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate b":
        return (
          <Template2
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate c":
        return (
          <Template3
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate d":
        return (
          <Template4
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate e":
        return (
          <Template5
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate f":
        return (
          <Template6
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate g":
        return (
          <Template7
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate h":
        return (
          <Template8
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate i":
        return (
          <Template9
            resumeData={resumeData}
            bgColor={selectedColor}
            cvInfo={cvvinfo}
          />
        );
      default:
        return null;
    }
  };

  const templateComponent = getTemplateComponent();

  const handlePrint = async () => {
    if (templateComponent) {
      const blob = await pdf(templateComponent).toBlob();
      const url = URL.createObjectURL(blob);
      const printWindow = window.open(url, "_blank");
      if (printWindow) {
        printWindow.addEventListener("load", () => {
          setTimeout(() => {
            printWindow.focus();
            printWindow.print();
          }, 500);
        });
      }
    }
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
      ];
    } else if (template === "tempate h") {
      return [
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
      ];
    } else if (template === "tempate c") {
      return [
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
      ];
    }
  };

  const colors = [
    { code: "#666666", name: "Gray" },
    { code: "#888888", name: "Black" },
    { code: "#48C9B0", name: "Turquoise" },
    { code: "#FF1A51", name: "Red" },
    { code: "#739cdb", name: "Blue" },
    { code: "#90AE85", name: "SeaGreen" },
    { code: "#6F5392", name: "RoyalPurple" },
    { code: "#799ACC", name: "BlueGray" },
    { code: "#359EBF", name: "BlueGreen" },
    { code: "#CD853F", name: "Bronze" },
  ];

  useEffect(() => {
    setTemplateKey((prev) => prev + 1);
  }, [cvInfo]);

  const getParsedScore = (score: any) => {
    if (score === "" || score === undefined) {
      return 0;
    } else {
      const cleanedResponse = score
        .replace(/```json/g, "") // Remove opening ```json
        .replace(/```/g, "") // Remove closing ```
        .replace(/###/g, "") // Remove ###
        .replace(/\*/g, "") // Remove asterisks
        .trim();
      setData(JSON.parse(cleanedResponse));
    }
  };

  return (
    <>
      {(loading || isTemplateLoading) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <img
            src="/images/resume.gif"
            alt="Loading..."
            className="w-[200px] h-[200px] rounded-full"
          />
        </div>
      )}
      <div className="flex w-full justify-center items-center min-h-screen">
        {resumeData && (
          <Wrapper1>
            <div className="bg-[#F3F3F3] w-full h-screen mx-auto grid grid-cols-[15%,55%,15%,15%]">
              {/* First Column (15%) */}
              <div className="bg-white p-4">
                {data && (
                  <>
                    <div className="bg-white rounded-xl h-auto p-5 flex justify-center items-center flex-col">
                      <span className="font-extrabold text-3xl text-[#cf7a7a]">
                        Total Score
                      </span>
                      <span className="font-extrabold text-2xl text-[#7aa6cf]">
                        {data.score}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <div className="rounded-xl flex justify-between items-center bg-[#e5e8f4] border border-[#6B84FE] p-3">
                        <span className="text-[#0F172A] text-sm font-normal">
                          Keyword Alignment
                        </span>
                        <span className="text-[#6B84FE] text-sm font-semibold">{`${data?.keyword_alignment}/15`}</span>
                      </div>
                      <div className="rounded-xl flex justify-between items-center bg-[#f4e9f4] border border-[#FA8BFF] p-3">
                        <span className="text-[#0F172A] text-sm font-normal">
                          Skills
                        </span>
                        <span className="text-[#FA8BFF] text-sm font-semibold">{`${data?.skill}/20`}</span>
                      </div>
                      <div className="rounded-xl flex justify-between items-center bg-[#dfebe7] border border-[#26A378] p-3">
                        <span className="text-[#0F172A] text-sm font-normal">
                          Experience
                        </span>
                        <span className="text-[#26A378] text-sm font-semibold">{`${data?.experience}/25`}</span>
                      </div>
                      <div className="rounded-xl flex justify-between items-center bg-[#f4dde3] border border-[#FF1A51] p-3">
                        <span className="text-[#0F172A] text-sm font-normal">
                          Education
                        </span>
                        <span className="text-[#FF1A51] text-sm font-semibold">{`${data?.education}/20`}</span>
                      </div>
                      <div className="rounded-xl flex justify-between items-center bg-[#f4dde3] border border-[#FF1A51] p-3">
                        <span className="text-[#0F172A] text-sm font-normal">
                          Achievements
                        </span>
                        <span className="text-[#FF1A51] text-sm font-semibold">{`${data?.achievements}/10`}</span>
                      </div>
                      <div className="rounded-xl flex justify-between items-center bg-[#dfeeee] border border-[#2CC4BF] p-3">
                        <span className="text-[#0F172A] text-sm font-normal">
                          Completeness
                        </span>
                        <span className="text-[#2CC4BF] text-sm font-semibold">{`${data?.completeness}/10`}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Second Column (55%) */}
              <div className="bg-gray p-4 ">
                <div className="bg-white shadow-lg overflow-auto  w-full h-full">
                  {cvInfo ? (
                    <TemplateManagement
                      key={templateKey}
                      name={resumeData.template.title}
                      bgColor={selectedColor}
                      resumeData={{
                        ...resumeData,
                        settings: {
                          ...resumeData.settings,
                          color: selectedColor,
                        },
                      }}
                      cvInfo={cvInfo}
                      height="auto"
                      width="100%"
                      tag="pdf"
                    />
                  ) : null}
                </div>
              </div>

              {/* Third Column (15%) */}
              <div className="bg-white p-4 ml-2 mr-2">
                <div className="flex border-b border-gray-300">
                  <button
                    onClick={() => setActiveTab("tab1")}
                    className={`flex-1 text-center py-3 font-semibold ${
                      activeTab === "tab1"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } transition`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setActiveTab("tab2")}
                    className={`flex-1 text-center py-3 font-semibold ${
                      activeTab === "tab2"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } transition`}
                  >
                    Swap
                  </button>
                </div>
                <div className="p-6">
                  {activeTab === "tab1" && (
                    <div>
                      {cvInfo && (
                        <SortableContext
                          items={resumeEdit.map((item: any) => item.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="flex flex-col items-start w-full">
                            {resumeEdit.map((cvItem: any) => (
                              <SortableItem key={cvItem.name} item={cvItem} />
                            ))}
                          </div>
                        </SortableContext>
                      )}
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div>
                      {cvInfo && (
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext
                            items={cvInfo.map((item: any) => item.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            <div className="flex flex-col items-start w-full">
                              {cvInfo.map((cvItem: any) => (
                                <SortableItem key={cvItem.id} item={cvItem} />
                              ))}
                            </div>
                          </SortableContext>
                        </DndContext>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Fourth Column (15%) */}
              <div className="bg-white p-4 ">
                {templateComponent && (
                  <PDFDownloadLink
                    document={templateComponent}
                    fileName="resume.pdf"
                    className="flex items-center"
                  >
                    <div className="ml-3 h-12 w-12 cursor-pointer border rounded-3xl flex items-center justify-center transition-transform duration-300 transform hover:scale-105 bg-gray-100">
                      <span className="flex items-center">
                        <Image
                          src="/images/svgs/download.svg"
                          alt="Download icon"
                          height={20}
                          width={20}
                          className="download-icon"
                        />
                      </span>
                    </div>
                    <div className="mx-3 text-[16px] text-[#666666] cursor-pointer">
                      Download
                    </div>
                  </PDFDownloadLink>
                )}

                <Button
                  onClick={() => toggleBottomSheet()}
                  className="!flex !justify-start mt-3 mb-3"
                >
                  <div className="flex items-center">
                    <div className="ml-3 h-12 w-12 cursor-pointer border rounded-3xl flex items-center justify-center transition-transform duration-300 transform hover:scale-105 bg-gray-100">
                      <span className="flex items-center">
                        <Image
                          src="/images/svgs/printer.svg"
                          alt="print icon"
                          height={20}
                          width={20}
                          className="print-icon"
                        />
                      </span>
                    </div>
                    <div className="mx-3 text-[16px] text-[#666666]">
                      Template
                    </div>
                  </div>
                </Button>

                {isBottomSheetOpen && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleBottomSheet}
                  ></div>
                )}
                <div
                  className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-gray-100 to-gray-50 shadow-2xl p-6 rounded-t-lg 
                          transform transition-transform duration-500 z-50 max-h-[80vh] overflow-y-auto ${
                            isBottomSheetOpen
                              ? "translate-y-0"
                              : "translate-y-full"
                          }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="mt-4 md:mt-0">
                      <span className="cursor-pointer text-base md:text-md font-medium flex text-1E293B">
                        Colors &nbsp;
                        {colors.map((color) => (
                          <span
                            key={color.code}
                            className={`h-[20px] w-[20px] md:h-[26px] md:w-[26px] border-sm rounded-full border mr-1
                          ${
                            tempSelectedColor === color.code
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                            style={{ backgroundColor: color.code }}
                            onClick={() => handleColorClick(color)}
                          ></span>
                        ))}
                      </span>
                    </div>
                    <button
                      className="text-3xl font-bold text-gray-600 hover:text-black transition-all duration-300"
                      onClick={toggleBottomSheet}
                    >
                      &times;
                    </button>
                  </div>

                  <Carousel
                    dots={true}
                    arrows={true}
                    infinite
                    slidesToShow={4}
                    slidesToScroll={4}
                    prevArrow={
                      <button>
                        <div
                          style={{
                            height: " 35px",
                            width: "35px",
                            background: "white",
                            justifyContent: "center",
                            display: " flex",
                            alignItems: "center",
                            borderRadius: "50%",
                            border: "1px solid #ddd",
                          }}
                        >
                          <Image
                            src="/images/svgs/arrow-left.svg"
                            alt="..."
                            height={24}
                            width={24}
                          />
                        </div>
                      </button>
                    }
                    nextArrow={
                      <button>
                        <div
                          style={{
                            height: " 35px",
                            width: "35px",
                            background: "white",
                            justifyContent: "center",
                            display: " flex",
                            alignItems: "center",
                            borderRadius: "50%",
                            marginLeft: "-15px",
                            border: "1px solid #ddd",
                          }}
                        >
                          <Image
                            src="/images/svgs/arrow-right.svg"
                            alt="..."
                            height={24}
                            width={24}
                          />
                        </div>
                      </button>
                    }
                    pauseOnHover={true}
                    className="mt-8 max-w-[1500px]  mx-auto rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500"
                  >
                    {templates.length > 0 ? (
                      templates.map((template, index) => (
                        <div
                          className="relative flex flex-col items-center justify-center p-4 sm:p-6 group rounded-lg shadow-lg bg-white hover:shadow-2xl transition-all duration-500 max-w-sm mx-auto"
                          key={index}
                        >
                          {/* <div
                            className="absolute cursor-pointer inset-0 z-10 bg-black h-[380px] bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-500 ease-in-out"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEyeIconClick(template);
                            }}
                          >
                            <FaEye className="text-3xl md:text-4xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div> */}

                          <div className="bg-white rounded-lg overflow-auto shadow-lg transform transition-transform duration-500 group-hover:scale-105 hover:shadow-xl w-full h-[350px] overflow-y-auto scrollbar-hide">
                            <TemplateManagement
                              name={template.title}
                              bgColor={previewColor}
                              resumeData={{
                                ...resumeData,
                                settings: {
                                  ...resumeData.settings,
                                  color: previewColor,
                                },
                              }}
                              cvInfo={getCvinfo(template.title)}
                              tag="htmlsm"
                              height={"450px"}
                              maxWidth={"450px"}
                              width={"100%"}
                            />
                          </div>
                          <Button
                            onClick={() => handleTemplateSelection(template)}
                            className="mt-4 py-2 text-sm md:text-base font-semibold rounded-lg h-[50px] md:h-[60px] text-gray-700 bg-white hover:bg-[#6B84FE] hover:text-white shadow-md hover:shadow-lg transition-all duration-300 w-full"
                          >
                            Choose Template
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-lg md:text-xl font-semibold text-gray-500">
                          No templates available.
                        </p>
                        <FaSadTear className="text-gray-300 text-3xl md:text-4xl mt-4" />
                      </div>
                    )}
                  </Carousel>
                </div>

                {showModal && selectedTemplate && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white h-[90vh] max-h-screen overflow-y-auto modal-newspaper rounded-lg p-6 w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/2 relative shadow-lg">
                      {/* Close Button */}
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
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

                      {/* Template Content */}
                      <TemplateManagement
                        name={selectedTemplate.title}
                        bgColor={previewColor}
                        resumeData={{
                          ...resumeData,
                          settings: {
                            ...resumeData.settings,
                            color: previewColor,
                          },
                        }}
                        cvInfo={getCvinfo(selectedTemplate.title)}
                        height="100%"
                        width="100%"
                        tag="html"
                      />
                    </div>
                  </div>
                )}

                {templateComponent && (
                  <Button
                    onClick={() => handlePrint()}
                    className="!flex !justify-start"
                  >
                    <div className="flex items-center">
                      <div className="ml-3 h-12 w-12 cursor-pointer border rounded-3xl flex items-center justify-center transition-transform duration-300 transform hover:scale-105 bg-gray-100">
                        <span className="flex items-center">
                          <Image
                            src="/images/svgs/printer.svg"
                            alt="print icon"
                            height={20}
                            width={20}
                            className="print-icon"
                          />
                        </span>
                      </div>
                      <div className="mx-3 text-[16px] text-[#666666]">
                        Print
                      </div>
                    </div>
                  </Button>
                )}
                <Button
                  className="h-12 w-full mt-4 cursor-pointer border bg-amber-300 font-semibold px-2 rounded-lg flex items-center justify-center transition-transform duration-300 hover:text-white transform hover:scale-105"
                  onClick={handleEvaluate}
                >
                  Finish
                </Button>
              </div>
            </div>
          </Wrapper1>
        )}
      </div>
    </>
  );
};

const SortableItem = ({
  item,
}: {
  item: { id: string; name: string; route: string };
}) => {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = () => {
    router.push(item.route); // Redirects to the route specified in item.route
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className="bg-white shadow-md md:flex-col flex-row rounded-lg p-6 mb-4 w-full transition-transform duration-300 hover:scale-105 truncate cursor-pointer"
    >
      {item.name}
    </div>
  );
};

export default withAuth(Finalize);
