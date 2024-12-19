import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";

const Summary = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const { data: session }: any = useSession();
  const router = useRouter();

  const handleNextClick = async () => {
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume`,
        {
          jobTitle,
          jobDescription,
          color: "#666666",
        },
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
        router.push("/preview");
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Your Resume
          </h1>
          <div className="mb-4">
            <label
              htmlFor="jobTitle"
              className="block text-gray-700 font-medium mb-2"
            >
              Job Title *
            </label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              required={true}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title "
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="jobDescription"
              className="block text-gray-700 font-medium mb-2"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              required={true}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter job description"
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            ></textarea>
          </div>
          <button
            onClick={handleNextClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300"
          >
            Generate CV
          </button>
        </div>
      </div>
    </>
  );
};

export default Summary;
