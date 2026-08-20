import { useContext } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";

export default function BoardStats({ tasks: propTasks }) {
  const context = useContext(BoardContext) || {};
  const tasks = propTasks ?? context.tasks ?? [];

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((task) => task.status === "todo").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const percent =
    totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="mb-4 sm:mb-6 rounded-xl bg-white p-3.5 sm:p-4 shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3">
        {/* Status items summary */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          <span className="font-semibold text-slate-700 mr-0.5">
            งานทั้งหมด <span className="font-bold text-slate-900">{totalTasks}</span>
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>

          {/* แท็กสถานะ To Do */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400"></span>
            To Do: <strong className="text-slate-900">{todoTasks}</strong>
          </span>

          {/* แท็กสถานะ In Progress */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-medium">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500"></span>
            In Progress: <strong className="text-amber-900">{inProgressTasks}</strong>
          </span>

          {/* แท็กสถานะ Done */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500"></span>
            Done: <strong className="text-emerald-900">{doneTasks}</strong>
          </span>
        </div>

        <span className="self-end sm:self-auto text-[11px] sm:text-xs font-semibold text-slate-600 bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
          {percent}% เสร็จสิ้น
        </span>
      </div>

      {/* Progress Bar แสดงความคืบหน้าของงานที่ Done */}
      <div className="h-2 sm:h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
