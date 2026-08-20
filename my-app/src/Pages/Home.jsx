import { useContext } from "react";
import { BoardContext } from "../Context/BoardContext/BoardContext";
import Board from "../Components/Board";

function Home() {
  const { tasks, columns, onMoveTask, onDeleteTask } = useContext(BoardContext);

  return (
    <div className="bg-slate-50 p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200/60">
      <Board
        tasks={tasks}
        columns={columns}
        onMoveTask={onMoveTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
}

export default Home;
