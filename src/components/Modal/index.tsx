import React from "react";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title = "",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-newspaper bg-white p-6 rounded-lg w-[80%] max-w-[95%] sm:max-w-[95%] md:max-w-[70%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto">
        {title && <p className="my-2 text-5xl font-bold">{title}</p>}
        <div>{children}</div>
        
      </div>
    </div>
  );
};

export default Modal;
