import { useState } from "react";

export default function AddCardForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (onAddTask) {
      onAddTask(title.trim());
    }
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full md:w-auto"
    >
      <input
        type="text"
        placeholder="กรอกชื่องานด่วน..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full md:w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition shadow-sm whitespace-nowrap"
      >
        เพิ่ม
      </button>
    </form>
  );
}
