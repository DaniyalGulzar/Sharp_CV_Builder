import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  Suspense,
} from "react";
import Image from "next/image";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import GoogleSignInButton from "@/components/GoogleLogin";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
  username: string;
  referalId: string;
  termsAccepted: boolean;
  isNewsletter: boolean;
}

function SignupScreen() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    referalId: "",
    termsAccepted: false,
    isNewsletter: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");
      const email = localStorage.getItem("email");

      if (firstName && lastName) {
        const fullName = `${firstName} ${lastName}`;
        setFormData((prevFormData) => ({
          ...prevFormData,
          username: fullName,
        }));
      }

      if (email) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: email,
        }));
      }
    }
  }, []);

  useEffect(() => {
    const r_id = searchParams?.get("r_id");
    if (r_id) {
      setFormData((prevData) => ({ ...prevData, referalId: r_id }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const role = (session?.user as { role?: string }).role;
      if (role === "SuperAdmin") {
        router.push("/admin-dashboard");
      } else if (role === "CustomerSupport") {
        router.push("/support-change-email-dashboard");
      } else if (role === "Reseller") {
        router.push("/reseller-referral-list");
      } else {
        router.push("/dashboard");
      }
    }
  }, [status, session, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("Please accept the Terms and Conditions.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/auth/sign-up`,
        formData
      );
      toast.success(
        "Signup successful! Please check your email for verification."
      );
      router.push("/auth/signin");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const res: any = await signIn("google");
  };

  const signInWithLinkedin = async () => {
    const res: any = await signIn("linkedin");
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="w-full bg-E3F1F2 flex flex-col h-[100vh] items-center px-10 overflow-auto">
        <Image
          src="/images/pngs/vector.png"
          width={100}
          height={120}
          className="absolute top-0 left-0"
          alt="Vector 1"
        />
        <Image
          src="/images/pngs/vector1.png"
          width={200}
          height={170}
          className="absolute top-0 right-0"
          alt="Vector 2"
        />
        <Image
          src="/images/pngs/vector2.png"
          width={250}
          height={120}
          className="absolute bottom-0 left-0"
          alt="Vector 3"
        />
        <Image
          src="/images/pngs/vector3.png"
          width={100}
          height={100}
          className="absolute bottom-0 right-0"
          alt="Vector 4"
        />
        <Link href="/">
          <Image
            src="/images/svgs/logo.svg"
            width={169}
            height={45}
            className="mt-3 cursor-pointer"
            alt="Logo"
          />
        </Link>
        <div className="min-w-[300px] max-w-[560px] w-full flex flex-col my-20">
          <span className="text-32px font-bold text-slate-900">Sign Up</span>
          <span className="text-lg font-normal text-555370 mt-3">
            Welcome To IQ Resume Builder
          </span>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              type="text"
              required={true}
              name="username"
              value={formData.username}
              placeholder="Enter Full Name"
              onChange={handleChange}
            />
            <InputField
              label="Email"
              type="email"
              required={true}
              name="email"
              value={formData.email}
              placeholder="Enter Email Address"
              onChange={handleChange}
            />
            <InputField
              label="Password"
              type="password"
              required={true}
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={handleChange}
            />

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label className="text-555370 text-sm">
                I accept the{" "}
                <a href="/privacy-policy" className="text-blue-600 underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Subscribe to Newsletter Checkbox */}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="isNewsletter"
                checked={formData.isNewsletter}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-555370 text-sm">
                Subscribe to our newsletter
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-[60px] bg-blue-600 text-white hover:bg-blue-700 mt-8 px-6 py-3 rounded-lg"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <div className="flex items-center justify-center my-6">
              <div className="relative w-full max-w-[25rem]">
                <div className="absolute inset-0 flex items-center">
                  <hr className="w-full border-t border-989898" />
                  <span className="relative text-989898 px-2">Or</span>
                  <hr className="w-full border-t border-989898" />
                </div>
              </div>
            </div>

            <GoogleSignInButton
              signInWithGoogle={signInWithGoogle}
              iconSrc="/images/svgs/google-icon.svg"
            >
              Continue with Google
            </GoogleSignInButton>
            <div className="mt-3">
              <GoogleSignInButton
                signInWithGoogle={signInWithLinkedin}
                iconSrc="/images/svgs/eva_linkedin-fill.svg"
              >
                Continue with Linkedin
              </GoogleSignInButton>
            </div>
            <div className="flex flex-col items-center mt-4">
              <span className="font-normal text-sm text-666666">
                Already have an account?
                <a
                  href="/auth/signin"
                  className="text-6B84FE font-normal text-sm ml-1"
                >
                  Sign In
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const signUp: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SignupScreen />
  </Suspense>
);

export default signUp;
