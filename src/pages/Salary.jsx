import React, { useState, useEffect } from 'react';

const Salary = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/employee/salary');
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
      if (user.id === userId) {
        return { ...user, [field]: e.target.value };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handlePayButtonClick = async (userId) => {
    try {
      // Make a POST request to your API endpoint
      const response = await fetch('http://localhost:8080/employee/salaryUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: parseInt(userId), 
          // Add other data you want to send to the API
        }),
      });

      // Handle the response as needed
      if (response.ok) {
        console.log('Payment successful');
        // You may want to update the UI or perform additional actions here
      } else {
        console.error('Payment failed');
        // Handle the error or update the UI accordingly
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingUserId(null);
  };

  return (
    <>
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex">
          <h1 className="text-3xl">Thanh Toán Lương</h1>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-2 px-3">Tên PT</th>
                <th className="text-left p-2 px-3">Số buổi đã tập</th>
                <th className="text-left p-2 px-3">Lương/Buổi</th>
                <th className="text-left p-2 px-3">Tổng tiền</th>
                <th></th>
              </tr>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-orange-100">
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.pt.name}
                      onChange={(e) => handleInputChange(e, user.id, 'username')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.number}
                      onChange={(e) => handleInputChange(e, user.id, 'name')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.salary}
                      onChange={(e) => handleInputChange(e, user.id, 'date_create')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.total}
                      onChange={(e) => handleInputChange(e, user.id, 'numberWeek')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handlePayButtonClick(user.id)}
                      className="mr-3 text-sm bg-green-700 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Thanh Toán
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

export default Salary;
