import React from "react";
import axios from "axios";
import useAsync from "./hook-custom/useAsync";

const getUser = async id => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
};

const User = ({ id }) => {
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>website</b> {user.website}
      </p>
    </div>
  );
};

export default User;
