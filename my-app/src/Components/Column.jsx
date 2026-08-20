import { useState } from "react";
import Card from "./Card";

const columnThemes = {
  todo: {
    title: "To Do",
    dot: "bg-slate-400",
    badge: "bg-slate-200 text-slate-700",
    accent: "border-t-4 border-t-slate-400",
  },
  "in-progress": {
    title: "In Progress",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800",
    accent: "border-t-4 border-t-amber-400",
  },
  done: {
    title: "Done",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800",
    accent: "border-t-4 border-t-emerald-400",
  },
};

export default function Column({
  column,
  tasks = [],
  columns = [],
  onMoveTask,
  onDeleteTask,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  // กรองเอาเฉพาะ task ที่มี status ตรงกับ column นี้
  const columnTasks = tasks.filter((task) => task.status === column);
  const theme = columnThemes[column] || {
    title: column,
    dot: "bg-slate-400",
    badge: "bg-slate-200 text-slate-700",
    accent: "border-t-4 border-t-slate-300",
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId && onMoveTask) {
      onMoveTask(taskId, column);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full rounded-xl p-3.5 sm:p-4 flex flex-col bg-[#ebecf0] transition-all duration-200 shadow-sm ${
        theme.accent
      } ${
        isDragOver
          ? "ring-2 ring-blue-400 bg-blue-50/70 border-dashed border-2 border-blue-400 shadow-md"
          : "border-2 border-transparent"
      }`}
    >
      {/* ส่วนหัวของ Column */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${theme.dot}`}></span>
          <h2 className="font-bold text-slate-700 text-sm sm:text-base">
            {theme.title}
          </h2>
        </div>
        <span
          className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 rounded-full ${theme.badge}`}
        >
          {columnTasks.length}
        </span>
      </div>

      {/* รายการ Card ใน Column พร้อม Scrollbar ภายในช่อง */}
      <div className="space-y-2.5 sm:space-y-3 flex-1 min-h-[120px] max-h-[360px] sm:max-h-[460px] md:max-h-[calc(100vh-270px)] overflow-y-auto pr-1.5 custom-scrollbar scroll-smooth">
        {columnTasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            columns={columns}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
