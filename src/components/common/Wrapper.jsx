// src/components/common/Wrapper.jsx

const Wrapper = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-[1200px] mx-auto px-4 tablet:px-6 laptop:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
