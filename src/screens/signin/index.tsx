import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { signIn, useSession } from "next-auth/react";
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import GoogleSignInButton from '@/components/GoogleLogin';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SigninScreen() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let formattedValue = value;
    
    if (type === "text") {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }   
    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      const role = (session?.user as { role?: string }).role;
      if (role === 'SuperAdmin') {
        router.push('/admin-dashboard');
      } else if(role === "CustomerSupport") {
        router.push('/support-change-email-dashboard');
      }
      else if(role==="Reseller"){
        router.push('/reseller-referral-list')
      }
      else{
        router.push('/dashboard');
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    const res: any = await signIn("credentials", {
      redirect: false,
      username: formData.email,
      password: formData.password,
    });

    if (res.ok) {
      toast.success("Login Successful");
      setLoading(false);
      router.push('/dashboard')
      // The role check will handle the redirection in useEffect
    } else {
      setLoading(false);
      toast.error(res.error || 'Failed to sign in');
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true)
    const res: any = await signIn("google");
    setLoading(false)
  }

  const signInWithLinkedin = async () => {
    setLoading(true)
    const res: any = await signIn("linkedin");
    setLoading(false)
  }

  return (
    <div className="w-full bg-E3F1F2 flex flex-col h-[100vh] items-center px-10 overflow-auto	">
      <Loader loading={loading} />

      <Image src="/images/pngs/vector.png" width={100} height={120} className="absolute top-0 left-0" alt="Vector 1" />
      <Image src="/images/pngs/vector1.png" width={200} height={170} className="absolute top-0 right-0" alt="Vector 2" />
      <Image src="/images/pngs/vector2.png" width={250} height={120} className="absolute bottom-0 left-0" alt="Vector 3" />
      <Image src="/images/pngs/vector3.png" width={100} height={100} className="absolute bottom-0 right-0" alt="Vector 4" />
      <Image src="/images/svgs/logo.svg" width={169} height={45} className="mt-3 cursor-pointer" onClick={()=>router.push("/")} alt="Logo" />
      <div className="min-w-[300px] max-w-[560px] w-full flex flex-col my-20">
        <span className="text-32px font-bold text-slate-900">Sign In</span>
        <span className="text-lg font-normal text-555370 mt-3">Welcome Back To IQ Resume Builder</span>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            required={true}
            name="email"
            value={formData.email}
            placeholder="Enter Email Address"
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <InputField
            label="Password"
            type="password"
            name="password"
            required={true}
            value={formData.password}
            placeholder="Enter Password"
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <div className="flex flex-col items-end my-4">
            <a href="/auth/forgot-password" className="text-555370 font-medium text-sm">Forgot Password?</a>
          </div>
          <Button type="submit" className='w-full h-[60px] bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg ' disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
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

          <GoogleSignInButton signInWithGoogle={signInWithGoogle} iconSrc="/images/svgs/google-icon.svg" >
            Continue with Google
          </GoogleSignInButton>
          <div className='mt-3'>
            <GoogleSignInButton signInWithGoogle={signInWithLinkedin} iconSrc="/images/svgs/eva_linkedin-fill.svg" >
              Continue with Linkedin
            </GoogleSignInButton>
          </div>
          <div className="flex flex-col items-center mt-4">
            <span className='font-normal text-sm text-666666'>
              Don’t have an account?
              <a href="/auth/signup" className="text-6B84FE font-normal text-sm ml-1">Sign Up</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
