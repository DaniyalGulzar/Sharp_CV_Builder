import { useEffect, useRef, useState } from "react";
import InputField from "@/components/InputField";
import Image from "next/image";
import Button from "@/components/Button";
import Wrapper1 from "@/components/Wrapper";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StepForm from "@/components/profileStepForm";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { Country, City } from "country-state-city";

interface EducationStepProps {
  onScreen: (step: number) => void;
}

const CustomForm: React.FC<EducationStepProps> = ({ onScreen }) => {
  const [resumeData, setResumeData] = useState<any>({});
  const [tips, setTips] = useState<any>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    linkedin: "",
    email: "",
  });

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (selectedCountryCode) {
      try {
        setCities([]);

        const countryCities =
          City.getCitiesOfCountry(selectedCountryCode) || [];
        console.log(`Cities for ${selectedCountryCode}:`, countryCities);

        setTimeout(() => {
          setCities(countryCities);
        }, 0);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
    } else {
      setCities([]);
    }
  }, [selectedCountryCode]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;

    if (!countryCode) {
      setSelectedCountryCode("");
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        country: "",
        city: "",
      }));
      return;
    }

    const selectedCountry = countries.find(
      (country) => country.isoCode === countryCode
    );

    setSelectedCountryCode(countryCode);
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry ? selectedCountry.name : "",
      city: "",
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      city: e.target.value,
    }));
  };

  useEffect(() => {
    const data: any = localStorage.getItem("tips");
    if (data && tips.length == 0) {
      setTips(JSON.parse(data));
    }
  }, [tips]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (session) {
      fetchProfileData();
    }
  }, [session, countries]);

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
      if (response.data.result) {
        setResumeData(response.data.result);
      }

      if (response?.data?.result?.data?.heading) {
        const headingData = response.data.result.data.heading;

        setFormData({
          firstName: headingData.firstName || "",
          lastName: headingData.lastName || "",
          city: headingData.city || "",
          postalCode: headingData.postalCode || "",
          country: headingData.country || "",
          phone: headingData.phone || "",
          linkedin: headingData.linkedin || "",
          email: session?.user?.email || "",
        });

        if (headingData.country) {
          const matchedCountry = countries.find(
            (country) => country.name === headingData.country
          );

          if (matchedCountry) {
            setSelectedCountryCode(matchedCountry.isoCode);
          }
        }
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const updatedResumeData = {
      data: {
        ...resumeData.data,
        heading: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          city: formData.city,
          phone: formData.phone,
          postalCode: formData.postalCode,
          country: formData.country,
          linkedin: formData.linkedin,
          email: session?.user?.email,
        },
      },
    };

    try {
      const token = session.token;
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/profile/${session.user._id}`,
        updatedResumeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/profile?step=2");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
    }
  };

  const handleEyeIconClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRoute = () => {
    router.push("/dashboard");
  };

  return (
    <>
      {loading && (
        <div className="z-[100] absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <Loader loading={loading} />
        </div>
      )}
      <div className="flex w-full">
        <Wrapper1>
          <div className="bg-[#F3F3F3] h-[calc(100vh-65px)] overflow-auto">
            <div className="m-[24px]">
              <StepForm stepNumber={-1} />
            </div>
            <div className="flex gap-4 m-[24px]">
              {tips && (
                <form
                  onSubmit={handleSubmit}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="w-full p-6 pb-6 bg-white rounded-xl col-span-2">
                    <div className="mb-6 flex justify-between">
                      <div>
                        {tips.length !== 0 && (
                          <div
                            dangerouslySetInnerHTML={{ __html: tips[0].header }}
                          />
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
                                  dangerouslySetInnerHTML={{
                                    __html: tips[0].tips,
                                  }}
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
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
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
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

                      <div className="col-span-1 mt-2">
                        <label
                          className="block text-base font-medium"
                          htmlFor="country"
                        >
                          Country
                          <span className="text-red-500">&nbsp;*</span>
                        </label>
                        <div className="relative mt-2">
                          <select
                            id="country"
                            name="country"
                            value={selectedCountryCode}
                            onChange={handleCountryChange}
                            required
                            className="w-full px-4 py-[.8rem] text-sm border border-black-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option
                                key={country.isoCode}
                                value={country.isoCode}
                              >
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-span-1 mt-2">
                        <label
                          className="block text-base font-medium"
                          htmlFor="city"
                        >
                          City
                          <span className="text-red-500">&nbsp;*</span>
                        </label>
                        <div className="relative mt-2">
                          <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleCityChange}
                            disabled={!selectedCountryCode}
                            required
                            className={`w-full px-4 py-[.8rem] text-sm border border-black-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent ${
                              !selectedCountryCode
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <option value="">Select City</option>
                            {cities.length > 0 ? (
                              cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                  {city.name}
                                </option>
                              ))
                            ) : (
                              <option disabled>No cities available</option>
                            )}
                          </select>
                        </div>
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
                          type="number"
                          label="Phone"
                          name="phone"
                          required={true}
                          value={formData.phone}
                          placeholder="Enter your phone number"
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
                        onClick={handleRoute}
                        className="h-12 bg-transparent border border-666666 hover:bg-[#666666] hover:text-white text-666666 px-14 rounded-xl"
                      >
                        Back
                      </Button>
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
            </div>
          </div>
        </Wrapper1>
      </div>
    </>
  );
};
export default CustomForm;
