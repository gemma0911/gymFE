import React, { useState, useEffect } from 'react';

const User = () => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/employee/findAlllUserPersonalTraining');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [users]); // Empty dependency array means this effect runs once after the initial render

  const handleInputChange = (e, userId, field) => {
    const updatedUsers = users.map(user => {
      if (user.user_id === userId) {
        return { ...user, [field]: e.target.value };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleSave = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/employee/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users.find(user => user.user_id === userId)),
      });
      if (response.ok) {
        console.log(`User with ID ${userId} updated successfully`);
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
                <th className="text-left p-2 px-3">Số lần còn lại</th>
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
                      onChange={(e) => handleInputChange(e, user.date_create, 'date_create')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.numberSession}
                      onChange={(e) => handleInputChange(e, user.id, 'numberSession')}
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
                      onClick={() => handleSave(user.id)}
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Save
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
    </>
  );
};

export default User;
