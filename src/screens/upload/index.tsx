import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import MainNavbar from "@/components/MainNavbar";

const UploadResume = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<any>({});
  const [color, setColor] = useState<any>({});

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setResumeFile(null);
    setResumeName(null);
  };

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

  const handleSubmit = async () => {
    if (!resumeFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("template", template._id);
    formData.append("color", color);
    formData.append("title", template.title);
    try {
      const token = session.token;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume`,
        formData,
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
      setLoading(false);
    } catch (error) {
      alert("An error occurred while uploading the file.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="w-full bg-auth">
      {status === "authenticated" ? <Navbar welcomeText="" showNavItems={true} showRight={true} /> : <MainNavbar />}
        <div className="relative min-h-screen py-5 px-4 md:px-10">
          <span className="text-2xl md:text-3xl font-semibold text-0F172A flex justify-center mt-12">
            Are You Uploading An Existing Resume?
          </span>

          <div className="max-w-[1060px] mx-auto rounded-lg p-6 mt-5">
            <div className="flex flex-col md:flex-row items-center justify-center">
              {/* Drag and Drop Box */}
              <div
                className={`relative border-2 ${
                  resumeName ? "border-solid" : "border-dashed"
                } border-purple-900 rounded-lg p-8 text-center w-full md:w-[500px] h-[250px] ${
                  resumeName ? "flex items-center justify-center" : ""
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {resumeName && (
                  <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={handleClose}
                  >
                    <FaTimes />
                  </button>
                )}
                {resumeName ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Image
                      src="/images/svgs/preview1.svg"
                      alt="Skill Highlight"
                      width={40}
                      height={40}
                      className="mb-2"
                    />
                    <p className="text-lg text-gray-800">{resumeName}</p>
                    <label className="cursor-pointer bg-purple-900 text-white px-7 py-2 rounded-3xl mt-4">
                      Change
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Image
                      src="/images/svgs/upload1.svg"
                      alt="Upload Icon"
                      width={40}
                      height={40}
                      className="mb-2"
                    />
                    <p className="text-gray-600 mb-4">
                      Drag and drop your resume here
                    </p>
                    <label className="cursor-pointer bg-purple-900 text-white px-7 py-2 rounded-3xl">
                      Browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* {!resumeName && (
							<p className="mx-4 text-gray-600 text-xl px-10">or</p>
						)}

						{!resumeName && (
							<div className="flex flex-col md:flex-col items-center gap-4 mt-4 md:mt-0">
								<Button
									disabled
									className="h-12 bg-gray-300 text-gray-600 text-l w-[230px] rounded-3xl cursor-not-allowed flex items-center justify-center gap-2"
									iconSrc="/images/svgs/Googledrive.svg"
								>
									Google Drive
								</Button>
							</div>
						)} */}
            </div>

            <span className="text-lg text-gray-500 mb-4 flex justify-center items-center mt-8">
              <b className="text-black">File we can read</b>: PDF, DOC, DOCX,
              HTML, RTF, TXT
            </span>

            {/* Back and Next Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 mt-20">
              <Button
                onClick={() => router.push("/experience1")}
                className="h-12 bg-transparent hover:bg-[#666666] hover:text-white border border-666666 text-666666 px-14 rounded-lg"
              >
                Back
              </Button>
              <Button
                disabled={!resumeFile}
                className={`h-12 border border-[#6B84FE] px-14 rounded-lg ${
                  !resumeFile
                    ? "opacity-50 bg-gray-500 cursor-not-allowed text-gray-700"
                    : "bg-transparent text-666666 hover:bg-[#6B84FE] hover:text-white"
                }`}
                onClick={handleSubmit}
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

export default UploadResume;
