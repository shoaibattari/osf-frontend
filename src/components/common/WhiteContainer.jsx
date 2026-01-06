import React from "react";

const WhiteContainer = ({
  children,
  heightFit,
  className,
  isNotShadowed,
  height,
}) => {
  return (
    <div
      style={{
        boxShadow: isNotShadowed ? "none" : "0px 0px 20px 0px #0000001A",
      }}
      className={`w-full bg-white rounded-md p-4 ${height} ${
        heightFit ? "h-fit" : "min-h-[65vh]"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default WhiteContainer;
