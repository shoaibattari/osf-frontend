import React, { useRef, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  onClose,
  width = "400px",
  closeButtonLabel = "Close",
  heading,
  customModalClass,
}) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    return () => {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/60 ${customModalClass} z-50 p-4 transition-opacity duration-600 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`relative bg-white rounded-lg shadow-md p-4 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[1000px] transition-all duration-300 transform ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b-2 pb-3 border-border-grey">
          <h2 className="text-base laptop:text-lg desktop:text-xl _4k:text-2xl font-bold text-gray-800">
            {heading}
          </h2>
          <button
            onClick={onClose}
            aria-label={closeButtonLabel}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 cursor-pointer"
          >
          <AiOutlineClose className="text-2xl" />

          </button>
        </div>

        <div className="p-4 laptop:p-2">{children}</div>
      </div>
    </div>,
    document.body // <-- Hamesha body pe render hoga
  );
};

export default Modal;