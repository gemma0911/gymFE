import React, { useState } from 'react';

const RegisterRole = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    role: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    role: ''
  });

  const validateInput = () => {
    let valid = true;
    const newErrors = { username: '', password: '', name: '', phone: '', role: '' };

    if (!formData.username) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập.';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
      valid = false;
    }

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên.';
      valid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Vui lòng nhập số điện thoại.';
      valid = false;
    }

    if (!formData.role) {
      newErrors.role = 'Vui lòng nhập ROLE.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Handling change for ${name}: ${value}`);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      console.log('Validation failed');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/admin/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed (e.g., Authorization)
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
        alert('Registration successful');

        setFormData({
          username: '',
          password: '',
          name: '',
          phone: '',
          role: '', // Change this line
        });
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="mb-5">
              <label htmlFor="username" className="mb-3 block text-base font-medium text-[#07074D]">
                User Name
              </label>
              <input
                type="text" // Change type to "text"
                name="username"
                id="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

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
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

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
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
            <div className="mb-5">
              <label htmlFor="role" className="mb-3 block text-base font-medium text-[#07074D]">
                Chọn Role
              </label>
              <select
                name="role" // Change name to "role"
                id="role" // Change id to "role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">Chọn Role</option>
                <option value="ROLE_PT">PT</option>
                <option value="ROLE_EMPLOYEE">EMPLOYEE</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role}</p>}
            </div>

            <div className="flex gap-10">
              <button
                onClick={handleSubmit}
                type="button"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Đăng kí
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterRole;
