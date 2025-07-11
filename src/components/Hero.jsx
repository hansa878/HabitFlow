import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch("/api/quote");
        const result = await response.json();

        setQuote(result[0].q);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    };

    getQuote();
  }, []);

  return (
    <section className="pt-40 pb-20 bg-white text-center px-4">
      <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-6">
        "{quote}"
      </h1>

      <div className="mt-6 flex justify-center gap-6 flex-wrap">
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Add Habit
        </Link>
        <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition">
          Sign In
        </button>
      </div>
    </section>
  );
};

export default Hero;
