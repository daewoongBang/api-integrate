import React from "react";
import Users from "./components/Users";
import { UsersProvider } from "./contexts/UsersContext";

const App = () => {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
};

export default App;
