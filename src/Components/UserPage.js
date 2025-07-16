import React from "react";
import { useParams } from "react-router-dom";

function UserPage() {
  const { username } = useParams();
  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>This is your personal page.</p>
    </div>
  );
}

export default UserPage;