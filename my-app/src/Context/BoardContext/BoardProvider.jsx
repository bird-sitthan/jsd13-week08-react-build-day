import { useState } from "react";
import { BoardContext } from "./BoardContext";

export const BoardProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const columns = ["todo", "in-progress", "done"];

  const openCreateModal = () => {
    setEditingTask(null);
    setIsOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingTask(null);
  };

  // สร้าง task ใหม่
  const createTask = (newTaskData) => {
    const newTask = {
      id: Date.now().toString(),
      status: "todo",
      priority: "medium",
      ...newTaskData,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // อัปเดต/แก้ไข task
  const updateTask = (id, updatedData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id.toString() === id.toString()
          ? { ...task, ...updatedData }
          : task,
      ),
    );
  };

  // ย้ายสถานะ task
  const onMoveTask = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id.toString() === id.toString()
          ? { ...task, status: newStatus }
          : task,
      ),
    );
  };

  // ลบ task
  const onDeleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id.toString() !== id.toString()),
    );
  };

  const value = {
    tasks,
    setTasks,
    columns,
    isOpen,
    setIsOpen,
    editingTask,
    openCreateModal,
    openEditModal,
    closeModal,
    createTask,
    updateTask,
    onMoveTask,
    onDeleteTask,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
