import { useState } from "react";

const AuthModal = ({ onClose, onLogin }) => {
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
      alert("Account created. Please sign in.");
      setMode("signin");
    } else {
      if (!users[email] || users[email].password !== password) {
        return alert("Invalid email or password.");
      }
      localStorage.setItem("currentUser", email);
      onLogin(email);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h2 className="text-xl font-bold">
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={handleAuth}
        >
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-center text-sm text-gray-600">
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

export default AuthModal;
