import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:8080/api/authenticate/login';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
        
            if (response.ok) {
                const responseData = await response.json(); // Parse response data
                alert(responseData.id);
                console.log('Login successful');
                localStorage.setItem('id',responseData.id)
                localStorage.setItem('name',responseData.name)
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <div className='flex items-center justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br'>
                <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl'>
                    <div className='max-w-md mx-auto space-y-3'>
                        <h3 className="text-lg font-semibold">&#128540; My Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block py-1">Your username</label>
                                <input
                                    type="text"  // Changed from email to text
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}  // Changed from setEmail to setUsername
                                    className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
                                />
                                <p className="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
                            </div>
                            <div>
                                <label className="block py-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
                                />
                            </div>
                            <div className="flex gap-3 pt-3 items-center">
                                <button
                                    type="submit"
                                    className="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300"
                                >
                                    Login
                                </button>
                                <a href="#">Forgot Password</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
