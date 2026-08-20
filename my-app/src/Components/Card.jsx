import { useContext } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";

const columnLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

// แปลงรูปแบบวันที่เป็น DD/MM/YYYY ด้วย split('-')
const formatThaiDate = (dateString) => {
  if (!dateString) return "";
  try {
    const [year, month, day] = dateString.split("-");
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
  } catch (err) {
    console.error("Error formatting date:", err);
  }
  return dateString;
};

export default function Card({
  task,
  columns = ["todo", "in-progress", "done"],
  onMoveTask: propOnMoveTask,
  onDeleteTask,
}) {
  const context = useContext(BoardContext) || {};
  const openEditModal = context.openEditModal;
  const onMoveTask = propOnMoveTask ?? context.onMoveTask;

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteTask(task.id);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleCardClick = () => {
    if (openEditModal) {
      openEditModal(task);
    }
  };

  const handleMove = (e, newStatus) => {
    e.preventDefault();
    e.stopPropagation();
    if (onMoveTask) {
      onMoveTask(task.id, newStatus);
    }
  };

  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const priorityBadge = priorityColors[task.priority] || priorityColors.medium;

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onClick={handleCardClick}
      className="bg-white rounded-lg sm:rounded-xl shadow-xs border border-slate-200/90 p-3 sm:p-3.5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer select-none group"
    >
      {/* Title & Delete Action */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="font-semibold text-slate-800 text-xs sm:text-sm leading-snug flex-1 break-words group-hover:text-blue-600 transition-colors">
          {task.title}
        </h3>
        <button
          type="button"
          onClick={handleDelete}
          title="ลบงานนี้"
          className="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 text-xs transition font-semibold shrink-0 cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Description if present */}
      {task.desc && (
        <p className="text-[11px] sm:text-xs text-slate-500 mb-2.5 line-clamp-2 break-words">
          {task.desc}
        </p>
      )}

      {/* Metadata row 1: Priority, Assignee, Thai Due Date */}
      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pb-2 text-[10px] sm:text-[11px]">
        {task.priority && (
          <span
            className={`px-1.5 sm:px-2 py-0.5 rounded border text-[9px] sm:text-[10px] font-semibold capitalize ${priorityBadge}`}
          >
            {task.priority}
          </span>
        )}

        {task.assignee && (
          <span className="text-slate-600 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded truncate max-w-[110px]">
            {task.assignee}
          </span>
        )}

        {task.dueDate && (
          <span className="text-slate-500 bg-slate-50 px-1.5 sm:px-2 py-0.5 rounded ml-auto text-[10px]">
            {formatThaiDate(task.dueDate)}
          </span>
        )}
      </div>

      {/* Metadata row 2: Quick Move Buttons (ไม่มีลูกศร) */}
      <div className="flex items-center justify-between gap-1 pt-2 border-t border-slate-100">
        <span className="text-[10px] text-slate-400 font-medium shrink-0">ย้ายไป:</span>
        <div className="flex items-center gap-1 flex-wrap justify-end">
          {columns.map((col) => {
            const isCurrent = col === task.status;
            const label = columnLabels[col] || col;

            if (isCurrent) return null; // ไม่ต้องแสดงปุ่มของสถานะปัจจุบัน

            return (
              <button
                key={col}
                type="button"
                onClick={(e) => handleMove(e, col)}
                className="px-2.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-slate-200 text-slate-600 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
