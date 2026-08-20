import { useContext } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";
import Card from "./Card";
export default function Board() {
  const { tasks, updateTaskStatus, onDeleteTask, openEditModal } =
    useContext(BoardContext);

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

  // ดึงเฉพาะ ID สถานะส่งไปให้ Card นำไปคำนวณตำแหน่ง index
  const columnIds = columns.map((col) => col.id);

  return (
    <main id="kanban-view" className="page-view block">
      <div className="flex flex-col md:flex-row gap-5 items-start overflow-x-auto pb-4">
        {columns.map((col) => {
          // กรองงานเฉพาะคอลัมน์ และกัน Error ด้วย Optional Chaining
          const colTasks = tasks
            ? tasks.filter((t) => t?.status === col.id)
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

              {/* Drop Zone Container */}
              <div
                className="flex flex-col gap-1 min-h-[150px]"
                id={`cards-${col.id}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                {colTasks.map((taskItem) => (
                  <div
                    key={taskItem.id}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, taskItem.id)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <Card
                      task={taskItem}
                      columns={columnIds}
                      onMoveTask={updateTaskStatus}
                      onDeleteTask={onDeleteTask}
                      onEditTask={openEditModal}
                    />
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
