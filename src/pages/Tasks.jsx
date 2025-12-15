import { useEffect, useState } from "react";
import initialTasks from "../data/tasks"; // import initial tasks

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    status: "Pending",
    priority: "Medium",
  });
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Load initial tasks from localStorage or from tasks.js
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (data && data.length > 0) {
      setTasks(data);
    } else {
      setTasks(initialTasks); // load from tasks.js
      localStorage.setItem("tasks", JSON.stringify(initialTasks));
    }
  }, []);

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const submitTask = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return; // prevent empty titles

    if (editId) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, ...form } : t));
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now(), ...form, date: new Date().toISOString().slice(0,10) }
      ]);
    }

    setForm({ title: "", status: "Pending", priority: "Medium" });
  };

  const editTask = (task) => {
    setForm(task);
    setEditId(task.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };


  let filtered = tasks
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter(t => filterStatus ? t.status === filterStatus : true)
    .filter(t => filterPriority ? t.priority === filterPriority : true);

  if (sortBy === "date") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (sortBy === "priority") {
    const order = { High: 1, Medium: 2, Low: 3 };
    filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  return (
    <div className="page">
      <h2>Tasks</h2>

      <form className="card" onSubmit={submitTask}>
  <div className="form-row">
    <input
      placeholder="Task Title"
      value={form.title}
      onChange={e => setForm({ ...form, title: e.target.value })}
    />

    <select
      value={form.status}
      onChange={e => setForm({ ...form, status: e.target.value })}
    >
      <option>Pending</option>
      <option>Completed</option>
    </select>

    <select
      value={form.priority}
      onChange={e => setForm({ ...form, priority: e.target.value })}
    >
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>

    <button type="submit">{editId ? "Update Task" : "Add Task"}</button>
  </div>
</form>



      <div className="controls">
        <input placeholder="Search by title" onChange={e => setSearch(e.target.value)} />

        <select onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <select onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.date}</td>
                <td>
                  <button style={{marginRight:'10px'}} onClick={() => editTask(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
