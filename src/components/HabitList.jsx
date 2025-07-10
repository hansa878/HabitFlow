import { useState, useEffect } from "react";

const HabitList = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [type, setType] = useState("daily");

  // ✅ Add Habit
  const addHabit = (e) => {
    e.preventDefault();
    if (!name) return;
    const newHabit = { name, type, done: false };
    setHabits([...habits, newHabit]);
    setName("");
    setType("daily");
  };

  // ✅ Toggle Done
  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].done = !updated[index].done;
    setHabits(updated);
  };

  // ✅ Remove Habit
  const removeHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <div className="pt-28 px-4 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Track Your Habits</h1>

      {/* Add Habit Form */}
      <form onSubmit={addHabit} className="bg-white shadow p-6 rounded-xl space-y-4 mb-8 border">
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
              <strong className="text-gray-800">{habit.name}</strong> ({habit.type})
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
    </div>
  );
};

export default HabitList;
