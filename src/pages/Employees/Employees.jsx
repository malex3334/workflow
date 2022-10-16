import React from "react";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";
import EmployeeCard from "./EmployeeCard";

export default function Employees() {
  const { user } = useGlobalContext();
  const { data, loading, rerender, setRerender } = useFetch("users/");

  if (loading) {
    return <Loader />;
  }

  if (user.type === "company") {
    return (
      <div>
        <h2>Employees:</h2>
        <ul className="employees-container">
          {data &&
            data.users.map((user) => {
              return (
                <EmployeeCard
                  user={user}
                  rerender={rerender}
                  setRerender={setRerender}
                />
              );
            })}
        </ul>
        <div className="underline"></div>
      </div>
    );
  }
}
