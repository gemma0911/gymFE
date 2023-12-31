import React, { useState, useEffect } from 'react';

const SalaryPayment = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/employee/salary2');
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
                <th className="text-left p-2 px-3">Tổng tiền rút</th>
                <th className="text-left p-2 px-3">Ngày thanh toán</th>
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
                      value= {user.salary ? user.salary.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                      onChange={(e) => handleInputChange(e, user.id, 'date_create')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  </td>
                  <td className="p-2 px-3">
                    <input
                      type="text"
                      value={user.date}
                      onChange={(e) => handleInputChange(e, user.id, 'numberWeek')}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
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

export default SalaryPayment;
