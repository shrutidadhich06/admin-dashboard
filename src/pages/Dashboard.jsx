import { useEffect, useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(data);
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

  return (
    <div className="page">
      <h2>Dashboard</h2>

     
      <div className="cards">
        <div className="card">
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>
        <div className="card">
          <h3>Completed</h3>
          <p>{completed}</p>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>
      </div>

      
      <div className="card">
        <h3>Recent Tasks</h3>
        {tasks.slice(0, 5).map(task => (
          <p key={task.id}>• {task.title}</p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
