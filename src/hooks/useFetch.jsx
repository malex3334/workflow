import { useEffect } from "react";
import { useState, useCallback } from "react";

// function useFetch(dataFrom, methodType = "GET", bodyObj) {
function useFetch(dataFrom) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rerender, setRerender] = useState(false);

  const postData = async (collection, newObject) => {
    try {
      const response = await fetch(`/api/${collection}`, {
        method: "POST",
        body: JSON.stringify(newObject),
      });
      const test = await response.json();
      // console.log([...filteredData, { ...newProject }]);
      // setFilteredData([...filteredData, { ...newProject }]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/${dataFrom}`);
        // const response = await fetch(`${url}projects`);
        const data = await response.json();
        console.log(data);
        setData(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError(error);
      }
    };
    fetchBooks();
  }, []);

  return {
    setData,
    data,
    setLoading,
    loading,
    error,
    rerender,
    setRerender,
    postData,
  };
}

export default useFetch;
