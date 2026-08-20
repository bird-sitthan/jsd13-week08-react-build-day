import { useState } from "react";
import { BoardContext } from "./BoardContext";
import { mockTasks } from "../../mockdata";

export const BoardProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);
  const [editingTask, setEditingTask] = useState(null);

  const openEditModal = (task = null) => {
    setEditingTask(task);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingTask(null);
  };

  // ฟังก์ชันรองรับ Submit จาก <form> ใน Modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // ดึงค่าจาก Field ใน Form (อ้างอิงตาม attribute 'name' ของ input/select/textarea)
    const taskData = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      assignee: formData.get("assignee"),
      status: formData.get("status") || "todo",
      priority: formData.get("priority") || "medium",
      dueDate: formData.get("dueDate"),
    };

    if (editingTask) {
      // กรณีแก้ไข: วนอัปเดต Task ตาม ID
      setTasks((prev) =>
        prev.map((t) =>
          String(t.id) === String(editingTask.id) ? { ...t, ...taskData } : t,
        ),
      );
    } else {
      // กรณีเพิ่มใหม่: สร้าง ID ใหม่แล้วเพิ่มลง State
      const newTask = {
        id: String(Date.now()),
        ...taskData,
      };
      setTasks((prev) => [...prev, newTask]);
    }

    closeModal();
  };

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

  const value = {
    isOpen,
    setIsOpen,
    tasks,
    setTasks,
    updateTaskStatus,
    onDeleteTask,
    closeModal,
    handleFormSubmit,
    openEditModal,
    editingTask,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
