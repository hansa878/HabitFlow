import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-800 text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span></span>
          <span className="text-blue-400">HabitFlow</span>
        </Link>
        <div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition"
            onClick={() => alert("Signed out!")}>Signed Out

          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
