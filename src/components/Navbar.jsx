function Navbar({ toggleSidebar }) {
  return (
    <div className="navbar">
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>
      <span className="nav-title">Admin Dashboard</span>
    </div>
  );
}

export default Navbar;
