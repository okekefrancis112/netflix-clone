import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useFavorites = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
  return {
    data,
    error,
    isLoading,
    mutate, // The `mutate` function is used to revalidate the data, which can be useful for updating the UI with the latest data from the server.
  };
};
export default useFavorites;