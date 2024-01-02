import React, { useState, useEffect } from 'react';

const SalaryPT = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [salaryTotal, setSalaryTotal] = useState('');

    const [salary, setSalary] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/pt/salary/${localStorage.getItem("id")}`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [users]); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response = await fetch(`http://localhost:8080/pt/salaryTotal/${localStorage.getItem("id")}`);
                const data = await response.json();
                setSalary(data);
                console.log(salary)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData1();

    }, [salary]);


    const filteredUsers = users.filter((user) => {
        if (user.date === null) {
            // Handle the case when date is null, for example, you might want to show these entries or not
            // Adjust this logic based on your requirements
            return true;
        }
        return user.date.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleEdit = () => {
        setEditingUserId(true);
    };

    const handleCloseForm = () => {
        setEditingUserId(false);
    };

    const handleWithdraw = async () => {
        try {

            if (isNaN(salaryTotal)) {
                alert("Vui lòng nhập số tiền chính xác")
                return;
            }

            if(salaryTotal < 200000) {
                alert("Vui lòng nhập số tiền lớn hơn 200,000")
                return;
            }

            // Make the API request with the input data
            // if(salaryTotal>=200000) {

                const response = await fetch('http://localhost:8080/pt/withdrawmoney', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pt : {
                        id : localStorage.getItem("id")
                    }, 
                    salary : salaryTotal
                }),

            });
            
            // } else {
            //     alert("Số tiền phải lớn hơn 200.000")
            //     return;
            // }
    
            if (response.ok) {
                // Withdrawal successful, handle any UI updates or notifications
                console.log('Withdrawal successful');
                alert("Rút thành công")
                setEditingUserId(false);
            } else {
                // Handle errors, e.g., show an error message
                console.error('Withdrawal failed');
                alert("Tiền không đủ")
            }
        } catch (error) {
            console.error('Error during withdrawal:', error);
        } finally {
            // Reset withdrawal form state
            setWithdrawAmount('');
            handleCloseForm();
        }
    };
    

    return (
        <>
            {
                salary && (
                    <div class="py-5 ml-[50px] mr-[50px]">
                        <main class="h-full overflow-y-auto">
                            <div class="container  mx-auto grid">
                                <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                                    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                        <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Tổng số buổi tập
                                            </p>
                                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                                {salary.numberSession}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                        <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Số tiền tích lũy
                                            </p>
                                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            {salary.salary ? salary.salary.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                        <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                My Tutorials
                                            </p>
                                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                                376
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center p-4  rounded-lg shadow-xs bg-blue-800">

                                        <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                                            </svg>
                                        </div>
                                        <button onClick={handleEdit}>
                                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Rút tiền
                                            </p>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </main>
                    </div>
                )
            }
            <div class="max-w-2xl mx-auto mb-[30px]">
                <div>
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search"
                            id="default-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} class="block p-4 pl-10 w-full 
    text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search by date" required />
                        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </div>
            </div>
            <div className="text-gray-900 bg-gray-200">
                <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr className="border-b">
                                <th className="text-left p-2 px-3">Số tiền rút</th>
                                <th className="text-left p-2 px-3">Ngày thanh toán</th>
                                <th className="text-left p-2 px-3">Tình trạng</th>
                                <th></th>
                            </tr>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-orange-100">
                                    <td className="p-2 px-3">
                                        <input
                                            type="text"
                                            value=   {user.salary ? user.salary.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                                            onChange={(e) => handleInputChange(e, user.id, 'date_create')}
                                            className="bg-transparent border-b-2 border-gray-300 py-2"
                                        />
                                    </td>
                                    {user.date === null ? (
                                        <td className="p-2 px-3">
                                            <input
                                                type="text"
                                                value="..."
                                                onChange={(e) => handleInputChange(e, user.id, 'date')}
                                                className="bg-transparent border-b-2 border-gray-300 py-2"
                                            />
                                        </td>
                                    ) : (
                                        <td className="p-2 px-3">
                                            <input
                                                type="text"
                                                value={user.date}
                                                onChange={(e) => handleInputChange(e, user.id, 'date')}
                                                className="bg-transparent border-b-2 border-gray-300 py-2"
                                            />
                                        </td>
                                    )}
                                    {
                                        user.status == "YES" ? (
                                            <td className="p-2 px-3">
                                                <input
                                                    type="text"
                                                    value="Đã thanh toán"
                                                    onChange={(e) => handleInputChange(e, user.id, 'numberWeek')}
                                                    className="bg-transparent border-b-2 border-gray-300 py-2"
                                                />
                                            </td>
                                        ) : (
                                            <td className="p-2 px-3">
                                                <input
                                                    type="text"
                                                    value="Chưa thanh toán"
                                                    onChange={(e) => handleInputChange(e, user.id, 'numberWeek')}
                                                    className="bg-transparent border-b-2 border-gray-300 py-2"
                                                />
                                            </td>
                                        )
                                    }
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
                                onChange={(e) => setSalaryTotal(e.target.value)}
                                type="text"
                                className="focus:outline-none border-b w-full pb-2 p-5 border-sky-400 placeholder-gray-500 mb-8"
                                placeholder="Nhập số tiền muốn rút"
                            />
                        </div>
                        <div className="flex justify-center my-6">
                            <button
                            onClick={handleWithdraw}
                                className="rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold"
                            >
                                Rút
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

export default SalaryPT;

