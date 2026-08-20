import Card from "./Card";

export default function Column({
  column,
  tasks = [],
  columns = [],
  onMoveTask,
  onDeleteTask,
}) {
  // ชั้นที่ 1: กรอง (filter) เอาเฉพาะ task ที่มี status ตรงกับ column ตัวเอง
  const columnTasks = tasks.filter((task) => task.status === column);

  return (
    <div className="flex-1 bg-gray-200 rounded-lg p-4 min-w-[260px] flex flex-col">
      {/* ส่วนหัวของ Column แสดงชื่อคอลัมน์และจำนวนงาน */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-700 capitalize text-lg">
          {column}
        </h2>
        <span className="bg-gray-300 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {columnTasks.length}
        </span>
      </div>

      {/* ชั้นที่ 2: วนลูป (map) สร้าง Card ส่งต่อ props ให้ Card.jsx */}
      <div className="space-y-2 flex-1">
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
