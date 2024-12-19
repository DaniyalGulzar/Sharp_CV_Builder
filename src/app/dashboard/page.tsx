"use client";

import React, { useState, useEffect } from "react";
import { DownOutlined, ExclamationOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useSession } from "next-auth/react";
import Wrapper from "@/components/Wrapper";
import Button from "@/components/Button";
import { Steps } from "antd";
import Image from "next/image";
import TableLayout from "@/components/Tablelayout";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import TemplateManagement from "@/components/TemplateManagement";
import { Check } from "lucide-react";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import ResumeScoreModal from "@/components/scoreModal";

interface Resume {
  _id: string;
  title: string;
  percentage: string;
  createdAt: string;
  updatedAt: string;
  score?: string;
  parsedScore?: number;
}

import { FaTimes } from "react-icons/fa";

function Dashboard() {
  const [role, setRole] = useState<string | null>(null);

  const { data: session }: any = useSession();
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState<Resume[]>([]);
  const [dropdownData, setDropdownData] = useState<any[]>([]);
  const [improveData, setImproveData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const [error, setError] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [selectedResumeTitle, setSelectedResumeTitle] = useState<string>(
    "No Resume `Selected`"
  );
  const [showModal, setShowModal] = useState(false);

  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [tableScores, setTableScores] = useState<Record<string, number | null>>(
    {}
  );
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

  const [resumeData, setResumeData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const cvInfo = [
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

  const router = useRouter();

  const handleMenuClick = (e: any) => {
    if (e.key) {
      const selectedItem = dropdownData.find(
        (item) => item._id === e.key || item.id === e.key
      );
      if (selectedItem) {
        setSelectedValue(selectedItem.title);
        setSelectedTemplateId(selectedItem._id || selectedItem.id);
        setSelectedResumeTitle(selectedItem.title);
        setSelectedResumeId(selectedItem._id || selectedItem.id);
        setResumeData(selectedItem);
        localStorage.setItem("selectedResumeTitle", selectedItem.title);
      }
    }
  };

  const openPreview = (_id: any) => {
    // Find the item with the matching _id in the data array
    const item = data.find((entry) => entry._id === _id);

    setPreviewTemplate(item);
    setShowModal(true);
  };

  const handleCreateResume = () => {
    if (
      isFieldEmpty(profileData?.heading, ["firstName", "lastName", "phone"]) ||
      !profileData?.summary?.value ||
      !profileData?.workHistory?.data?.length ||
      !profileData?.skill?.data?.length
    ) {
      toast.error("Please complete your profile.");
    } else {
      setLoading(true);
      router.push("/createNewResume");
      setLoading(false);
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {dropdownData.length == 0 ? (
        <Menu.Item key={null}>No Item Found</Menu.Item>
      ) : (
        dropdownData.map((item) => (
          <Menu.Item key={item._id || item.id}>{item.title}</Menu.Item>
        ))
      )}
    </Menu>
  );

  const fetchProfileData = async () => {
    if (!session) return;
    try {
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/profile/showByUser/${session.user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //setResumeData(response.data.result.data);
      setProfileData(response.data.result.data);
    } catch (err) {
    } finally {
    }
  };

  const fetchData = async () => {
    // setLoading(true);
    try {
      const token = session.token; // Access token from user object
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/recent`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
          },
        }
      );
      const sortedData = response.data.result;
      setDropdownData(response.data.result);

      if (sortedData.length > 0) {
        const mostRecentResume = sortedData[0];
        const selectedTitle = mostRecentResume.title;
        setSelectedValue(selectedTitle);
        setSelectedTemplateId(mostRecentResume._id || mostRecentResume.id);
        setSelectedResumeTitle(selectedTitle);
        setSelectedResumeId(mostRecentResume._id || mostRecentResume.id);
        setResumeData(mostRecentResume);
        localStorage.setItem("selectedResumeTitle", selectedTitle);
      }
      setData(response.data.result);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTips = async () => {
    // setLoading(true);
    const token = session.token; // Access token from user object
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NEXT_URL}api/step`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      localStorage.setItem("tips", JSON.stringify(response.data.result));
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    getTips();
    fetchProfileData();
  }, [session]);

  const handleResumeList = () => {
    router.push("/resume-list");
  };

  const handleEditResume = async (id: string) => {
    setLoading(true);
    try {
      const token = session.token;
      // Call the API to edit the resume
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/${id}`,
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
        setLoading(false);

        router.push("/header");
      }
    } catch (error) {}
  };

  const handleDeleteResume = async (resumeId: any) => {
    // Show confirmation message using SweetAlert
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const token = session.token; // Access token from user object

        // Call API to delete the resume
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/${resumeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your actual token
            },
          }
        );

        // Show success message
        Swal.fire("Deleted!", "Your resume has been deleted.", "success");
        setLoading(false);
        fetchData();
      } catch (error) {
        // Handle error
        Swal.fire(
          "Error!",
          "There was a problem deleting your resume.",
          "error"
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!session) return;
    fetchData();
  }, [session]);

  const getParsedScore = (score: any) => {
    if (score === "") {
      return 0;
    } else {
      const cleanedResponse = score
        .replace(/```json/g, "") // Remove opening ```json
        .replace(/```/g, "") // Remove closing ```
        .replace(/###/g, "") // Remove ###
        .replace(/\*/g, "") // Remove asterisks
        .trim();
      const parsedResponse = JSON.parse(cleanedResponse);

      return parsedResponse.score;
    }
  };

  useEffect(() => {
    if (!session) return;
    setRole(session.user.role);
  }, [session]);

  const columns = [
    {
      header: "My Resumes",
      accessor: "title",
      Cell: ({ value }: { value: string }) => (
        <span className="font-semibold">{value}</span>
      ),
    },
    {
      header: "Modification",
      accessor: "updatedAt",
      Cell: ({ value }: { value: string }) => (
        <span className="font-semibold">
          {moment(value).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      header: "Creation",
      accessor: "createdAt",
      Cell: ({ value }: { value: string }) => (
        <span className="font-semibold">
          {moment(value).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      header: "Resume Strength",
      accessor: "score",
      Cell: ({ value }: { value: any }) => {
        const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

        return (
          <>
            <div
              className="flex justify-center items-center w-[80px] h-[28px] rounded-full bg-[#6B84FE] text-sm font-bold text-white cursor-pointer"
              onClick={() => setIsScoreModalOpen(true)}
            >
              {getParsedScore(value)}
            </div>

            <ResumeScoreModal
              isOpen={isScoreModalOpen}
              onClose={() => setIsScoreModalOpen(false)}
              score={value}
            />
          </>
        );
      },
    },
    {
      header: "Action",
      accessor: "_id",
      Cell: ({ value }: { value: string }) => (
        <div className="flex items-center gap-1">
          <button
            className="flex flex-col cursor-pointer"
            onClick={() => handleEditResume(value)}
          >
            <Image
              src="/images/svgs/edit-res.svg"
              alt="Edit"
              height={20}
              width={20}
            />
          </button>
          <button
            className="flex flex-col cursor-pointer"
            onClick={() => handleDeleteResume(value)}
          >
            <Image
              src="/images/svgs/fluent_delete-24-regular.svg"
              alt="Delete"
              height={20}
              width={20}
            />
          </button>
          <button>
            <Image
              src="/images/svgs/eye.svg"
              alt="View Details"
              height={20}
              width={20}
              onClick={() => openPreview(value)}
              className="cursor-pointer"
            />
          </button>
          {/* <PDFDownloadLink
            document={
              <PDFTemplate
                name={resumeData?.template?.title || "Resume"}
                bgColor={selectedColor}
                resumeData={resumeData}
                cvInfo={cvInfo}
              />
            }
            fileName={`${resumeData?.template?.title || "resume"}.pdf`}
          >
            <button className="flex flex-col cursor-pointer">
              <Image
                src="/images/svgs/download-res.svg"
                alt="Download"
                height={20}
                width={20}
              />
            </button>
          </PDFDownloadLink> */}

          {/* <button
            className={`text-xs flex justify-center items-center w-[80px] h-[28px] font-semibold rounded-lg ${
              tableScores[value] !== undefined
                ? "bg-[#6B84FE] text-white"
                : "bg-blue-500 text-white"
              }`}
            onClick={() => handleImproveResume(value, true)}
            disabled={loadingIds[value] || false}
          >
            {tableScores[value] !== undefined ? (
              <div className="flex justify-center items-center w-[80px] h-[28px] rounded-full bg-[#6B84FE] text-sm font-bold text-white">
                {tableScores[value]}
              </div>
            ) : (
              "View Score"
            )}
          </button> */}
        </div>
      ),
    },
  ];

  // Utility function to check if fields are empty
  const isFieldEmpty = (fields: any, keys: string[]) => {
    return !fields || keys.some((key) => !fields[key]);
  };

  // Utility function to generate icon
  const getIcon = (isError: boolean) => {
    return (
      <div
        style={{
          backgroundColor: isError ? "#FF4131" : "#26A378",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 34,
          height: 34,
          cursor: "pointer",
        }}
      >
        {isError ? (
          <ExclamationOutlined className="text-2xl" />
        ) : (
          <Check className="text-2xl" />
        )}
      </div>
    );
  };

  const items: any = [
    {
      title: "Contact Info",
      status: isFieldEmpty(profileData?.heading, [
        "firstName",
        "lastName",
        "phone",
      ])
        ? "error"
        : "finish",
      icon: getIcon(
        isFieldEmpty(profileData?.heading, ["firstName", "lastName", "phone"])
      ),
      path: "/profile?step=1",
    },
    {
      title: "Professional Summary",
      status:
        !profileData?.summary?.value ||
        profileData.summary.value.trim() === "<p></p>"
          ? "error"
          : "finish",
      icon: getIcon(
        !profileData?.summary?.value ||
          profileData.summary.value.trim() === "<p></p>"
      ),
      path: "/profile?step=2",
    },
    {
      title: "Work History",
      status: !profileData?.workHistory?.data?.length ? "error" : "finish",
      icon: getIcon(!profileData?.workHistory?.data?.length),
      path: "/profile?step=3",
    },
    {
      title: "Education",
      status: !profileData?.education?.data?.length ? "error" : "finish",
      icon: getIcon(!profileData?.education?.data?.length),
      path: "/profile?step=4",
    },
    {
      title: "Skills",
      status: !profileData?.skill?.data?.length ? "error" : "finish",
      icon: getIcon(!profileData?.skill?.data?.length),
      path: "/profile?step=5",
    },
  ];

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleStepClick = (index: number) => {
    router.push(`/profile?step=${index + 1}`);
  };

  const handleEditClick = () => {
    // Navigate to the preview screen
    router.push("/preview");
  };

  const comingsoontoast = () => {
    toast.success("Coming Soon");
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="flex w-full">
        {role === "User" ? (
          <>
            <div className="bg-[#fcf5ef] flex w-full">
              <Wrapper>
                <div className="mx-4 md:mx-[30px] mb-[30px]">
                  <div className="mt-4 md:mt-[56px]">
                    <div className="grid grid-cols-12 gap-4 mb-[30px]">
                      <div className="col-span-12 lg:col-span-9">
                        <span className="text-2xl font-semibold text-[#0F172A]">
                          Your Recommended Next Step
                        </span>
                        <div className="shadow-[0px_4px_60px_0px_#00000014] rounded-[22px] bg-white p-6 mt-4">
                          <div className="flex items-center gap-4">
                            <span className="text-[20px] font-medium">
                              Profile
                            </span>
                          </div>
                          <div className="mt-6">
                            {/* <Steps
                              current={1}
                              labelPlacement="vertical"
                              items={items.map((item: any) => ({
                                ...item,
                                onClick: () => handleStepClick(item.path), // Add click handling
                              }))}
                            /> */}
                            <Steps
                              current={1}
                              labelPlacement="vertical"
                              items={items.map((item: any, index: number) => ({
                                ...item,
                                onClick: () => handleStepClick(index), // Pass the index instead of path
                              }))}
                            />
                          </div>
                          <div className="flex flex-col gap-3 mt-[30px]">
                            <Button
                              onClick={() => router.push("/profile?step=1")}
                              className="text-base font-medium bg-gradient-button rounded-lg mt-4 px-10 h-[60px] text-white "
                            >
                              Edit
                            </Button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
                          <div className="rounded-[22px] bg-[#eff3fe] border border-[#8ea1fd] shadow-[0px_4px_60px_0px_#00000014] p-5">
                            <div className="flex gap-4">
                              <Image
                                src="/images/svgs/card.svg"
                                alt="..."
                                height={32}
                                width={32}
                              />
                              <span className="text-[#0F172A] text-[20px] font-medium">
                                Claim Your Custom URL
                              </span>
                            </div>
                            <div className="my-4">
                              <span className="text-sm font-normal text-[#555370]">
                                {
                                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus try's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scram bled it to make a type specimen book.  and scrambled it to make a type specimen book."
                                }
                              </span>
                            </div>
                            <div>
                              <Button
                                onClick={() => comingsoontoast()}
                                className="text-sm font-semibold text-white px-[28px] mt-1 bg-[#26A378] h-[48px] rounded-lg"
                              >
                                Claim My URL
                              </Button>
                            </div>
                          </div>
                          <div className="rounded-[22px] bg-[#fff4ee] border border-[#fea76d] shadow-[0px_4px_60px_0px_#00000014] p-5">
                            <div className="flex gap-4">
                              <Image
                                src="/images/svgs/inbox.svg"
                                alt="..."
                                height={32}
                                width={32}
                              />
                              <span className="text-[#0F172A] text-[20px] font-medium">
                                Ace Your Interviews
                              </span>
                            </div>
                            <div className="my-4">
                              <span className="text-sm font-normal text-[#555370]">
                                {
                                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus try's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scram bled it to make a type specimen book.  and scrambled it to make a type specimen book."
                                }
                              </span>
                            </div>
                            <div>
                              <Button
                                onClick={() => comingsoontoast()}
                                className="text-sm font-semibold text-white px-[28px] mt-1 bg-[#FF8C40] h-[48px] rounded-lg"
                              >
                                Visit Big Interview
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 lg:col-span-3">
                        <span className="text-2xl font-semibold text-[#0F172A]">
                          Resume{" "}
                        </span>
                        <div className="mt-3 w-full">
                          <Dropdown
                            overlay={menu}
                            trigger={["click"]}
                            className="w-full"
                          >
                            <span className="cursor-pointer bg-white flex justify-between items-center border border-[#DAE0FF] shadow-[0px_4px_60px_0px_#00000014] text-[#555370] h-[56px] w-full rounded-2xl px-2">
                              <span
                                className="uppercase "
                                style={{ width: "100%" }}
                              >
                                {selectedValue || "Select an option"}
                              </span>{" "}
                              <DownOutlined />
                            </span>
                          </Dropdown>
                        </div>
                        <div className="shadow-[0px_4px_60px_0px_#00000014] rounded-2xl p-4 bg-white my-4">
                          <div className="flex justify-between items-center">
                            {resumeData?.template ? (
                              <div
                                className="flex gap-3 items-end  mb-4 "
                                style={{
                                  justifyContent: "flex-end",
                                  width: "100%",
                                }}
                              >
                                <Image
                                  src="/images/svgs/edit-res.svg"
                                  alt="Edit Resume"
                                  height={20}
                                  width={20}
                                  onClick={handleEditClick}
                                  className="cursor-pointer"
                                />
                                {/* <PDFDownloadLink
                                document={
                                  <PDFTemplate
                                    name={
                                      resumeData?.template?.title || "Resume"
                                    }
                                    bgColor={selectedColor}
                                    resumeData={resumeData}
                                    cvInfo={cvInfo}
                                  />
                                }
                                fileName={`${resumeData?.template?.title || "resume"
                                  }.pdf`}
                              >
                                <button className="cursor-pointer w-[24px] mt-[5px]">
                                  <Image
                                    src="/images/svgs/download-res.svg"
                                    alt="Download Resume"
                                    height={20}
                                    width={20}
                                    className="w-[24px]"
                                  />
                                </button>
                              </PDFDownloadLink> */}
                              </div>
                            ) : null}
                          </div>

                          <div className="bg-white rounded-lg border border-green-500  overflow-hidden shadow-lg transform transition-transform duration-500 group-hover:scale-105 hover:shadow-xl w-full h-[350px] overflow-y-auto scrollbar-hide ">
                            {resumeData?.template ? (
                              <TemplateManagement
                                name={resumeData?.template?.title}
                                bgColor={
                                  resumeData?.settings.color || "#6b84fe"
                                }
                                resumeData={resumeData}
                                cvInfo={cvInfo}
                                tag="htmlsm"
                                height={"450px"}
                                maxWidth={"450px"}
                                width={"100%"}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-500 text-center">
                                  Please create a resume
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Image
                              src="/images/svgs/star-filled.svg"
                              alt="..."
                              height={20}
                              width={20}
                            />
                            <span className="text-sm font-normal text-[#555370]">
                              This is your{" "}
                              <span className="text-[#0F172A]"> Primary </span>{" "}
                              resume
                            </span>
                          </div>
                          {resumeData !== null && (
                            <>
                              <div
                                className="flex justify-between items-center mt-[10px] mb-[10px] cursor-pointer"
                                onClick={() => setIsScoreModalOpen(true)}
                              >
                                <span className="text-[#0F172A] text-sm font-medium">
                                  Resume Score
                                </span>
                                <div className="flex items-center gap-2 p-3 h-[48px] rounded-full bg-[#f0f3ff] text-sm font-normal text-[#0F172A]">
                                  <div className="h-[36px] w-[36px] flex justify-center items-center rounded-full bg-[#6B84FE] text-sm font-bold text-white">
                                    {getParsedScore(resumeData.score)}
                                  </div>
                                </div>
                              </div>

                              <ResumeScoreModal
                                isOpen={isScoreModalOpen}
                                onClose={() => setIsScoreModalOpen(false)}
                                score={resumeData.score}
                              />
                            </>
                          )}
                        </div>
                        <Button
                          onClick={handleCreateResume}
                          className="w-full  text-base font-medium bg-gradient-button h-[56px] text-white rounded-xl"
                        >
                          + Create New Resume
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px] mb-6 flex justify-between items-center">
                    <span className="text-[#0F172A] text-2xl font-semibold">
                      My Resumes
                    </span>
                    <Button
                      onClick={handleResumeList}
                      className="bg-[#0F172A] rounded-lg h-[40px] text-sm font-semibold text-white px-7"
                    >
                      View All
                    </Button>
                  </div>
                  <div>
                    <TableLayout
                      columns={columns}
                      data={data}
                      isHrVisible={false}
                    />
                  </div>
                </div>
              </Wrapper>
            </div>
          </>
        ) : null}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-xl rounded-2xl p-6 w-[900px] max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">
                Resume Improvement Details
              </span>
              <button
                onClick={closeModal}
                className="text-gray-500 flex items-center justify-center"
                aria-label="Close Modal"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Score: {modalData?.score}
              </span>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Keyword Alignment: {modalData?.keyword_alignment}
              </span>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Skill: {modalData?.skill}
              </span>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Education: {modalData?.education}
              </span>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Experience: {modalData?.experience}
              </span>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Achievements: {modalData?.achievements}
              </span>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Grammar Mistakes: {modalData?.grammer_mistake}
              </span>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Completeness: {modalData?.completeness}
              </span>
            </div>
            <hr className="py-2" />
            <div className="mb-4">
              <span className="text-sm font-medium">
                Relevant to Job Title:{" "}
                {modalData?.relevant_to_job_title ? "Yes" : "No"}
              </span>
            </div>
            <hr className="py-2" />
            <div className="flex justify-center mt-4">
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-blue-600 text-white rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && previewTemplate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white h-[90vh] mb-3 max-h-screen  overflow-y-auto scrollbar-hide modal-newspaper rounded-lg p-6 w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/2 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
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
            <div className="   w-full  ">
              {resumeData?.template ? (
                <TemplateManagement
                  name={previewTemplate.template.title}
                  bgColor={previewTemplate.settings.color || "#6b84fe"}
                  resumeData={previewTemplate}
                  cvInfo={cvInfo}
                  tag="html"
                  height={"100vh"}
                  width="100%"
                  maxWidth={"100%"}
                />
              ) : (
                <p>Please create a resume</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
