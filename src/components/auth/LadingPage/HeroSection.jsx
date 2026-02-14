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

        <div className="mt-8 bg-white/90 text-black p-4 md:p-6 rounded-lg max-w-xl text-start shadow-lg border-l-8 border-green-600">
          <h3 className="font-bold text-lg md:text-xl mb-2 underline">
            Instructions:
          </h3>
          <ul className="list-disc list-outside ml-3 text-sm md:text-base space-y-1">
            <li>ONLY FOR OKHAI MEMON COMMUNITY</li>
            <li>AGE CRITERIA: 6 TO 16 YEARS</li>
            <li>FEES: RS. 350/- PER PARTICIPANT</li>
            <li>
              ONE CANDIDATE CAN SELECT TWO GAMES, BUT IF SNAKE & LADDERS IS
              SELECTED, NO SECOND GAME IS ALLOWED
            </li>

            <li>
              T-SHIRTS & LUNCH (FOR PARTICIPANTS) WILL BE PROVIDED BY MANAGEMENT
            </li>
            <li>FESTIVAL WILL BE HELD AFTER RAMZAN</li>
          </ul>
        </div>
        {/* CTA Button - Green Theme from Logo */}
        <div className="my-10">
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
