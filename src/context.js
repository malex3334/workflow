import { createContext, useContext, useState } from "react";
import useFetch from "./hooks/useFetch";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const { data, setData, loading, setLoading } = useFetch("projects");

  return (
    <AppContext.Provider
      value={{ user, setUser, setData, setUser, data, loading, setLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
