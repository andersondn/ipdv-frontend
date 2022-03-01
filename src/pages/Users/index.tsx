import React from "react";
import useSWR from "swr";

// import { Container } from './styles';

const Users: React.FC = () => {
  const { data: users, error } = useSWR("/users");

  return (
    <>
      <h1>Users page</h1>

      {JSON.stringify(users)}
      {JSON.stringify(error)}
    </>
  );
};

export default Users;
