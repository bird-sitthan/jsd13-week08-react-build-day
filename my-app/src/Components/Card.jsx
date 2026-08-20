export default function Card({
  task,
  columns,
  onMoveTask,
  onDeleteTask,
  onEditTask,
}) {
  // หาตำแหน่งคอลัมน์ปัจจุบันจาก columns ที่ App.jsx ส่งลงมา (เช่น ["todo","doing","done"])
  const currentIndex = columns.indexOf(task.status);
  const isFirstColumn = currentIndex === 0;
  const isLastColumn = currentIndex === columns.length - 1;

  const handleMoveForward = () => {
    const nextStatus = columns[currentIndex + 1];
    onMoveTask(task.id, nextStatus);
  };

  const handleMoveBackward = () => {
    const prevStatus = columns[currentIndex - 1];
    onMoveTask(task.id, prevStatus);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };
  const handleEdit = () => {
    if (onEditTask) onEditTask(task);
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 mb-2 flex items-center justify-between">
      <span className="text-sm">{task.title}</span>

      <div className="flex gap-2 items-center">
        {/* คอลัมน์แรกสุด ไม่ต้องมีปุ่มย้อนกลับ */}
        {!isFirstColumn && (
          <button
            onClick={handleMoveBackward}
            className="text-gray-500 hover:text-blue-500"
          >
            ←
          </button>
        )}

        {/* คอลัมน์สุดท้าย ไม่ต้องมีปุ่มไปข้างหน้า */}
        {!isLastColumn && (
          <button
            onClick={handleMoveForward}
            className="text-gray-500 hover:text-blue-500"
          >
            →
          </button>
        )}
        <button
          onClick={handleEdit}
          className="text-gray-500 hover:text-gray-600 transition-colors"
          title="แก้ไขงาน"
        >
          edit
        </button>
        <button
          onClick={handleDelete}
          className="text-gray-500 hover:text-red-500"
        >
          x
        </button>
      </div>
    </div>
  );
}
