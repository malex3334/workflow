import Sidemenu from "./components/Sidemenu";
import DashBoard from "./pages/Projects/DashBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useGlobalContext } from "./context";
import { Routes, NavLink, Route, Navigate, useParams } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import UserSettings from "./pages/UserSettings";
import ProjectList from "./pages/Projects/ProjectList";
import NewProjectForm from "./pages/Projects/NewProjectForm";

function App() {
  const { user, setUser } = useGlobalContext();

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
          <Route path="/dashboard/projects/:id" element={<DashBoard />} />
          <Route path="/user/" element={<UserSettings user={user} />} />
          <Route
            path="/newproject"
            element={user.type === "company" && <NewProjectForm />}
          />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          {/* <main className="main">
        <div>navigation / current</div>
        <div>
        <h2>Board title</h2>
        </div>
        <div>Filters</div>
        <DashBoard />
      </main> */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
