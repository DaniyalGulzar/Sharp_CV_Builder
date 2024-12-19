"use client";
import Footer from "@/landing-page/footer";
import MainNavbar from "@/components/MainNavbar";
import React from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

function PrivacyPolicy() {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "authenticated" ? <Navbar welcomeText="" showNavItems={true} showRight={true} /> : <MainNavbar/>}
      <div className="max-w-[1100px] my-20 mx-auto">
        <h1 className="font-bold text-[48px] text-black text-center">
          Privacy Policy
        </h1>

        <span className="font-semibold text-[40px] text-black">
          Privacy Policy for SharpCV
        </span>
        <p className="font-normal text-2xl text-black pt-5">
          Effective Date: 14-Oct-2024
        </p>

        <h2 className="font-semibold text-2xl text-black pt-10">
          Introduction
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          SharpCV understands that every client is concerned with their privacy,
          and therefore, such privacy must be guarded. When you use our website,
          mobile applications, or other services, your personal information is
          collected, used, disclosed, and protected in accordance with this
          Privacy Policy.
        </p>

        <h2 className="font-semibold text-2xl text-black pt-10">
          Information We Collect
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          We may collect the following types of personal information:
        </p>
        <ul className="list-disc list-inside text-lg text-black pt-2">
          <li>
            <strong>Account Information:</strong> Name, email address, password,
            phone number, and other contact details.
          </li>
          <li>
            <strong>Resume Information:</strong> Employment history, education,
            skills, and other professional details.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with
            our services, including IP address, browser type, device
            information, and usage patterns.
          </li>
          <li>
            <strong>Payment Information:</strong> Credit card or other payment
            details if you make a purchase.
          </li>
        </ul>

        <h2 className="font-semibold text-2xl text-black pt-10">
          How We Use Your Information
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          We use your information for the following purposes:
        </p>
        <ul className="list-disc list-inside text-lg text-black pt-2">
          <li>
            <strong>To provide and improve our services:</strong> We use your
            information to deliver the services you request, personalize your
            experience, and improve our products.
          </li>
          <li>
            <strong>To communicate with you:</strong> We may contact you via
            email, phone, or push notifications to provide updates, customer
            support, or marketing information.
          </li>
          <li>
            <strong>For security and fraud prevention:</strong> We use your
            information to detect and prevent fraudulent activity.
          </li>
          <li>
            <strong>For legal compliance:</strong> We may disclose your
            information to comply with legal requirements or to protect our
            rights.
          </li>
        </ul>

        <h2 className="font-semibold text-2xl text-black pt-10">
          Sharing Your Information
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          We may share your information with:
        </p>
        <ul className="list-disc list-inside text-lg text-black pt-2">
          <li>
            <strong>Third-party service providers:</strong> We may engage
            third-party service providers to help us deliver our services, such
            as payment processing, email delivery, and data analytics. These
            providers are prohibited from using your information for their own
            marketing purposes.
          </li>
          <li>
            <strong>Business partners:</strong> We may share your information
            with business partners who offer complementary services to ours.
          </li>
          <li>
            <strong>Law enforcement or regulatory authorities:</strong> We may
            disclose your information to law enforcement or regulatory
            authorities as required by law or to protect our rights.
          </li>
        </ul>

        <h2 className="font-semibold text-2xl text-black pt-10">Your Rights</h2>
        <p className="font-normal text-lg text-black pt-2">
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside text-lg text-black pt-2">
          <li>
            <strong>Access:</strong> You can request access to the personal
            information we hold about you.
          </li>
          <li>
            <strong>Rectification:</strong> You can request that we correct any
            inaccurate or incomplete information.
          </li>
          <li>
            <strong>Erasure:</strong> You can request that we delete your
            personal information under certain circumstances.
          </li>
          <li>
            <strong>Restriction of processing:</strong> You can request that we
            restrict the processing of your personal information under certain
            circumstances.
          </li>
          <li>
            <strong>Data portability:</strong> You can request that we transfer
            your personal information to another organization in a structured,
            commonly used, and machine-readable format.
          </li>
          <li>
            <strong>Object to processing:</strong> You can object to the
            processing of your personal information for certain purposes, such
            as direct marketing.
          </li>
        </ul>

        <h2 className="font-semibold text-2xl text-black pt-10">
          Data Security
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          We implement reasonable security measures to protect your personal
          information from unauthorized access, disclosure, alteration, or
          destruction. However, no method of transmission over the internet or
          electronic storage is 100% secure.
        </p>

        <h2 className="font-semibold text-2xl text-black pt-10">
          Intellectual Property
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          The content of SharpCV, including but not limited to text, graphics,
          images, logos, and software, is protected by copyright, trademark, and
          other intellectual property laws. You may not reproduce, modify,
          distribute, or use any part of SharpCV for commercial purposes without
          our prior written consent.
        </p>

        <h2 className="font-semibold text-2xl text-black pt-10">
          Cookies and Tracking
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          We use cookies and similar tracking technologies to collect
          information about your usage of our services. You can manage your
          cookie preferences through your browser settings.
        </p>

        <h2 className="font-semibold text-2xl text-black pt-10">
          {"Children's Privacy"}
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          Our services are not directed at children under the age of 13. We do
          not knowingly collect personal information from children under 13.
        </p>

        <h2 className="font-semibold text-2xl text-black pt-10">
          Changes to This Policy
        </h2>
        <p className="font-normal text-lg text-black pt-2">
          We may update this Privacy Policy from time to time. We will notify
          you of any material changes by posting a notice on our website or by
          contacting you directly.
        </p>

        <h2 className="font-semibold text-2xl text-black pt-10">Contact Us</h2>
        <p className="font-normal text-lg text-black pt-2">
          If you have any questions about this Privacy Policy or our data
          practices, please contact us at <strong>info@sharpCv.com</strong>.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
