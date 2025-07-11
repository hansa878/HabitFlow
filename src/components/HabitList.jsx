import { useEffect, useState } from "react";

// Fullscreen Sign In / Sign Up Modal
const AuthModal = ({ onLogin }) => {
  const [mode, setMode] = useState("signin"); // or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    if (!email || !password) return alert("All fields are required.");

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (mode === "signup") {
      if (users[email]) return alert("User already exists.");
      users[email] = { email, password };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created. Now sign in.");
      setMode("signin");
    } else {
      if (!users[email] || users[email].password !== password) {
        return alert("Invalid credentials.");
      }
      localStorage.setItem("currentUser", email);
      onLogin(email);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm mx-auto p-8 rounded-lg shadow-lg text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
        >
          {mode === "signup" ? "Create Account" : "Login"}
        </button>

        <p className="text-sm text-gray-600">
          {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          >
            {mode === "signup" ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

const HabitList = () => {
  const [user, setUser] = useState(localStorage.getItem("currentUser"));
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [type, setType] = useState("daily");

  // Save habits to localStorage when changed
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newHabit = { name, type, done: false };
    setHabits([...habits, newHabit]);
    setName("");
    setType("daily");
  };

  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].done = !updated[index].done;
    setHabits(updated);
  };

  const removeHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <div className="pt-28 px-4 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Track Your Habits
      </h1>

      {user ? (
        <>
          {/* Logout button */}
          <div className="mb-6">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Log Out
            </button>
          </div>

          {/* Add Habit Form */}
          <form
            onSubmit={addHabit}
            className="bg-white shadow p-6 rounded-xl space-y-4 mb-8 border"
          >
            <input
              type="text"
              placeholder="Enter habit name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="daily">🗓️ Daily</option>
              <option value="weekly">📅 Weekly</option>
              <option value="monthly">🗓️ Monthly</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded hover:opacity-90 transition"
            >
              Add
            </button>
          </form>

          {/* Habit List */}
          <div className="space-y-3">
            {habits.map((habit, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow"
              >
                <div>
                  <strong className="text-gray-800">{habit.name}</strong> (
                  {habit.type})
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => toggleHabit(index)}
                    className={`text-sm font-medium ${
                      habit.done ? "text-green-600" : "text-blue-600"
                    } underline`}
                  >
                    {habit.done ? "✅" : "Mark Done"}
                  </button>
                  <button
                    onClick={() => removeHabit(index)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium underline"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <AuthModal onLogin={setUser} />
      )}
    </div>
  );
};

export default HabitList;
