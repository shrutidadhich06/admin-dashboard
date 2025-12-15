import { NavLink } from "react-router-dom";


function Sidebar({ isOpen, isCollapsed, toggleCollapse, closeSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
      
      <div className="sidebar-header">
        {!isCollapsed && <h2>Admin</h2>}
        <button className="collapse-btn" onClick={toggleCollapse}>
          {isCollapsed ? "➡" : "⬅"}
        </button>
      </div>

      <NavLink to="/" onClick={closeSidebar} className="sidebar-link">
        <span className="icon">🏠</span>
        {!isCollapsed && <span className="text">Dashboard</span>}
      </NavLink>

      <NavLink to="/projects" onClick={closeSidebar} className="sidebar-link">
        <span className="icon">📁</span>
        {!isCollapsed && <span className="text">Projects</span>}
      </NavLink>

      <NavLink to="/tasks" onClick={closeSidebar} className="sidebar-link">
        <span className="icon">✅</span>
        {!isCollapsed && <span className="text">Tasks</span>}
      </NavLink>

      <NavLink to="/users" onClick={closeSidebar} className="sidebar-link">
        <span className="icon">👥</span>
        {!isCollapsed && <span className="text">Users</span>}
      </NavLink>
    </div>
  );
}

export default Sidebar;
