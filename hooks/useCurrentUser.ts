import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useCurrentUser = () => {
  const  { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
// This code defines a custom hook `useCurrentUser` that uses the `useSWR` library to fetch the current user's data from the `/api/current` endpoint.
// It returns the fetched data, any error that occurred during the fetch, a loading state, and a function to mutate (revalidate) the data.
// The `fetcher` function is used to make the actual HTTP request to the API endpoint.
// The `useSWR` hook is a React hook that provides a way to fetch data and keep it up-to-date in a React application.
// It handles caching, revalidation, focus tracking, and more.