import { useContext } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";
import BoardStats from "./BoardStats";
import Column from "./Column";

export default function Board({
  tasks: propTasks,
  columns: propColumns,
  onMoveTask: propOnMoveTask,
  onDeleteTask: propOnDeleteTask,
}) {
  const context = useContext(BoardContext) || {};

  // ใช้ props ถ้าส่งมา ไม่เช่นนั้น fallback ไปใช้ค่าจาก Context
  const tasks = propTasks ?? context.tasks ?? [];
  const columns = propColumns ?? context.columns ?? ["todo", "in-progress", "done"];
  const onMoveTask = propOnMoveTask ?? context.onMoveTask ?? (() => {});
  const onDeleteTask = propOnDeleteTask ?? context.onDeleteTask ?? (() => {});

  return (
    <main id="kanban-view" className="page-view block w-full">
      {/* แถบสถิติ BoardStats */}
      <BoardStats tasks={tasks} />

      {/* คอลัมน์ Kanban ด้วย Grid 3 ช่องพอดีเฟรม ไม่ล้นจอ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start w-full">
        {columns.map((column) => (
          <Column
            key={column}
            column={column}
            tasks={tasks}
            columns={columns}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </main>
  );
}
