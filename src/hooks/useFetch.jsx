import { RestSerializer, Serializer } from "miragejs";
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
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const deleteData = async (id, collection) => {
    setLoading(true);
    try {
      await fetch(`/api/${collection}/${id}`, {
        method: "DELETE",
      });
      setData((prev) => prev.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  const updateData = async (id, collection, updatedValue) => {
    setLoading(true);
    try {
      await fetch(`/api/${collection}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedValue),
      });
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
    setRerender(!rerender);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/${dataFrom}`);
        // const response = await fetch(`${url}projects`);
        const data = await response.json();
        setData(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError(error);
      }
    };
    fetchBooks();
  }, [rerender]);

  return {
    setData,
    data,
    setLoading,
    loading,
    error,
    rerender,
    setRerender,
    postData,
    deleteData,
    updateData,
  };
}

export default useFetch;
