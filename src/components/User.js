import React, { useEffect } from "react";
import {
  useUsersState,
  useUsersDispatch,
  getUser
} from "../contexts/UsersContext";

const User = ({ id }) => {
  //   const [state] = useAsync(() => getUser(id), [id]);
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  const { loading, data: user, error } = state.user;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return null;

  console.log(user);
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
