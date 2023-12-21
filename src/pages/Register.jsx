import React, { useState } from 'react';

const Register = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    numberOfSessions: 0,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/employee/addFreeDom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
        alert('Registration successful');

        // Clear form data
        setFormData({
          username: '',
          password: '',
          name: '',
          phone: '',
          numberOfSessions: 0,
        });
        // You can perform additional actions after a successful registration
      } else {
        console.error('Registration failed');
        // Handle registration failure, display error message, etc.
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/employee/addPersonalTraining', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
        alert('Registration successful');

        // Clear form data
        setFormData({
          username: '',
          password: '',
          name: '',
          phone: '',
          numberOfSessions: 0,
        });
        // You can perform additional actions after a successful registration
      } else {
        console.error('Registration failed');
        // Handle registration failure, display error message, etc.
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          {/* Registration form */}
          <form onSubmit={handleSubmit}>
            {/* User Name */}
            <div className="mb-5">
              <label htmlFor="username" className="mb-3 block text-base font-medium text-[#07074D]">
                User Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Name */}
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Number of Sessions */}
            <div className="mb-5">
              <label htmlFor="numberOfSessions" className="mb-3 block text-base font-medium text-[#07074D]">
                Số lượng buổi (Hoặc Tháng) tập.
              </label>
              <input
                type="number"
                name="numberOfSessions"
                id="numberOfSessions"
                placeholder="5"
                min="0"
                value={formData.numberOfSessions}
                onChange={handleChange}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Submit buttons */}
            <div className="flex gap-10">
              <button
                type="button"
                onClick={handleSubmit }
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Đăng kí thường
              </button>
              <button
                type="button"
                onClick={handleSubmit2 }
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Đăng kí VIP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
