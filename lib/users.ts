import useSWR from "swr";
import { TUser } from "../type/Typescript";

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR("users?_start=60&_end=70");

  return { users: data as TUser[], error, isLoading, mutate };
}
