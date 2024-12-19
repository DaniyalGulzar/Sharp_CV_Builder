import React, { useState, ChangeEvent, FormEvent, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import from next/router
import Image from 'next/image';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '@/components/Loader';

interface FormData {
    newPassword: string;
    confirmPassword: string;
}

interface FormErrors {
    newPassword?: string;
    confirmPassword?: string;
}

const ResetPasswordComponent: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams?.get("token"); // Destructure token from query
    useEffect(() => {
        if (!token) {
            toast.error('Invalid or missing token.');
            router.push('/auth/signin');
        }
    }, [token, router]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
	  
		let formattedValue = value;
		if (type === "text") {
		  formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
		}	  
        setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newErrors: FormErrors = {};

        if (!formData.newPassword) {
            newErrors.newPassword = 'Password is required';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            if (typeof token === 'string') {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXT_URL}api/auth/reset-password?token=${token}`, formData);
                toast.success('Password reset successfully!');
                router.push('/auth/signin');
            } else {
                toast.error('Invalid token.');
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Loader loading={loading} />
        <div className="w-full bg-E3F1F2 flex flex-col h-[100vh] items-center px-10 overflow-auto">
            <Image src="/images/pngs/vector.png" width={100} height={120} className="absolute top-0 left-0" alt="Vector 1" />
            <Image src="/images/pngs/vector1.png" width={200} height={170} className="absolute top-0 right-0" alt="Vector 2" />
            <Image src="/images/pngs/vector2.png" width={250} height={120} className="absolute bottom-0 left-0" alt="Vector 3" />
            <Image src="/images/pngs/vector3.png" width={100} height={100} className="absolute bottom-0 right-0" alt="Vector 4" />
            <Image src="/images/svgs/logo.svg" width={169} height={45} className="mt-3 cursor-pointer" onClick={()=>router.push("/")} alt="Logo" />
            <div className="min-w-[300px] max-w-[560px] w-full flex flex-col my-20">
                <span className="text-32px font-bold text-slate-900">Reset Password</span>
                <span className="text-lg font-normal text-555370 mt-3">Welcome Back To IQ Resume Builder</span>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Password"
                        type="password"
                        name="newPassword"
                        required={true}
                        value={formData.newPassword}
                        placeholder="Enter Password"
                        onChange={handleChange}
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                    <InputField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        required={true}
                        placeholder="Re-write Password"
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    <Button type="submit" className='w-full h-[60px] bg-blue-600 text-white hover:bg-blue-700 mt-8 px-6 py-3 rounded-lg ' disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset'}
                    </Button>
                </form>
            </div>
        </div>
        </>
    );
};

const ResetPasswordScreen: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordComponent />
    </Suspense>
);

export default ResetPasswordScreen;
