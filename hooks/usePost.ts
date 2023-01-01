import axios from "axios";
import useSWR from "swr";
import { TPost } from "../type/Typescript";

interface IProps {
  limit: number;
}

function usePost({ limit }: IProps) {
  // const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading, mutate } = useSWR(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
  );

  return { posts: data as TPost[], error, isLoading, mutate };
}

export default usePost;
