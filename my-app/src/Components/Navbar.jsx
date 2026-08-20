import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";

const initialFormState = {
  title: "",
  desc: "",
  assignee: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

// แปลง DD/MM/YYYY -> YYYY-MM-DD สำหรับ input type="date"
const toDateInputValue = (val) => {
  if (!val) return "";
  if (val.includes("-")) return val;
  const parts = val.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return val;
};

export const Navbar = () => {
  const [formData, setFormData] = useState(initialFormState);
  const dateInputRef = useRef(null);

  const {
    isOpen,
    closeModal,
    createTask,
    updateTask,
    editingTask,
    openCreateModal,
  } = useContext(BoardContext);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        desc: editingTask.desc || "",
        assignee: editingTask.assignee || "",
        status: editingTask.status || "todo",
        priority: editingTask.priority || "medium",
        dueDate: editingTask.dueDate || "",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingTask, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ล็อกให้ใส่ได้เฉพาะตัวเลข พร้อมจัดรูปแบบ dd/mm/yyyy และจำกัดวันไม่เกิน 31 เดือนไม่เกิน 12
  const handleDateNumberChange = (e) => {
    let digits = e.target.value.replace(/\D/g, ""); // รับเฉพาะตัวเลข 0-9

    if (digits.length > 8) {
      digits = digits.slice(0, 8); // สูงสุด 8 หลัก (DDMMYYYY)
    }

    let day = digits.slice(0, 2);
    let month = digits.slice(2, 4);
    let year = digits.slice(4, 8);

    // ตรวจสอบวัน (ไม่เกิน 31)
    if (day.length === 2) {
      let dNum = parseInt(day, 10);
      if (dNum > 31) day = "31";
      if (dNum === 0) day = "01";
    }

    // ตรวจสอบเดือน (ไม่เกิน 12)
    if (month.length === 2) {
      let mNum = parseInt(month, 10);
      if (mNum > 12) month = "12";
      if (mNum === 0) month = "01";
    }

    let formatted = day;
    if (digits.length > 2) {
      formatted += "/" + month;
    }
    if (digits.length > 4) {
      formatted += "/" + year;
    }

    setFormData((prev) => ({ ...prev, dueDate: formatted }));
  };

  const handleDatePick = (e) => {
    const inputVal = e.target.value;
    if (inputVal && inputVal.includes("-")) {
      const [year, month, day] = inputVal.split("-");
      const customFormat = `${day}/${month}/${year}`;
      setFormData((prev) => ({ ...prev, dueDate: customFormat }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    let finalDueDate = formData.dueDate;
    if (finalDueDate && finalDueDate.includes("-")) {
      const [year, month, day] = finalDueDate.split("-");
      finalDueDate = `${day}/${month}/${year}`;
    }

    const payload = {
      ...formData,
      dueDate: finalDueDate,
    };

    if (editingTask) {
      updateTask(editingTask.id, payload);
    } else {
      createTask(payload);
    }
    setFormData(initialFormState);
    closeModal();
  };

  return (
    <nav className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 sm:p-4 shadow-sm mb-4 sm:mb-5">
      <Link to="/">
        <h1 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
          <i className="fa-solid fa-kanban text-blue-600"></i> Trollel
        </h1>
      </Link>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center justify-center text-center px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap shadow-sm cursor-pointer leading-normal"
          onClick={openCreateModal}
        >
          เพิ่มงาน
        </button>

        {isOpen && (
          <div
            id="taskModal"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 transition-opacity"
          >
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white p-5 sm:p-6 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom duration-200">
              {/* Mobile handle indicator */}
              <div className="w-10 h-1.25 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden"></div>

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4 mb-4 sm:mb-5">
                <h3
                  className="text-base sm:text-lg font-bold text-slate-800"
                  id="modalTitle"
                >
                  {editingTask ? "แก้ไขงาน" : "เพิ่มงานใหม่"}
                </h3>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 text-2xl leading-none transition-colors"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>

              {/* Task Form */}
              <form
                id="taskForm"
                onSubmit={handleSubmit}
                className="space-y-3.5 sm:space-y-4"
              >
                {/* Task Title */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                    ชื่อหัวข้องาน
                  </label>
                  <input
                    type="text"
                    id="taskTitle"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                    รายละเอียด
                  </label>
                  <textarea
                    id="taskDesc"
                    name="desc"
                    rows="3"
                    value={formData.desc}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Assignee */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                    ผู้รับผิดชอบ (Assignee)
                  </label>
                  <input
                    type="text"
                    id="taskAssignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Status & Priority Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                      สถานะ
                    </label>
                    <select
                      id="taskStatus"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                      ความสำคัญ
                    </label>
                    <select
                      id="taskPriority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Due Date: ล็อกตัวเลข + รูปแบบ dd/mm/yyyy */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                    กำหนดส่ง
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      id="myDate"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleDateNumberChange}
                      placeholder="dd/mm/yyyy"
                      inputMode="numeric"
                      maxLength={10}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white pr-10"
                    />

                    {/* Native date picker overlay on calendar icon */}
                    <input
                      type="date"
                      ref={dateInputRef}
                      value={toDateInputValue(formData.dueDate)}
                      onChange={handleDatePick}
                      tabIndex={-1}
                      className="absolute right-2 w-7 h-7 opacity-0 cursor-pointer z-10"
                    />

                    <div className="absolute right-3 flex items-center justify-center pointer-events-none text-slate-400">
                      <svg
                        className="w-4.5 h-4.5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="16"
                          y1="2"
                          x2="16"
                          y2="6"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="8"
                          y1="2"
                          x2="8"
                          y2="6"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="3"
                          y1="10"
                          x2="21"
                          y2="10"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-2.5 pt-3 sm:pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    className="rounded-lg bg-slate-100 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                    onClick={closeModal}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm"
                  >
                    {editingTask ? "บันทึกการแก้ไข" : "บันทึกข้อมูล"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
