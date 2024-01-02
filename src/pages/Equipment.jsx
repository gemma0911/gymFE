import React, { useState, useEffect } from 'react';

const Equipment = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        status: '',
        images : ''
    });

    

    const handleEdit = (id, name, status,images) => {
        setEditingUserId(id);
        setEditFormData({
            id,
            name,
            status,
            images
        });
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

    const handleSave = async (userId) => {
        try {
          const response = await fetch(`http://localhost:8080/employee/updateEquipment`, {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/employee/findEquipment');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [users]);

    return (
        <>
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3 mb-6">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                            <div className="flex-auto block py-8 pt-6 px-9 overflow-x-auto">
                                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                    <thead className="align-bottom">
                                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                            <th className="pb-3 text-center min-w-[100px]"></th>
                                            <th className="pb-3 text-center min-w-[100px]">Tên máy</th>
                                            <th className="pb-3 text-center min-w-[100px]">Tình trạng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr className="border-b border-dashed last:border-b-0" key={user.user_id}>
                                                <td className="p-3 pr-0 text-center">
                                                    <div className="flex items-center">
                                                        <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                                            <img src={`${user.images}`} className="w-[200px] h-[200px] inline-block shrink-0 rounded-2xl" alt="" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 pr-0 text-center">
                                                    <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                                        {user.name}
                                                    </span>
                                                </td>
                                                <td className="p-3 pr-0 text-center">
                                                    <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">{user.status}</span>
                                                </td>
                                                <td>
                                                    <div className="flex justify-center my-3">
                                                        <button
                                                            onClick={() => handleEdit(user.id, user.name, user.status,user.images)}
                                                            className="rounded-full p-3 w-[100px] sm:w-28 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {editingUserId && (
                                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-8 rounded shadow-md">
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
                                                    value={editFormData.status}
                                                    onChange={(e) => handleEditFormInputChange(e, 'status')}
                                                    className="focus:outline-none border-b w-full pb-2 p-5 border-sky-400 placeholder-gray-500 mb-8"
                                                    placeholder="Phone"
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full px-3 mb-6 mx-auto">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                    </div>
                </div>
            </div>
        </>
    );
};

export default Equipment;
