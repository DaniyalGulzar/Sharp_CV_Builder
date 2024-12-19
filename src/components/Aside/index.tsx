import React from "react";
import Image from "next/image";
import Button from "../Button"; // Adjust the path as necessary

const Asider = () => {
  return (
    <div className="bg-[#F3F3F3] rounded-lg max-w-[780px] mx-3 lg:mx-auto w-full">
      {/* First Box */}
      <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Our Resume Builder Deliver Results
        </h2>

        {/* Image */}
        <div className="mb-4 rounded-lg">
          <Image
            src="/images/svgs/Rectangle.svg"
            alt="Description of image"
            width={500}
            height={412}
            className="rounded-lg"
          />
        </div>

        {/* Button */}
        <Button className="bg-gray-200 text-blue-500 hover:text-gray-700 font-semibold py-2 px-2 items-center rounded-2xl">
          50% Higher Chance of Getting Job
        </Button>
      </div>
      <br></br>

      {/* Second Box */}
      <div className="bg-white p-6 rounded-lg text-center">
        <p className="text-sm font-normal text-center mb-4 text-[#555370]">
          The results are placed on a study with over 1000 participants.
        </p>
        <div className="flex justify-center">
          <Button className="bg-[#6B84FE] hover:bg-purple-700 text-white text-sm py-2 h-[48px] w-full  sm:w-[192px] px-4 items-center rounded-xl">
            Change Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Asider;
