import axios from "axios";
import { TPost } from "../type/Typescript";
axios.defaults.withCredentials = true;

export const GetPosts = async (limit: number) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
    );
    const posts: TPost[] = await res.json();
    return posts;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const GetPostIds = async (limit: number) => {
  const posts = await GetPosts(limit);
  const res = posts?.map((p) => {
    return {
      params: {
        id: `${p.id}`,
      },
    };
  });

  return res;
};

export const GetPostById = async (id: string) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    const post = await res.json();
    return post;
  } catch (error: any) {
    console.log(error.message);
  }
};
