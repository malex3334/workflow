import logo from "./logo.svg";
import "./App.css";
import Sidemenu from "./components/Sidemenu";
import DashBoard from "./components/DashBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useGlobalContext } from "./context";
import { Routes, NavLink, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import UserSettings from "./pages/UserSettings";

function App() {
  const { user, setUser } = useGlobalContext();

  return (
    <div className="app-container">
      <Navigation />
      <div className="header">
        <Sidemenu />
      </div>

      <div className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user && <Login />} />
          {/* TODO - REDIRECT IF LOGGED IN AND TRYING TO LOG IN */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={user && <DashBoard />} />
          <Route path="/user/" element={<UserSettings user={user} />} />
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "2rem",
        }}
        className="test"
      >
        <h2 style={{ textAlign: "center" }}>testing utils</h2> <br />
        <button>login as user</button> <br />
        <button>login as company</button>
      </div>
    </div>
  );
}

export default App;
