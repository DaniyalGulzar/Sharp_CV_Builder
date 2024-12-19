import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '@/components/Loader';

interface FormData {
    email: string;
}

interface FormErrors {
    email?: string;
}

export default function ForgotPasswordScreen() {
    const [formData, setFormData] = useState<FormData>({ email: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
      
        // Capitalize the first letter if the input type is "text"
        const formattedValue =
        type === "text" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
        
        setFormData((prevState) => ({ ...prevState, [name]: formattedValue }));
    };      

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXT_URL}api/auth/forgot-password`, formData);
            toast.success('Password reset link sent successfully!');
            router.push('/auth/signin'); // Only redirect if on client side

        } catch (error: any) {
            setLoading(false);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Loader loading={loading} />
        <div className="w-full bg-E3F1F2 flex flex-col h-[100vh] items-center px-10 overflow-auto	">
            <Image src="/images/pngs/vector.png" width={100} height={120} className="absolute top-0 left-0" alt="Vector 1" />
            <Image src="/images/pngs/vector1.png" width={200} height={170} className="absolute top-0 right-0" alt="Vector 2" />
            <Image src="/images/pngs/vector2.png" width={250} height={120} className="absolute bottom-0 left-0" alt="Vector 3" />
            <Image src="/images/pngs/vector3.png" width={100} height={100} className="absolute bottom-0 right-0" alt="Vector 4" />
            <Image src="/images/svgs/logo.svg" width={169} height={45} className="mt-3 cursor-pointer" onClick={()=>router.push("/")} alt="Logo" />
            <div className="min-w-[300px] max-w-[560px] w-full flex flex-col my-20">
                <span className="text-32px font-bold text-slate-900">Forgot Password</span>
                <span className="text-lg font-normal text-555370 mt-3">Welcome Back To IQ Resume Builder</span>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        required={true}
                        value={formData.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    <Button type="submit" className='w-full h-[60px] bg-blue-600 text-white hover:bg-blue-700 mt-8 px-6 py-3 rounded-lg ' disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>
            </div>
        </div>
        </>
    );
}
