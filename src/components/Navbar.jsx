import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-800 text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span>🔥</span>
          <span className="text-blue-400">HabitFlow</span>
        </Link>
        {/* Keep empty for now, you said no buttons here */}
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
