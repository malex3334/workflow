import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const testUser = {
  name: "Ojosław Ojutkowski",
  img: "😎",
  login: "ojutek",
  type: "user",
  salary: "15000",
};
const testCompany = {
  name: "NASA",
  img: "😎",
  login: "nasa_1",
  type: "company",
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(testUser);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
