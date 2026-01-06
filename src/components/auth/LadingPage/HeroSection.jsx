// src/components/landing/HomePage.jsx
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <div className="flex flex-col justify-center items-center text-center bg-gradient-to-b from-green/10 to-white px-6 py-10 laptop-sm:py-16">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Okhai Memon Jamat Logo"
          className="h-28 md:h-40 mb-6 animate-fade-in-scale drop-shadow-2xl"
        />

        {/* Titles */}
        <h1 className="text-3xl phone:text-5xl tablet:text-6xl laptop:text-7xl font-extrabold text-green">
          OKHAI MEMON JAMAT
        </h1>
        <h2 className="mt-2 text-xl phone:text-3xl tablet:text-4xl laptop:text-5xl font-bold text-primary">
          SPORTS COMMITTEE
        </h2>

        {/* Tagline */}
        <p className="mt-5 max-w-4xl text-base phone:text-lg tablet:text-xl laptop:text-2xl text-mediumGray animate-fade-slide">
          Empowering the Okhai Memon Community through sports, youth development
          initiatives.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col phone:flex-row gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-xl bg-green text-white font-semibold text-lg shadow-lg hover:scale-105 transition-all"
          >
            📝 Register for Sports Event
          </button>
        </div>
      </div>

      {/* ================= CORE SERVICES ================= */}
      <div className="py-20 bg-lightBlue/30">
        <h2 className="text-3xl laptop:text-5xl font-extrabold text-green text-center mb-14">
          Our Core Services
        </h2>

        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all animate-fade-in-scale">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-green mb-2">
              Educational Programs
            </h3>
            <p className="text-mediumGray">
              IT courses, workshops, and learning initiatives for youth.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all animate-fade-in-scale delay-100">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-green mb-2">
              Community Welfare
            </h3>
            <p className="text-mediumGray">
              Scholarships, support programs, and welfare assistance.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all animate-fade-in-scale delay-200">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-green mb-2">
              Sports & Events
            </h3>
            <p className="text-mediumGray">
              Sports competitions, youth events, and talent engagement.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all animate-fade-in-scale delay-300">
            <div className="text-6xl mb-4">🎟️</div>
            <h3 className="text-xl font-bold text-green mb-2">
              Digital Registration
            </h3>
            <p className="text-mediumGray">
              Online registration, token-based games, and entry tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
