import React, { useEffect, useRef, useState } from "react";
import MainNavbar from "@/components/MainNavbar";
import Button from "@/components/Button";
import SEARCH from "../../../public/images/svgs/search.svg";
import LIGHTBULB from "../../../public/images/svgs/lightbulb.svg";
import SETTINGS from "../../../public/images/svgs/setting.svg";
import HOME_SCREEN_IMAGE from "../../../public/images/svgs/home-screen-image.svg";
import READELSEVIER from "../../../public/images/svgs/readelsevier.svg";
import VUORI from "../../../public/images/svgs/vuori.svg";
import VERSED from "../../../public/images/svgs/versed.svg";
import MATRIXIAN from "../../../public/images/svgs/matrixian.svg";
import MANSCAPED from "../../../public/images/svgs/manscaped.svg";
import LIPPA from "../../../public/images/svgs/lippa.svg";
import ABOUT_IMAGE from "../../../public/images/svgs/about-image.svg";
import RESUME_IMAGE_1 from "../../../public/images/svgs/resume-image-1.svg";
import RESUME_IMAGE_2 from "../../../public/images/svgs/resume-image-2.svg";
import RESUME_IMAGE_3 from "../../../public/images/svgs/resume-image-3.svg";
import CV from "../../../public/images/svgs/cv.svg";
import SUPPORT from "../../../public/images/svgs/support.svg";
import UNITED from "../../../public/images/svgs/united.svg";
import COVER_LETTER from "../../../public/images/svgs/cover-letter.svg";
import CONTENT from "../../../public/images/svgs/content-marketing.svg";
import RESUME from "../../../public/images/svgs/Resume-letter.svg";
import GROUP_IMAGE from "../../../public/images/pngs/Group-image.png";
import RESUME_IMAGE_SEC_3 from "../../../public/images/svgs/resume-image-sec-3.svg";
import AVATAR_PIXEL from "../../../public/images/pngs/Avatar pixel.png";
import LINKEDIN from "../../../public/images/svgs/el_linkedin.svg";
import LEFT_ARROW from "../../../public/images/svgs/left-arrow-caro.svg";
import RIGHT_ARROW from "../../../public/images/svgs/right-arrow-caro.svg";
import COMING_SOON from "../../../public/images/svgs/coming-soon.svg";
import GUIDE_SEC_IMAGE from "../../../public/images/svgs/guide-sec-image.svg";
import PREV_BUTTON_GRAY from "../../../public/images/svgs/prev-button-gray.svg";
import NEXT_BUTTON_GRAY from "../../../public/images/svgs/next-button-gray.svg";
import Image from "next/image";
import Footer from "../footer";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "@/components/InputField";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import SubscriptionDashboard from "@/components/SubscriptionDashboard";
import Loader from "@/components/Loader";
import TemplateManagement from "@/components/TemplateManagement";
import Navbar from "@/components/Navbar";

const testimonials = [
  {
    name: "Colin Wood Alison",
    role: "CAREER BLOGGER",
    image: AVATAR_PIXEL,
    testimonial:
      "What I like about Zety resumes is their user-friendly interface and customization options. You can choose from 18 sleek templates and easily modify the design, layout, colors, and fonts to create a unique and professional-looking resume. Additionally, Zety offers pre-written content tailored to different job positions, saving users valuable time compared to crafting their resumes from scratch.",
    socialImage: LINKEDIN,
  },
  {
    name: "Emma Johnson",
    role: "HR MANAGER",
    image: AVATAR_PIXEL,
    testimonial:
      "SharpDesk made it so easy for me to build a resume that stands out. The guided process ensures that all critical aspects of a resume are covered, and the templates are top-notch. I highly recommend it to anyone looking to land a job quickly.",
    socialImage: LINKEDIN,
  },
  {
    name: "Michael Scott",
    role: "REGIONAL MANAGER",
    image: AVATAR_PIXEL,
    testimonial:
      "I was able to create a professional resume in no time with SharpDesk. The tips and suggestions were incredibly helpful, and the templates were exactly what I was looking for. It made my job search process much more manageable.",
    socialImage: LINKEDIN,
  },
  {
    name: "Samantha Brown",
    role: "MARKETING SPECIALIST",
    image: AVATAR_PIXEL,
    testimonial:
      "The AI-driven resume builder from SharpDesk is a game-changer. It helped me tailor my resume to specific job applications with ease. I got multiple interview calls within a week after using it. Highly recommended!",
    socialImage: LINKEDIN,
  },
  {
    name: "David Williams",
    role: "SOFTWARE ENGINEER",
    image: AVATAR_PIXEL,
    testimonial:
      "I had been struggling to create a resume that truly represented my skills and experience. SharpDesk made it so simple and efficient. The end result was a polished, professional resume that I'm proud to share.",
    socialImage: LINKEDIN,
  },
];

const articles = [
  {
    id: 1,
    title: "How to Make a Resume: Writing Guide & Examples for 2024",
    author: "Maciej Tomaszewicz , CPRW",
    date: "July 26, 2024",
    avatar: AVATAR_PIXEL,
  },
  {
    id: 2,
    title: "Best Resume Format for 2024 [Guide & Templates]",
    author: "John Doe",
    date: "August 1, 2024",
    avatar: AVATAR_PIXEL,
  },
  {
    id: 3,
    title: "50+ Best Resume Summary Examples + 2024 How-To Guide",
    author: "Jane Smith",
    date: "July 30, 2024",
    avatar: AVATAR_PIXEL,
  },
  {
    id: 4,
    title: "How to Make a Resume With No Experience: Examples",
    author: "Emily Johnson",
    date: "August 5, 2024",
    avatar: AVATAR_PIXEL,
  },
];

const customers = [
  {
    id: 1,
    text: "Sharp CV transformed my resume! Their templates are sleek, and the AI suggestions were spot-on. I landed my dream job in no time.",
    name: "John Doe",
    country: "USA",
    rating: "images/svgs/fivestar.svg",
    profile: "images/svgs/landingprofile.svg",
  },
  {
    id: 2,
    text: "As a career changer, I needed a resume that showcased my transferable skills. Sharp CV helped me craft a compelling resume that landed me interviews with top companies.",
    name: "Jane Smith",
    country: "Canada",
    rating: "images/svgs/fivestar.svg",
    profile: "images/svgs/landingprofile.svg",
  },
  {
    id: 3,
    text: "I've used multiple resume builders, but Sharp CV is by far the best. The platform is user-friendly, the templates are professional, and the AI suggestions are spot-on.",
    name: "Mike Johnson",
    country: "UK",
    rating: "images/svgs/fivestar.svg",
    profile: "images/svgs/landingprofile.svg",
  },
  {
    id: 4,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. of type and scrambled it to make a type specimen book",
    name: "Mike Johnson",
    country: "UK",
    rating: "images/svgs/fivestar.svg",
    profile: "images/svgs/landingprofile.svg",
  },
  {
    id: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. of type and scrambled it to make a type specimen book",
    name: "Mike Johnson",
    country: "UK",
    rating: "images/svgs/fivestar.svg",
    profile: "images/svgs/landingprofile.svg",
  },
  {
    id: 6,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. of type and scrambled it to make a type specimen book",
    name: "Mike Johnson",
    country: "UK",
    rating: "images/svgs/fivestar.svg",
    profile: "images/svgs/landingprofile.svg",
  },
  // Add more customer reviews as needed
];

function HomeScreen() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("resume-resources");
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [resumeData, setResumeData] = useState<any>();
  const [isGenerated, setIsGenerated] = useState(false);

  const router = useRouter();
  const { data: session, status }: any = useSession();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    jobTitle: "",
    color:"#6b84fe"
  });

  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    if (isLoggedIn && session?.user?.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: session.user.email,
      }));
    }
  }, [session, isLoggedIn]);

  const [loading, setLoading] = useState<boolean>(true);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = () => {
    if (formData.firstName) {
      localStorage.setItem("firstName", formData.firstName);
    }

    if (formData.lastName) {
      localStorage.setItem("lastName", formData.lastName);
    }

    if (formData.email) {
      localStorage.setItem("email", formData.email);
    }

    router.push("/auth/signup");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/generate`,
        formData
      );
      setResumeData(response.data.result);
      setIsGenerated(true);
      setLoading(true);
      toast.success("Resume data generated successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

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

  const openTab = (tabName: any) => {
    setActiveTab(tabName);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  const scrollToPrevSlide = () => {
    sliderRef.current?.scrollBy({
      left: -(sliderRef.current?.offsetWidth || 0),
      behavior: "smooth",
    });
  };

  const scrollToNextSlide = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current?.offsetWidth || 0,
      behavior: "smooth",
    });
  };

  const { name, role, image, testimonial, socialImage } =
    testimonials[currentSlide];

  const toggleFAQ = (index: any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Why Choose SharpCV for Your Job Applications?",
      answer: `**• AI-Powered Excellence:** Advanced tools to build ATS-friendly resumes.

               **• Affordable Plans:** Free to try, pay Rs250 for a professional resume or cover letter.`,
    },
    {
      question: "How can I effectively use the SharpCV Resume Builder?",
      answer:
        "Start by selecting a suitable professional template, accurately input your details, and use the tips provided to enhance your resume. Review and proofread before downloading in your preferred format.",
    },
    {
      question: "Is SharpCV free?",
      answer:
        "Yes, SharpCV offers a free version with essential features for creating, editing, and downloading resumes. Additional premium features are available for purchase.",
    },
    {
      question: "Is My Data Secure?",
      answer:
        "Yes, SharpCV uses advanced encryption and complies with privacy regulations.",
    },
    {
      question: "How Do I Get Help?",
      answer:
        "Contact our support team via email or live chat for assistance anytime.",
    },
  ];

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false once the image is fully loaded
  };

  return (
    <div className="h-[calc(100vh - 93px)]">
      {status === "authenticated" ? (
        <Navbar welcomeText="" showNavItems={true} showRight={true} />
      ) : (
        <MainNavbar />
      )}
      {/* Hero Section */}
      <Loader loading={loading} />
      <div
        id="builder-section"
        className="grid lg:grid-cols-2 md:grid-cols-1 border border-1"
      >
        <div className="text-gray-700 mx-4 md:mr-[30px] md:ml-[60px]  my-10 md:my-20 ">
          <div className="">
            <span className="text-3xl md:text-[48px] font-semibold text-[#0F172A] lg:leading-normal md:leading-tight leading-snug">
              Automate Your Resume Creation With Our AI{" "}
              <span className="text-gradient"></span> Resume Builder.
            </span>
          </div>

          <div className="mb-[28px] text-[#666666]">
            <span>
              Some people simply don’t enjoy writing resumes as much as we do.{" "}
              <br />
              That’s okay. Our AI Resume Writer is for you
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="w-full grid grid-cols-1  lg:grid-cols-2 gap-4">
              <div>
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  placeholder=" first name"
                  required={true}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  placeholder=" last name"
                  required={true}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email address"
                  required={true}
                  disabled={isLoggedIn}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <InputField
                  label="LinkedIn"
                  name="linkedin"
                  value={formData.linkedin}
                  placeholder=" LinkedIn profile URL"
                  onChange={handleInputChange}
                />
              </div>

              <div className="lg:col-span-2 ">
                <InputField
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  required={true}
                  placeholder=" job title"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#6B84FE] text-white font-semibold w-full h-[56px] rounded-lg hover:bg-[#6B84FE]"
              >
                Generate
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center bg-gray-200 min-h-screen">
          <div
            className="flex"
            style={{ justifyContent: "flex-start", alignItems: "start" }}
          >
            {!isGenerated ? (
              <>
                {/* Image Section */}
                <div className="relative w-[424px] h-[600px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg">
                  {loading && <Loader loading={loading} />}
                  <Image
                    src={HOME_SCREEN_IMAGE.src}
                    alt="home image"
                    className={`w-full h-full object-cover ${
                      loading ? "opacity-0" : "opacity-100"
                    } transition-opacity duration-500 rounded-lg`}
                    width={424}
                    height={600}
                    decoding="sync"
                    loading="eager"
                    onLoad={handleImageLoad}
                  />
                </div>
              </>
            ) : (
              cvInfo &&
              resumeData && (
                <div
                  className="relative w-[550px] flex "
                  style={{
                    height: "calc(100vh - 80px)",
                    flexDirection: "column",
                  }}
                >
                  <TemplateManagement
                    name={resumeData.template.title}
                    bgColor={resumeData.settings.color}
                    resumeData={resumeData}
                    cvInfo={cvInfo}
                    height="100%"
                    width={"100%"}
                    tag="html"
                  />
                  {/* Sign-up Section */}
                  {status !== "authenticated" && (
                    <div className="flex flex-col md:flex-row items-center gap-10 justify-between mt-4 md:space-y-1">
                      <span className="text-[14px] text-[#555370] w-[270px] text-center md:text-left">
                        Sign Up For Free To Edit And Download Your Generated
                        Resume
                      </span>

                      <Button
                        className="h-12 w-28 bg-[#6B84FE] text-sm text-white rounded-lg hover:bg-sky-700 hover:text-white"
                        onClick={handleSignUp}
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* Pricing Component */}
      <div>
        <SubscriptionDashboard />
      </div>

      {/* Cutting Edge Cards */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-4 md:mx-8 lg:mx-20 mt-20 my-5">
        <div className="w-full py-[30px] pl-[24px] pr-[52px] bg-white rounded-3xl shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] dark:bg-gray-800 mx-auto">
          <img
            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-4"
            src={SETTINGS.src}
            alt="setting"
          />
          <span className="text-2xl font-medium text-gray-900 dark:text-white">
            Cutting Edge Career Tools
          </span>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 mt-4">
            Build a matching resume and cover letter with step-by-step guidance
            and expert <br /> tips.
          </p>
        </div>
        <div className="w-full py-[30px] pl-[24px] pr-[52px] bg-white rounded-3xl shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] dark:bg-gray-800 mx-auto">
          <img
            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-4"
            src={LIGHTBULB.src}
            alt="Bulb"
          />
          <span className="text-2xl font-medium text-gray-900 dark:text-white">
            Extensive Experience
          </span>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 mt-4">
            Use our vast industry expertise to land your dream job faster.
          </p>
        </div>
        <div className="w-full py-[30px] pl-[24px] pr-[52px] bg-white rounded-3xl shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] dark:bg-gray-800 mx-auto">
          <img
            src={SEARCH.src}
            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-4"
            alt="Search"
          />
          <span className="text-2xl font-medium text-gray-900 dark:text-white">
            Expert-Crafted Guides
          </span>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 mt-4">
            Grow your career with our expert blog cited by universities and top
            media outlets.
          </p>
        </div>
      </div>

      {/* Images Section */}

      <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-4 bg-slate-900 p-4 pt-6 pb-6 mt-14 my-5 px-20">
        <div className="flex justify-center">
          <img src={READELSEVIER.src} alt="lig" />
        </div>
        <div className="flex justify-center">
          <img src={VUORI.src} alt="lig" />
        </div>
        <div className="flex justify-center">
          <img src={VERSED.src} alt="lig" />
        </div>
        <div className="flex justify-center">
          <img src={MATRIXIAN.src} alt="lig" />
        </div>
        <div className="flex justify-center lg:justify-end">
          <img src={MANSCAPED.src} alt="lig" />
        </div>
        <div className="flex justify-center lg:justify-end">
          <img src={LIPPA.src} alt="lig" />
        </div>
      </div>

      {/* About Us */}

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-4 md:mx-8 lg:mx-20 mt-14 my-5">
        <div className="md:pr-4 pr-2 md:mt-8 sm:mt-5">
          <span className="text-[#6B84FE] text-lg font-medium">SharpCV:</span>
          <div className="font-semibold text-[40px] leading-normal mt-5">
            Redefining Resume Building with AI
          </div>
          <div className="mt-7">
            <span className="leading-8 text-[#666666]">
              SharpCV is an all-in-one AI-powered career platform, backed by
              leading career experts, recruiters, and professional coaches. We
              simplify the stressful
            </span>
            <br />
            <span className="leading-8 text-[#666666]">
              job search process by helping you create ATS-friendly resumes that
              outshine competitors. From resumes and cover letters to career
              advice, we provide everything you need to achieve professional
              success.
            </span>
          </div>
          <div>
            <Link href="/auth/signup">
              <Button className="h-[56px] w-52 bg-[#6B84FE] text-white rounded-xl mt-[40px] mb-4 text-sm font-semibold hover:bg-indigo-700">
                GET STARTED NOW
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:mt-8 sm:mt-5">
          <img
            src={ABOUT_IMAGE.src}
            alt="about"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-4 md:mx-8 lg:mx-20 mt-10">
        <div className="bg-gray-100 p-10 text-center rounded-[32px]">
          <div className="text-4xl font-bold text-about-gradient my-3">1M+</div>
          <div className="font-medium text-base text-555370 my-3">
            CVs Created
          </div>
        </div>
        <div className="bg-gray-100 p-10 text-center rounded-[32px]">
          <div className="text-4xl font-bold text-about-gradient my-3">
            1200+
          </div>
          <div className="font-medium text-base text-555370 my-3">
            Free career guides
          </div>
        </div>
        <div className="bg-gray-100 p-10 text-center rounded-[32px]">
          <div className="text-4xl font-bold text-about-gradient my-3">
            150+
          </div>
          <div className="font-medium text-base text-555370 my-3">
            Partner universities
          </div>
        </div>
        <div className="bg-gray-100 p-10 text-center rounded-[32px]">
          <div className="text-4xl font-bold text-about-gradient my-3">12+</div>
          <div className="font-medium text-base text-555370 my-3">
            Years in the Recruitment Industry
          </div>
        </div>
      </div>

      {/* Steps */}

      <div className="bg-6B84FE bg-image-resume mt-[100px] lg:h-[577px]">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 text-center">
          <span className="font-semibold font-40 text-white mt-[60px]">
            Make a resume that gets results
          </span>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-4 md:mx-8 lg:mx-20 my-[48px]">
          <div className="flex flex-col items-center">
            <img src={RESUME_IMAGE_1.src} alt="resImg" />
            <span className="my-4 text-lg font-semibold text-white">
              Step 1
            </span>
            <span className="text-center font-normal text-base leading-[30px] text-white">
              Check out our pre-designed templates and guided steps, allowing
              you to create a polished resume faster.
            </span>
          </div>
          <div className="flex flex-col items-center">
            <img src={RESUME_IMAGE_2.src} alt="resImg" />
            <span className="my-4 text-lg font-semibold text-white">
              Step 2
            </span>
            <span className="text-center font-normal text-base leading-[30px] text-white">
              Get the right words to describe what you do. Search by job title
              and find pre-written content of your skills and responsibilities.
            </span>
          </div>
          <div className="flex flex-col items-center">
            <img src={RESUME_IMAGE_3.src} alt="resImg" />
            <span className="my-4 text-lg font-semibold text-white">
              Step 3
            </span>
            <span className="text-center font-normal text-base leading-[30px] text-white">
              {
                "We'll help you fine-tune the details, quickly generate each section, and download your new resume. That's it - you're ready to apply!"
              }
            </span>
          </div>
        </div>
        <div className="flex justify-center pb-20">
          <Link href="/auth/signup">
            <Button className="bg-transparent h-[56px] text-white w-60 mb-4 border-2 rounded-xl text-sm font-semibold hover:bg-indigo-700">
              CREATE MY RESUME
            </Button>
          </Link>
        </div>
      </div>

      {/* online Resume Builder */}

      <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 my-[100px] text-center">
        <span className="font-semibold font-40">
          Why use our online Resume Builder?
        </span>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-4 md:mx-8 lg:mx-20 mt-[47px]">
          <div className="grid grid-rows-3 gap-4">
            <div className="p-6 shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] rounded-[32px] bg-white">
              <Image
                src={CV}
                alt="cv"
                height={40}
                width={40}
                className="h-[40px] w-[40px]"
              />
              <div className="flex font-medium text-[22px] text-[#555370] my-3">
                New, professional designs
              </div>
              <p className="text-left text-base text-[#555370] font-normal">
                Choose from a wide range of styles for every job level and type.
                From fun and creative to simple and modern, there’s a perfect
                design for everyone.
              </p>
            </div>
            <div className="p-6 shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] rounded-[32px] bg-white">
              <Image
                src={UNITED}
                alt="ats-friendly"
                height={40}
                width={40}
                className="h-[40px] w-[40px]"
              />
              <div className="flex font-medium text-[22px] text-[#555370] my-3">
                ATS-friendly
              </div>
              <p className="text-left text-base text-[#555370] font-normal">
                Employers use applicant tracking systems (ATS) to filter out
                candidates. With our templates, be confident knowing that your
                ATS-friendly resume will reach the hiring.
              </p>
            </div>
            <div className="p-6 shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] rounded-[32px] bg-white">
              <Image
                src={CONTENT}
                alt="ai-content"
                height={40}
                width={40}
                className="h-[40px] w-[40px]"
              />
              <div className="flex font-medium text-[22px] text-[#555370] my-3">
                AI-powered content
              </div>
              <p className="text-left text-base text-[#555370] font-normal">
                Get AI-generated content suggestions for your resume based on
                your previous roles. Each line has been refined by our career
                experts for maximum impact.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] rounded-[32px]">
              <Image
                src={GROUP_IMAGE}
                alt="group"
                className="w-[413.45px] h-[590px] object-cover"
                height={590}
                width={413.45}
                layout="responsive"
              />
            </div>
            <div className="relative rounded-[32px] overflow-hidden bg-white">
              <Image
                src={RESUME}
                alt="resume"
                className="w-[413px] h-auto"
                height={285}
                width={413}
                layout="responsive"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent">
                <Link href="/auth/signup">
                  <button className="w-full h-[56px] py-3 bg-[#6B84FE] hover:bg-blue-700 text-sm font-semibold text-white rounded-lg">
                    Get Started Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-4">
            <div className="p-6 shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] rounded-[32px] bg-white">
              <Image
                src={SUPPORT}
                alt="support"
                height={40}
                width={40}
                className="h-[40px] w-[40px]"
              />
              <div className="font-medium flex text-[22px] text-[#555370] my-3">
                Step-by-step support
              </div>
              <p className="text-base text-left text-[#555370] font-normal">
                Our Resume Creator provides detailed tips and advice throughout
                the process, with customer support ready to assist you anytime.
              </p>
            </div>
            <div className="p-6 shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] rounded-[32px] bg-white">
              <Image
                src={COVER_LETTER}
                alt="cover letter"
                height={40}
                width={40}
                className="h-[40px] w-[40px]"
              />
              <div className="flex font-medium text-[22px] text-[#555370] my-3">
                Matching cover letter
              </div>
              <p className="text-base text-left text-[#555370] font-normal">
                Easily create a memorable cover letter with customizable
                suggested text in our Cover Letter Builder. Then, choose a
                design that aligns with your resume...
              </p>
            </div>
            <div className="p-6 shadow-[0px_4px_60px_0px_rgba(0,0,0,0.08)] rounded-[32px] bg-white">
              <Image
                src={CV}
                alt="unlimited resumes"
                height={40}
                width={40}
                className="h-[40px] w-[40px]"
              />
              <div className="font-medium flex text-[22px] text-[#555370] my-3">
                Unlimited resumes
              </div>
              <p className="text-base text-left text-[#555370] font-normal">
                Make and edit unlimited resumes, experiment with multiple
                templates and download your resumes in various file formats.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hr Professionals */}

      <div className="bg-[#F3F4F6] py-16">
        <div className="max-w-[955px] mx-auto text-center px-4">
          <div className="font-semibold text-[40px] pt-[60px]">
            HR Professionals Recommend{" "}
            <span className="text-[#6B84FE]">SharpDesk</span>
          </div>
          <div className="w-full bg-white rounded-3xl shadow-[0_4px_60px_0px_rgba(0,0,0,0.08)] dark:bg-gray-800 mt-12 py-8">
            <Image
              className="w-[90px] h-auto text-gray-500 dark:text-gray-400 mb-5 mx-auto"
              src={image}
              height={90}
              width={90}
              alt="testimonial"
            />
            <span className="text-2xl font-medium text-gray-900 dark:text-white">
              {name}
            </span>
            <div className="mt-3">
              <span className="text-sm text-[#555370] font-normal">{role}</span>
            </div>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 mt-4 leading-relaxed px-4 lg:px-[48px]">
              {testimonial}
            </p>
            <div className="flex justify-center mt-5">
              <Image src={socialImage} height={40} width={40} alt="social" />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-12">
          <Image
            src={LEFT_ARROW}
            alt="left"
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
            height={56}
            width={56}
            onClick={prevSlide}
          />
          <Image
            src={RIGHT_ARROW}
            alt="right"
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
            height={56}
            width={56}
            onClick={nextSlide}
          />
        </div>
      </div>

      {/* Resume Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-[100px] mx-4 md:mx-8 lg:mx-20">
        <div>
          <span className="text-[40px] font-semibold">
            Free Career Resources
          </span>
          <div className="text-base text-[#666666] mt-4">
            Access over 250 expert articles to enhance your job search: <br />●
            How to Make a Resume: Writing Guide & Examples for 2024 <br />● Best
            Resume Format for 2024 [Guide & Templates] <br />● 50+ Resume
            Summary Examples for 2024
          </div>
        </div>
        {/* TABS */}
        <div className="flex items-end">
          <div className="w-full max-w-lg mx-auto mt-8">
            <div className="flex justify-between border-b border-gray-300">
              <button
                className={`py-2 px-4 block focus:outline-none ${
                  activeTab === "resume-resources"
                    ? "border-b-2 border-blue-500 text-[#6B84FE]"
                    : "text-gray-600 hover:text-[#6B84FE]"
                }`}
                onClick={() => openTab("resume-resources")}
              >
                Resume Resources
              </button>
              <button
                className={`py-2 px-4 block focus:outline-none ${
                  activeTab === "cover-letter"
                    ? "border-b-2 border-blue-500 text-[#6B84FE]"
                    : "text-gray-600 hover:text-[#6B84FE]"
                }`}
                onClick={() => openTab("cover-letter")}
              >
                Cover Letter
              </button>
              <button
                className={`py-2 px-4 block focus:outline-none ${
                  activeTab === "career-advice"
                    ? "border-b-2 border-blue-500 text-[#6B84FE]"
                    : "text-gray-600 hover:text-[#6B84FE]"
                }`}
                onClick={() => openTab("career-advice")}
              >
                Career Advice
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeTab === "resume-resources" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mx-4 md:mx-8 lg:mx-20 mt-[48px]">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col border-2 border-[#DDDDDD] rounded-[22px] p-[24px] xl:pr-10"
            >
              <span className="text-lg text-[#6B84FE] font-medium">{`0${article.id}`}</span>
              <span className="text-[20px] lg:text-[24px] font-medium my-3">
                {article.title}
              </span>
              <div className="flex items-center gap-4">
                <Image
                  src={article.avatar}
                  alt="avatar"
                  height={40}
                  width={40}
                />
                <span className="text-[#666666] text-sm lg:text-base font-normal">
                  {article.author}, {article.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "cover-letter" && (
        <div className="flex justify-center pt-5">
          <Image src={COMING_SOON} alt="coming-soon" height={150} width={150} />
        </div>
      )}
      {activeTab === "career-advice" && (
        <div className="flex justify-center pt-5">
          <Image src={COMING_SOON} alt="coming-soon" height={150} width={150} />
        </div>
      )}

      {/* Career Development Guides */}
      <div className="bg-[#0A101F] mt-[133px]">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 mx-4 md:mx-8 lg:mx-20 py-[33px]">
          <div className="text-center flex flex-col items-center lg:items-start lg:text-start">
            <div className="leading-[56px]">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-[32px] text-white font-semibold">
                Check out our career development guides
              </span>
            </div>
            <span className="text-base font-normal text-white mt-4 mb-[40px] text-center lg:text-start">
              Learn everything you need to take your career to the next level!
            </span>
            <Link href="/auth/signup">
              <Button className="text-sm bg-[#6B84FE] text-white hover:bg-blue-800 font-semibold rounded-xl h-[56px] w-[222px] mt-4 lg:mt-0">
                READ MORE ABOUT RESUME
              </Button>
            </Link>
          </div>
          <div className="flex justify-center items-center lg:justify-end">
            <Image src={GUIDE_SEC_IMAGE} alt="guide" height={285} width={285} />
          </div>
        </div>
      </div>

      <div>
        <div className="mx-3 lg:mx-20 md:ml-[30px] mt-10">
          <div className="flex flex-col sm:flex-row justify-between">
            <span className="text-[40px] font-semibold">
              What Our Customers Say!
            </span>
            <div className="flex justify-center gap-1">
              <Image
                src={PREV_BUTTON_GRAY}
                alt="left"
                className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                height={56}
                width={56}
                onClick={scrollToPrevSlide}
              />
              <Image
                src={NEXT_BUTTON_GRAY}
                alt="right"
                className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                height={56}
                width={56}
                onClick={scrollToNextSlide}
              />
            </div>
          </div>
        </div>
        <div className="ml-20 md:ml-[30px]">
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll scrollbar-hide mt-5 gap-4"
          >
            {customers.map((customer, index) => (
              <div
                key={customer.id}
                className={`flex-none w-full lg:w-1/3 ${
                  (index + 1) % 3 === 0 ? "mr-0" : "mr-4"
                } border-r-2`}
              >
                <div className="px-10">
                  <Image
                    src={customer.rating}
                    alt="star"
                    height={28}
                    width={168}
                  />
                  <p className="my-[20px] text-[#666666]">{customer.text}</p>
                  <div className="flex items-center mt-[48px]">
                    <Image
                      src={customer.profile}
                      alt="user"
                      height={70}
                      width={70}
                    />
                    <div className="ml-2">
                      <span className="block">{customer.name}</span>
                      <span className="text-gray-400 text-sm">
                        {customer.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-6B84FE bg-image-resume mt-20 ">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 my-5">
          <div className="mt-[60px] max-w-[605px] lg:mx-auto mx-4 ">
            <span className="font-semibold text-xl lg:text-[40px]  text-white">
              Try Our Easy-To-Use Resume <br />
              <br /> Builder
            </span>
            <div className="my-5">
              <span className="font-normal text-base leading-[30px] text-white">
                Experience our intuitive resume builder and take a shortcut to
                your dream career. Discover why thousands of job seekers and HR
                experts trust us. Create your best resume quickly and easily
                today
              </span>
            </div>
            <div className="mb-20">
              <Link href="/auth/signup">
                <Button className="bg-transparent rounded-xl h-[56px] text-white w-60 mt-10 mb-4 border-2 text-sm font-semibold hover:bg-indigo-700">
                  CREATE MY RESUME
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center my-[30px] p-4">
            <Image
              src={RESUME_IMAGE_SEC_3}
              alt="resImg"
              height={397}
              width={551}
              className="h-auto w-[551px] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-[80px]">
        <div className="container mx-auto max-w-[1020px] px-4">
          <div className="max-w-[720px] mx-auto md:max-w-[720px] sm:max-w-[480px]">
            <h3 className="text-[40px] font-bold mb-[48px] text-center">
              Frequently Asked Questions about SharpDesk Builder
            </h3>
          </div>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="flex justify-center my-4">
                <div
                  className="faq-card border border-[#6B84FE] bg-[#F9F9F9] rounded-2xl p-8 text-left cursor-pointer font-bold w-full"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="ml-4">
                      {openFAQ === index ? (
                        <FaMinus className="text-blue-500" />
                      ) : (
                        <FaPlus className="text-blue-500" />
                      )}
                    </span>
                  </div>
                  {openFAQ === index && (
                    <div className="mt-2 text-base text-[#666666] font-normal w-full">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-[48px]">
          <Link href="/coming-soon">
            <Button className="bg-transparent w-[197px] text-[#6B84FE] rounded-xl h-[56px] border-2 border-[#6B84FE] font-semibold text-sm hover:bg-[#6B84FE] hover:text-white">
              View More
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-[#0A101F]">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 mx-4 md:mx-8 lg:mx-20 py-10">
          <div className="text-center lg:text-start w-full">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-[35px] text-white font-semibold leading-tight">
              Transform Your Career in Minutes.
              <br />
              Join Thousands of Happy Users Today!
            </span>
          </div>
          <div className="flex justify-center items-center lg:justify-end">
            <Link href="/auth/signup">
              <Button className="text-base bg-[#6B84FE] text-white hover:bg-blue-800 font-semibold rounded-xl h-[56px] w-[222px]">
                Try Our Resume Maker
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
