import React from "react";
import { useState, useEffect } from "react";
import AddCard from "./AddCard";
import BoardStats from "./BoardStats";
import Board from "./Board";


export const AddCardForm = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "เขียนโค้ด AddCardForm", status: "todo" },
    { id: 2, title: "ออกแบบ Card UI", status: "doing" },
    { id: 3, title: "Setup โปรเจกต์", status: "done" },
  ]);

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

      <h1 className="text-2xl font-bold mb-4">:clipboard: My Trello Board</h1>

      <AddCard onAddTask={handleAddTask} />

      <BoardStats tasks={tasks} />

      <Board
        tasks={tasks}
        columns={columns}
        onMoveTask={handleMoveTask}
        onDeleteTask={handleDeleteTask}
      />

    </div>
  );
};
