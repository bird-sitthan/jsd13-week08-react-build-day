import { useState } from "react";
import { BoardContext } from "./BoardContext";
import { mockTasks } from "../../mockdata";

export const BoardProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);

  const createTask = (newTaskData) => {
    const newTask = {
      id: String(Date.now()),
      ...newTaskData,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // ฟังก์ชันย้ายสถานะ Task (สำหรับ Drag and Drop หรือกดปุ่มเลื่อน)
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        String(t.id) === String(taskId) ? { ...t, status: newStatus } : t,
      ),
    );
  };

  const onDeleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((t) => String(t.id) !== String(taskId)),
    );
  };

  const closeModal = () => setIsOpen(false);
  const handleFormSubmit = (e) => e.preventDefault();

  const value = {
    isOpen,
    setIsOpen,
    tasks, // <--- ส่ง tasks ออกไปใช้งาน
    setTasks,
    createTask,
    updateTaskStatus,
    onDeleteTask,
    closeModal,
    handleFormSubmit,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
