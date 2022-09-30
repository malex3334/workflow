import Sidemenu from "./components/Sidemenu";
import Dashboard from "./pages/Projects/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useGlobalContext } from "./context";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import UserSettings from "./pages/UserSettings";
import ProjectList from "./pages/Projects/ProjectList";
import NewProjectForm from "./pages/Projects/NewProjectForm";
import EditProjectForm from "./pages/Projects/EditProjectForm";
import useFetch from "./hooks/useFetch";
import { useEffect } from "react";

function App() {
  const { user, setUser } = useGlobalContext();

  const { data } = useFetch("comments/");
  const { data: tasks } = useFetch("tasks/");
  const { data: relations, loading } = useFetch("relations/");

  useEffect(() => {
    console.log(
      "data",
      data
      // "users",
      // relations.relations?.filter((relation) => relation.project === "1"),
      // "project",
      // relations.projects?.filter((project) => project.id === "1")
    );
  }, [loading]);

  return (
    <div className="app-container">
      <Navigation />
      <div className="header">{user && <Sidemenu />}</div>

      <div className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user && <Login />} />
          {/* TODO - REDIRECT IF LOGGED IN AND TRYING TO LOG IN */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={user && <ProjectList />} />
          <Route path="/dashboard/projects/:id" element={<Dashboard />} />
          <Route path="/user/" element={<UserSettings user={user} />} />
          <Route
            path="/newproject"
            element={user.type === "company" && <NewProjectForm />}
          />
          <Route
            path="/editproject/:id"
            element={user.type === "company" && <EditProjectForm />}
          />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
