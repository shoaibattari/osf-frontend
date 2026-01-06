import React from "react";
import { useLocation } from "react-router-dom";

const DynamicViewTitle = ({ title, children, description, className }) => {
  const location = useLocation();
  return (
    <div
      className={`w-full flex justify-between items-center pt-10 ${className}`}
    >
      <div className="w-full flex flex-col gap-2 justify-start items-start">
        <h1 className="font-bold text-xl desktop:text-2xl">{title}</h1>
        {description && <p className="text-sm text-gray-700">{description}</p>}
        {location.pathname !== "/" && <div></div>}
      </div>
      {children && <div className="w-full">{children}</div>}
    </div>
  );
};

export default DynamicViewTitle;
