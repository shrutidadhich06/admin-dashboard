import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);   // mobile
  const [collapsed, setCollapsed] = useState(false);      // desktop

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(prev => !prev);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);
  const toggleCollapse = () => setCollapsed(prev => !prev);

  return (
    <BrowserRouter>
      <div className={`app ${collapsed ? "collapsed-layout" : ""}`}>

        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={collapsed}
          toggleCollapse={toggleCollapse}
          closeSidebar={closeSidebar}
        />

        {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

        <div className="main">
          <Navbar toggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
