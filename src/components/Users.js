import React, { useEffect, useReducer } from "react";
import axios from "axios";

// useReducer로 요청 상태 관리
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const Users = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  });

  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        dispatch({ type: "SUCCESS", data: response.data });
      })
      .catch(error => {
        dispatch({ type: "ERROR", error: error });
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state; // state.data를 users 키워드로 조회

  if (loading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
};

export default Users;
