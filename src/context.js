import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const { data, loading } = useFetch();
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   fetch("/api/projects")
  //     .then((res) => res.json())
  //     .then((json) => setProjects(json));
  // }, []);

  // console.log(projects);

  return (
    <AppContext.Provider value={{ user, setUser, data, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
