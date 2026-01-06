// src/components/landing/HomePage.jsx (OMJ Fully Updated Version)
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../../common";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center bg-gradient-to-b from-green/10 to-white px-6 py-4 laptop-sm:py-12">
        {/* Official Logo */}
        <img
          src="./logo.png"
          alt="Okhai Memon Jamat Social Welfare Committee Logo"
          className="h-32 md:h-48 mb-4 animate-fade-in-scale drop-shadow-2xl"
        />

        {/* Main Titles */}
        <h1 className="text-3xl phone:text-5xl tablet:text-6xl laptop:text-7xl font-extrabold text-green">
          OKHAI MEMON JAMAT
        </h1>
        <h2 className="mt-3 text-2xl phone:text-4xl tablet:text-5xl laptop:text-6xl font-bold text-primary">
          SOCIAL WELFARE COMMITTEE
        </h2>

        {/* Tagline */}
        <p className="mt-4 max-w-4xl text-lg phone:text-xl tablet:text-2xl laptop:text-3xl text-mediumGray animate-fade-slide">
          Empowering the Okhai Memon Community through education, health, social
          welfare, and youth initiatives since our foundation.
        </p>

        {/* Hero Buttons */}
        <div className="mt-6 flex flex-col tablet:flex-row gap-6 justify-center items-center">
          <CommonButton
            onClick={() => navigate("/event-form")}
            variant="primary"
            size="lg"
            className="min-w-[280px] py-4 hover:bg-green/90"
          >
            Register for an Event
          </CommonButton>

          <CommonButton
            onClick={() => navigate("/course-form")}
            variant="secondary"
            size="lg"
            className="min-w-[280px] py-4 hover:bg-green/50"
          >
            Enroll in a Course
          </CommonButton>
        </div>

        {/* Admin Access */}
        <div className="mt-6">
          <CommonButton
            onClick={() => navigate("/login")}
            variant="primary"
            size="md"
            className="opacity-85 hover:opacity-100 transition-opacity"
          >
            Admin Portal
          </CommonButton>
        </div>
      </div>

      {/* Core Services Section */}
      <div className="py-24 bg-lightBlue/30">
        <h2 className="text-4xl laptop:text-5xl font-extrabold text-green text-center mb-16">
          Our Core Services
        </h2>
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-scale group">
            <div className="text-6xl mb-6">🎓</div>
            <h3 className="text-2xl font-bold text-green mb-2">
              Educational Programs
            </h3>
            <p className="text-mediumGray">
              Skill-building workshops, IT courses, and awareness sessions for
              youth and community members.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-scale delay-100 group">
            <div className="text-6xl mb-6">🤝</div>
            <h3 className="text-2xl font-bold text-green mb-2">
              Community Welfare
            </h3>
            <p className="text-mediumGray">
              Supporting social welfare, scholarships, and community development
              projects for members in need.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-scale delay-200 group">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-2xl font-bold text-green mb-2">
              Event Management
            </h3>
            <p className="text-mediumGray">
              Organizing community events, seminars, and competitions with
              smooth registration and attendance tracking.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-scale delay-300 group">
            <div className="text-6xl mb-6">🎟️</div>
            <h3 className="text-2xl font-bold text-green mb-2">
              Digital Entry & Participation
            </h3>
            <p className="text-mediumGray">
              Secure digital entry passes and check-ins for events, workshops,
              and welfare programs, ensuring smooth participation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
