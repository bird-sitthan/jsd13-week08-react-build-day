import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";

const initialFormState = {
  title: "",
  desc: "",
  assignee: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

export const Navbar = () => {
  const [formData, setFormData] = useState(initialFormState);
  const { setIsOpen, isOpen, handleFormSubmit, closeModal } =
    useContext(BoardContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm mb-5">
      <Link to={"/"}>
        <h1 className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <i className="fa-solid fa-kanban"></i> Project Manager
        </h1>
      </Link>

      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2.5 flex-wrap">
        <div className="flex flex-1 sm:flex-none gap-2">
          <Link
            to="board"
            className="tab-btn active flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-md text-sm transition-all"
          >
            <i className="fa-solid fa-table-columns"></i>
            <span className="hidden min-[481px]:inline">Board</span>
          </Link>

          <button className="tab-btn flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-md text-sm transition-all">
            <i className="fa-solid fa-file-excel"></i>
            <span className="hidden min-[481px]:inline">Excel Log</span>
          </button>

          <button className="tab-btn flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-md text-sm transition-all">
            <i className="fa-solid fa-chart-pie"></i>
            <span className="hidden min-[481px]:inline">Dashboard</span>
          </button>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-4 py-2.5
         bg-emerald-500 hover:bg-emerald-600 text-white
          font-semibold rounded-md text-sm transition-colors whitespace-nowrap"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fa-solid fa-plus"></i> เพิ่มงาน
        </button>

        {isOpen && (
          <div
            id="taskModal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity"
          >
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl transition-all">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <h3
                  className="text-lg font-bold text-slate-800"
                  id="modalTitle"
                >
                  เพิ่มงานใหม่
                </h3>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 text-2xl leading-none transition-colors"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>

              {/* Task Form */}
              <form
                id="taskForm"
                onSubmit={handleFormSubmit}
                className="space-y-4"
              >
                <input type="hidden" id="taskId" />

                {/* Task Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    ชื่อหัวข้องาน <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="taskTitle"
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="เช่น ออกแบบหน้าเว็บ..."
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    รายละเอียด
                  </label>
                  <textarea
                    id="taskDesc"
                    rows="3"
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="ระบุรายละเอียดเพิ่มเติม..."
                  ></textarea>
                </div>

                {/* Assignee */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    ผู้รับผิดชอบ (Assignee)
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    id="taskAssignee"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="เช่น ช่างมอส, ช่างต่าย"
                  />
                </div>

                {/* Status & Priority Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      สถานะ
                    </label>
                    <select
                      id="taskStatus"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      ความสำคัญ
                    </label>
                    <select
                      id="taskPriority"
                      defaultValue="medium"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    กำหนดส่ง
                  </label>
                  <input
                    type="date"
                    id="taskDueDate"
                    onChange={(e) => e.target.value}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                    onClick={closeModal}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm"
                  >
                    บันทึกข้อมูล
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
