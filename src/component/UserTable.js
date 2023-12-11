 import React, { useState, useEffect } from 'react';
import '../style/UserTable.css';

const UserTable = ({ users: initialUsers, setUsers }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsersState] = useState(initialUsers);

  useEffect(() => {
    setUsersState(initialUsers);
  }, [initialUsers]);

  const handleEditClick = (userId, userData) => {
    setEditingUserId(userId);
    setEditedUserData(userData);
  };

  const handleDeleteClick = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleSaveClick = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...editedUserData } : user
    );
    setUsers(updatedUsers);
    resetEditingState();
  };

  const resetEditingState = () => {
    setEditingUserId(null);
    setEditedUserData({});
  };

  const handleInputChange = (field, value) => {
    setEditedUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCheckboxChange = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      return prevSelectedRows.includes(userId)
        ? prevSelectedRows.filter((id) => id !== userId)
        : [...prevSelectedRows, userId];
    });
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.id}</td>
              {['name', 'email', 'role'].map((field) => (
                <td key={field}>
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editedUserData[field] || user[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                  ) : (
                    user[field]
                  )}
                </td>
              ))}
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button onClick={() => handleSaveClick(user.id)}>Save</button>
                    <button onClick={resetEditingState}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(user.id, user)}>Edit</button>
                    <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="user-actions">
        <button onClick={handleDeleteSelected}>Delete Selected</button>
      </div>
    </div>
  );
};

export default UserTable;