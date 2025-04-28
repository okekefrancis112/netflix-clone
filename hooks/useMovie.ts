import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useMovie = (id?: string) => {
    const {
        data,
        error,
        isLoading,
    } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
  return {
    data,
    error,
    isLoading,
  };
};
export default useMovie;
// This code defines a custom hook `useMovie` that uses the `useSWR` library to fetch movie data from the `/api/movies/${id}` endpoint.
// It takes an optional `id` parameter, and if provided, it fetches the movie data for that specific ID.
// The hook returns the fetched data, any error that occurred during the fetch, a loading state, and a function to mutate (revalidate) the data.
// The `fetcher` function is used to make the actual HTTP request to the API endpoint.
// The `useSWR` hook is a React hook that provides a way to fetch data and keep it up-to-date in a React application.
// It handles caching, revalidation, focus tracking, and more.
// The `revalidateIfStale`, `revalidateOnFocus`, and `revalidateOnReconnect` options are set to `false` to prevent automatic revalidation of the data.
// This means that the data will not be re-fetched when the component is focused or when the network connection is restored.
// This can be useful for performance optimization, especially if the data does not change frequently.
// The `isLoading` property indicates whether the data is currently being loaded.