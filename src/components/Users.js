import React, { useState } from "react";
import {
  useUsersState,
  useUsersDispatch,
  getUsers
} from "../contexts/UsersContext";
import axios from "axios";
import useAsync from "./hook-custom/useAsync";
import User from "./User";

const Users = () => {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  // const [state, refetch] = useAsync(getUsers, [], true);

  const { data: users, loading, error } = state.users; // state.data를 users 키워드로 조회
  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
};

export default Users;
