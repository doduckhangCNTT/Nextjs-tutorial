import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import UserCard from "../../components/user/UserCard";
import { useUsers } from "../../lib/users";

const User = () => {
  const { users, error, isLoading, mutate } = useUsers();
  const router = useRouter();

  const initialStateUser = {
    avatar: "",
    name: "",
  };

  const [user, setUser] = useState(initialStateUser);

  const HandleInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const HandleSubmit = async (e: any) => {
    e.preventDefault();

    if (user.name && user.avatar) {
      const res = await axios.post("/users", user);
      mutate([res.data, ...users], false);
    }
  };

  if (error) return router.push("/");
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Layout>
      <form className="" onSubmit={HandleSubmit}>
        <input
          type="text"
          name="avatar"
          value={user.avatar}
          onChange={HandleInput}
          className="border-2"
          placeholder="Avatar"
        />
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={HandleInput}
          className="border-2"
          placeholder="Name"
        />

        <button className="hover:bg-sky-500 p-1 rounded-lg" type="submit">
          Submit
        </button>
      </form>

      <div className="grid grid-cols-4 gap-2">
        {users?.map((user) => {
          return (
            <div key={user.id} className="">
              <UserCard
                image={user.avatar}
                title={user.name}
                content={user.id}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default User;
