import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const variants = {
  primary: "bg-primary text-white hover:bg-primary/50",
  secondary: "bg-green-500 text-white hover:opacity-50",
  success: "bg-green/50 text-white hover:bg-green/10",
  danger: "bg-red/90 text-white hover:bg-red/50",
  warning: "bg-yellow/50 text-white hover:bg-yellow/10",
  light: "bg-gray/10 text-gray-800 hover:bg-gray/10",
  dark: "bg-gray/80 text-white hover:bg-gray/40",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-7 py-3 text-lg",
};

const CommonButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "";

  // 🧠 Dynamic icon selection logic
  const LeftIcon = leftIcon === true ? FaArrowLeft : leftIcon;
  const RightIcon = rightIcon === true ? FaArrowRight : rightIcon;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {leftIcon && (
        <span className="mr-1">
          <LeftIcon /> {/* ✅ Proper way to render dynamic icon */}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className="ml-1">
          <RightIcon />
        </span>
      )}
    </button>
  );
};

export default CommonButton;
