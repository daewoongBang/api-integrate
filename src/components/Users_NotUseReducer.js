import React, { useState, useEffect } from "react";
import axios from "axios";

// useReducer 사용 안 한 코드
const Users = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);
      setUsers(null);
      setLoading(true);
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          setError(error);
        });

      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
  );
};

export default Users;
