import { useState } from "react";
import { BoardContext } from "./BoardContext";
import { mockTasks } from "../../mockdata";
export const BoardProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState(mockTasks);

  const createTask = (newTaskData) => {
    const newTask = {
      id: Date.now(), // สุ่ม ID จากเวลาปัจจุบัน
      ...newTaskData,
    };
    setTasks([...tasks, newTask]);
  };

  function handleFormSubmit(e) {
    e.preventDefault();
  }
  function onMoveTask() {}
  function closeModal() {
    setIsOpen(false);
  }
  function onDeleteTask() {}
  const value = {
    isOpen,
    setIsOpen,
    handleFormSubmit,
    closeModal,
    createTask,
    onMoveTask,
    onDeleteTask,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
