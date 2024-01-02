import React, { useState } from 'react';

const Register = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    numberOfSessions: 0,
    status : ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    numberOfSessions: '',
    status : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateInput = () => {
    let valid = true;
    const newErrors = { ...errors };

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

    if (formData.numberOfSessions <= 0) {
      newErrors.numberOfSessions = 'Vui lòng nhập số buổi tập hợp lệ.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

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

        setFormData({
          username: '',
          password: '',
          name: '',
          phone: '',
          numberOfSessions: 0,
          status : ''
        });
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

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

        setFormData({
          username: '',
          password: '',
          name: '',
          phone: '',
          numberOfSessions: 0,
          status : ''
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
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="username" className="mb-3 block text-base font-medium text-[#07074D]">
                User Name
              </label>
              <input
                type="gmail"
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
              <label htmlFor="Name" className="mb-3 block text-base font-medium text-[#07074D]">
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
              <label htmlFor="Phone" className="mb-3 block text-base font-medium text-[#07074D]">
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

            {/* ... (tương tự cho các trường khác) */}

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
              {errors.numberOfSessions && <p className="text-red-500">{errors.numberOfSessions}</p>}
            </div>
            <div className="mb-5">
              <label htmlFor="text" className="mb-3 block text-base font-medium text-[#07074D]">
                Tình trạng
              </label>
              <input
                type="text"
                name="status"
                id="status"
                placeholder="Tình trạng"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="flex gap-10">
              <button
                type="submit"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Đăng kí thường
              </button>
              <button
                type="button"
                onClick={handleSubmit2}
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
