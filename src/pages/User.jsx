import React, { useState, useEffect } from 'react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id : '',
    username: '',
    name: '',
    date_create: '',
    phone: '',
    numberWeek: '',
    id_freedomRes : 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/employee/findAlllUserFreeDom');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [users]); // Empty dependency array means this effect runs once after the initial render

  const handleInputChange = (e, userId, field) => {
    const updatedUsers = users.map((user) => {
      if (user.user_id === userId) {
        return { ...user, [field]: e.target.value };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleEdit = (id, username, name, phone, date_create, numberWeek,id_freedomRes
    ) => {
    setEditingUserId(id);
    setEditFormData({
      id,
      username,
      name,
      phone,
      date_create,
      numberWeek,
      id_freedomRes
    });
  };

  const handleSave = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/employee/updateInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData), // Use editFormData instead of users.find(...)
      });
      if (response.ok) {
        console.log(`User with ID ${userId} updated successfully`);
        setEditingUserId(null); // Hide the form after saving
      } else {
        console.error(`Failed to update user with ID ${userId}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      // Send the DELETE request to the server
      const response = await fetch(`http://localhost:8080/employee/deleteUser/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Delete the user from the state locally
        setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
        console.log(`User with ID ${userId} deleted successfully`);
      } else {
        console.error(`Failed to delete user with ID ${userId}`);
        // If the deletion on the server fails, you might want to display an error message
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditFormInputChange = (e, field) => {
    setEditFormData({
      ...editFormData,
      [field]: e.target.value,
    });
  };
  const handleCloseForm = () => {
    setEditingUserId(null);
  };
  return (
    <>
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex">
          <h1 className="text-3xl">Quản lý người dùng</h1>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-2 px-3">Tên đăng nhập</th>
                <th className="text-left p-2 px-3">Tên</th>
                <th className="text-left p-2 px-3">Ngày đăng ký</th>
                <th className="text-left p-2 px-3">Số tháng</th>
                <th className="text-left p-2 px-3">Phone</th>
                {/* Add other table headers based on your API response */}
                <th></th>
              </tr>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-orange-100">
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) => handleInputChange(e, user.id, 'username')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => handleInputChange(e, user.id, 'name')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.date_create}
                      onChange={(e) => handleInputChange(e, user.id, 'date_create')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.numberWeek}
                      onChange={(e) => handleInputChange(e, user.id, 'numberWeek')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.phone}
                      onChange={(e) => handleInputChange(e, user.id, 'phone')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  {/* Add other table cells based on your API response */}
                  <td className="p-2 px-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleEdit(user.id,user.username,user.name,user.phone,user.date_create,user.numberWeek,user.id_freedomRes
                        )}
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingUserId && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <div>
              <input
                type="text"
                value={editFormData.username}
                onChange={(e) => handleEditFormInputChange(e, 'username')}
                className="focus:outline-none border-b w-full pb-2 p-5 border-sky-400 placeholder-gray-500"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) => handleEditFormInputChange(e, 'name')}
                className="focus:outline-none border-b w-full pb-2 p-5 border-sky-400 placeholder-gray-500 my-8"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                type="text"
                value={editFormData.date_create}
                onChange={(e) => handleEditFormInputChange(e, 'date_create')}
                className="focus:outline-none border-b w-full pb-2 p-5 border-sky-400 placeholder-gray-500 mb-8"
                placeholder="Date Create"
              />
            </div>
            <div>
              <input
                type="text"
                value={editFormData.phone}
                onChange={(e) => handleEditFormInputChange(e, 'phone')}
                className="focus:outline-none border-b w-full pb-2 p-5 border-sky-400 placeholder-gray-500 mb-8"
                placeholder="Phone"
              />
            </div>
            <div>
              <input
                type="text"
                value={editFormData.numberWeek}
                onChange={(e) => handleEditFormInputChange(e, 'numberWeek')}
                className="focus:outline-none border-b w-full pb-2 p-5 border-sky-400 placeholder-gray-500 mb-8"
                placeholder="Number of Weeks"
              />
            </div>
            <div className="flex justify-center my-6">
              <button
                onClick={() => handleSave(editingUserId)}
                className="rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold"
              >
                Save
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleCloseForm}
                className="rounded-full p-3 w-full sm:w-56 bg-red-500 text-white text-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
