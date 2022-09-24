import { useEffect } from "react";
import { useState, useCallback } from "react";

function useFetch(dataType) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const url = "api/";
  // const maxResults = "40";

  // const fetchBooks = useCallback(async () => {
  //   setLoading(true);

  //   try {
  //     // const response = await fetch(`${url}${dataType}`);
  //     const response = await fetch(`${url}projects`);
  //     const data = await response.json();
  //     // filter if in library
  //     console.log(data);

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     setError(error);
  //   }
  // }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        // const response = await fetch(`${url}${dataType}`);
        const response = await fetch(`${url}projects`);
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
  return { setData, data, setLoading, loading, error };
}

export default useFetch;
