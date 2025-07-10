import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-40 pb-20 bg-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        "Stay motivated and keep building!"
      </h1>

      <div className="mt-6 flex justify-center gap-6 flex-wrap">
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          ➕ Add Habit
        </Link>
        <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition">
          🔐 Sign In
        </button>
      </div>
    </section>
  );
};

export default Hero;
