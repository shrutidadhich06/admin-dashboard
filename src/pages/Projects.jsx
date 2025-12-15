import { useEffect, useState } from "react";
import initialProjects from "../data/projects"; // import default projects

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("projects"));
    if (data && data.length > 0) setProjects(data);
    else {
      setProjects(initialProjects);
      localStorage.setItem("projects", JSON.stringify(initialProjects));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const submitProject = () => {
    if (!name.trim()) return;

    if (editId) {
      setProjects(
        projects.map(p =>
          p.id === editId ? { ...p, name, desc } : p
        )
      );
    } else {
      setProjects([
        ...projects,
        { id: Date.now(), name, desc },
      ]);
    }

    setName("");
    setDesc("");
    setEditId(null);
    setShowModal(false);
  };

  const editProject = (p) => {
    setName(p.name);
    setDesc(p.desc);
    setEditId(p.id);
    setShowModal(true);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Projects</h2>
        <button onClick={() => setShowModal(true)}>+ Add Project</button>
      </div>

      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.desc}</td>
                <td>
                  <button style={{marginRight:'10px'}} onClick={() => editProject(p)}>Edit</button>
                  <button onClick={() => deleteProject(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId ? "Edit Project" : "Add Project"}</h3>

            <input
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Project Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={submitProject}>
                {editId ? "Update" : "Add"}
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
