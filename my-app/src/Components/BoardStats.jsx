function BoardStats({ tasks }) {
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const remainingTasks = totalTasks - doneTasks;
  const percent = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
      {totalTasks === 0 ? (
        <p className="text-gray-500">The board is empty.</p>
      ) : (
        <>
          <p className="mb-2 text-sm text-gray-700 md:text-base">
            Total <span className="font-bold">{totalTasks}</span> tasks · Done{" "}
            <span className="font-bold text-green-600">{doneTasks}</span> · Remaining{" "}
            <span className="font-bold text-orange-600">{remainingTasks}</span>
          </p>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-green-500 transition-all duration-300"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-500">{percent}% complete</p>
        </>
      )}
    </div>
  );
export default function BoardStats() {
  return <div>BoardStats</div>;
}

export default BoardStats;
