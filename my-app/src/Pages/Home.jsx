import AddCardForm from "../Components/AddCardForm";
import BoardStats from "../Components/BoardStats";
import Board from "../Components/Board";
import { useContext } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";
function Home() {
  // const [tasks, setTasks] = useState([
  //   { id: 1, title: "เขียนโค้ด AddCardForm", status: "todo" },
  //   { id: 2, title: "ออกแบบ Card UI", status: "doing" },
  //   { id: 3, title: "Setup โปรเจกต์", status: "done" },
  // ]);

  const { tasks, setTasks } = useContext(BoardContext);

  const columns = ["todo", "doing", "done"]; // เพิ่ม task ใหม่ (สถานะเริ่มต้น = todo)

  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      status: "todo",
    };
    setTasks([...tasks, newTask]);
  }; // ย้าย task ไปคอลัมน์ถัดไป/ก่อนหน้า

  const handleMoveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  }; // ลบ task

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AddCardForm onAddTask={handleAddTask} />

      <BoardStats tasks={tasks} />

      <Board
        tasks={tasks}
        columns={columns}
        onMoveTask={handleMoveTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default Home;
