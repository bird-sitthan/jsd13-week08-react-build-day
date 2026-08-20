import { useContext } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";

export default function Board() {
  const { tasks, updateTaskStatus, onDeleteTask } = useContext(BoardContext);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      updateTaskStatus(taskId, status);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  return (
    <main id="kanban-view" className="page-view block">
      <div className="flex flex-col md:flex-row gap-5 items-start overflow-x-auto pb-4">
        {columns.map((col) => {
          // กรองงานเฉพาะของคอลัมน์นี้
          const colTasks = tasks
            ? tasks.filter((t) => t.status === col.id)
            : [];

          return (
            <div
              key={col.id}
              className="flex-1 min-w-[300px] w-full bg-[#ebecf0] rounded-lg p-4"
              id={col.id}
            >
              {/* Column Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-bold text-slate-700">
                  {col.title}
                </span>
                <span
                  className="bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                  id={`badge-${col.id}`}
                >
                  {colTasks.length}
                </span>
              </div>

              {/* Drop Container & Render Cards */}
              <div
                className="flex flex-col gap-3 min-h-[150px]"
                id={`cards-${col.id}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                {colTasks.map((taskItem) => (
                  <div
                    key={taskItem.id}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, taskItem.id)}
                    className="bg-white rounded-lg p-3 shadow-sm hover:shadow transition cursor-grab active:cursor-grabbing flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800">
                        {taskItem.title}
                      </h4>
                      {taskItem.desc && (
                        <p className="text-xs text-slate-500 mt-1">
                          {taskItem.desc}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onDeleteTask(taskItem.id)}
                      className="text-slate-400 hover:text-red-500 text-xs p-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
