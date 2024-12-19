// components/Card.js

import React from "react";
import Button from "../Button";
import Image from "next/image";

interface CardProps {
  imageSrc: string;
  boldText: string;
  content: string;
  button?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ imageSrc, boldText, content, button }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl py-[31px]  px-[26px] w-full  border  border-666666">
      <div className="flex justify-center   mb-4">
        <Image src={imageSrc} alt="Card image" width={88} height={88} />
      </div>
      <h2 className="text-center text-lg font-bold mb-2">{boldText}</h2>
      <div className="card-content">
        <p className="text-center text-gray-500 mb-4">
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </p>
      </div>
      {button && <div className="flex justify-center mt-10">{button}</div>}
    </div>
  );
};

export default Card;
