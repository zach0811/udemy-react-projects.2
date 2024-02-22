import { useEffect, useState } from "react";

export const useFetch = (fetchFn, initalValue) => {
  const [fetchedData, setFetchedData] = useState(initalValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return { fetchedData, isFetching, setFetchedData, error };
};
