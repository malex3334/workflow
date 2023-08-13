import Sidemenu from "./components/Sidemenu";
import Dashboard from "./pages/Projects/Dashboard/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useGlobalContext } from "./context";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import UserSettings from "./pages/UserSettings";
import ProjectList from "./pages/Projects/ProjectList";
import NewProjectForm from "./pages/Projects/NewProjectForm";
import EditProjectForm from "./pages/Projects/EditProjectForm";
import NotLoggedIn from "./components/NotLoggedIn";
import Employees from "./pages/Employees/Employees";
import Footer from "./components/Footer";

function App() {
  const { user, setUser } = useGlobalContext();

  return (
    <div className="app-container">
      <Navigation />
      <div className="header">{user && <Sidemenu />}</div>

      <div className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={!user && <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={user ? <ProjectList /> : <NotLoggedIn />}
          />
          <Route path="/dashboard/projects/:id" element={<Dashboard />} />
          <Route
            path="/user/"
            element={<UserSettings user={user} setUser={setUser} />}
          />
          <Route
            path="/newproject"
            element={user.type === "company" && <NewProjectForm />}
          />
          <Route
            path="/editproject/:id"
            element={user.type === "company" && <EditProjectForm />}
          />
          <Route path="*" element={<LandingPage />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
