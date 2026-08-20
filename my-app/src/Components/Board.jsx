import { useContext } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";

export default function Board() {
  const { task } = useContext(BoardContext);
  const handleDragOver = (e) => {
    e.preventDefault();
    // setIsDragOver(true);
  };

  // ดักจับจังหวะลากออกจาก Column
  const handleDragLeave = () => {
    // setIsDragOver(false);
  };

  // ดักจับจังหวะปล่อย Card ลงใน Column
  const handleDrop = (e) => {
    e.preventDefault();
    //setIsDragOver(false);

    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      //updateTaskStatus(taskId, status); // อัปเดต State ผ่าน Context
    }
  };
  return (
    <main id="kanban-view" className="page-view block">
      <div className="flex flex-col md:flex-row gap-5 items-start overflow-x-auto pb-4">
        <div
          className="flex-1 min-w-[300px] w-full bg-[#ebecf0] rounded-lg p-4"
          id="todo"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-bold text-slate-700">To Do</span>
            <span
              className="bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold"
              id="badge-todo"
            >
              0
            </span>
          </div>

          <div
            className="flex flex-col gap-3 min-h-[150px]"
            id="cards-todo"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></div>
        </div>

        <div
          className="flex-1 min-w-[300px] w-full bg-[#ebecf0] rounded-lg p-4"
          id="in-progress"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-bold text-slate-700">
              In Progress
            </span>
            <span
              className="bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold"
              id="badge-in-progress"
            >
              0
            </span>
          </div>
          Hello
          {task && (
            <div>
              <h1>{task.title}</h1>
              <p>{task.desc}</p>
            </div>
          )}
          <div
            className="flex flex-col gap-3 min-h-[150px]"
            id="cards-in-progress"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></div>
        </div>

        <div
          className="flex-1 min-w-[300px] w-full bg-[#ebecf0] rounded-lg p-4"
          id="done"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-bold text-slate-700">Done</span>
            <span
              className="bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold"
              id="badge-done"
            >
              0
            </span>
          </div>
          <div
            className="flex flex-col gap-3 min-h-[150px]"
            id="cards-done"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></div>
        </div>
      </div>
    </main>
  );
}
