const Logo = () => {
  return (
    <div className="flex justify-center items-center">
      {/* The Spinning Logo */}
      <img
        src={"/logo.jpg"}
        className="relative w-16 h-16 rounded-full animate-spin-slow shadow-2xl"
        alt="Loading..."
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>
  );
};

export default Logo;
