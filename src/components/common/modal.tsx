import React, { useEffect } from "react";
import Ic_close_black from "@/assets/images/Ic_close_black.svg";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  isOpen?: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body?.classList.add("h-screen");
      document.body.style.overflow = "hidden";
    } else {
      document.body?.classList.remove("h-screen");
      document.body.style.overflow = "";
    }

    return () => {
      document.body?.classList.remove("h-screen");
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white rounded-[12px] relative mx-[16px] border-2 border-primary">
        <div>{children}</div>
        <img
          src={Ic_close_black}
          alt="close"
          onClick={onClose}
          className="absolute top-[12px] right-[12px] lg:top-[20px] lg:right-[20px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Modal;
