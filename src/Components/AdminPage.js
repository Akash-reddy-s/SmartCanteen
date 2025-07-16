import React, { useEffect, useState } from "react";

function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.username}>{u.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;