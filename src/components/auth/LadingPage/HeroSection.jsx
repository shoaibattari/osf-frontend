import { GiTrophyCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Subtle Overlay for Sports Feel */}

      {/* ================= MAIN UI CONTAINER ================= */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6">
        {/* Logo with White Glow */}
        <div className="my-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
          <img
            src="/logo.jpg"
            alt="Okhai Memon Jamat Logo"
            className="h-32 w-32 md:h-44 md:w-44 rounded-full border-4 border-white object-contain bg-white"
          />
        </div>

        {/* Top Label (Presents) */}
        <p className="text-white italic text-lg md:text-xl font-medium tracking-wide mb-2">
          The Okhai Memon Jamat Presents
        </p>

        {/* Main Heading - Poster Style White Text */}
        <h1 className="text-4xl phone:text-6xl tablet:text-7xl laptop:text-8xl font-black text-white italic tracking-tighter uppercase drop-shadow-lg">
          OKHAI SPORTS
        </h1>

        {/* Navy Blue Badge for "Festival" or "Committee" */}
        <div className="-mt-2.5 bg-[#002D62] text-white px-8 py-2 rounded-md shadow-2xl transform -rotate-1 skew-x-[-10deg] border-b-4 border-black/20">
          <h2 className="text-xl phone:text-3xl font-extrabold tracking-[0.2em] uppercase">
            FESTIVAL
          </h2>
        </div>

        {/* Tagline / Subtitle */}
        <p className="mt-8 max-w-2xl text-white font-semibold text-lg md:text-2xl drop-shadow-md opacity-90 leading-snug">
          Empowering the Okhai Memon Community through sports & youth
          development.
        </p>

        {/* CTA Button - Green Theme from Logo */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/register")}
            className=" px-4 laptop-sm:px-10 py-4 rounded-md cursor-pointer bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold text-sm laptop:text-xl uppercase tracking-wider shadow-[0_8px_0_rgb(27,94,32)] active:translate-y-[4px] active:shadow-none transition-all duration-150 flex items-center gap-3"
          >
            <GiTrophyCup className="text-2xl" /> Join the Festival
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
