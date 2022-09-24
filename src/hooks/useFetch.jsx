import { useState, useCallback } from "react";

function useFetch(searchValue, library, setSlice) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const maxResults = "40";

  const fetchBooks = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${url}+${searchValue}&maxResults=${maxResults}&key=AIzaSyAJHG4L-BIzTSK16ng9k0hrqqRE5zCFlQY`
      );
      const data = await response.json();
      // filter if in library

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }, [searchValue]);

  return { fetchBooks, setData, data, setLoading, loading, error };
}

export default useFetch;
