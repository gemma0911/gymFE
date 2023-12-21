import React, { useState, useEffect } from 'react';

const DateBook = () => {
    const [formData, setFormData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);
    const [ptOptions, setPtOptions] = useState([]);
    const [pt, setPt] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleChange = (e) => {
        setPt(e.target.value);
    };

    const handleTimeChange = (e) => {
        const selectedTime = e.target.value;
        setSelectedTime(selectedTime);
    };

    const postCalendarEntry = async () => {
        try {
            const postData = {
                date: selectedDate,
                trainingSessionModel: { id: selectedTime },
                user: { id: 44 },
                pt: { id: pt },
            };
            const response = await fetch('http://localhost:8080/user/addCalendar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                console.log('Calendar entry added successfully');
                setSuccessMessage('Đăng ký thành công!');
            } else {
                console.error('Failed to add calendar entry');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error during calendar entry:', error);
            setSuccessMessage('');
        }
    };

    const handleSubmit1 = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, date: selectedDate, time: selectedTime }),
            });
            const ptResponse = await fetch(`http://localhost:8080/user/findBy/${selectedDate}/${selectedTime}`);
            if (ptResponse.ok) {
                const ptData = await ptResponse.json();
                setPtOptions(ptData);
                console.log(ptOptions);
            } else {
                console.error('Failed to fetch PT options');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const fetchTimeOptions = async () => {
        try {
            const response = await fetch('http://localhost:8080/trainingsession');
            if (response.ok) {
                const data = await response.json();
                setTimeOptions(data);
            } else {
                console.error('Failed to fetch time options');
            }
        } catch (error) {
            console.error('Error fetching time options:', error);
        }
    };

    useEffect(() => {
        fetchTimeOptions();
    }, []);

    return (
        <>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <div className="mb-5">
                        <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                            Chọn Ngày Tập
                        </label>
                        <input
                            type="date"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="Ca tập" className="mb-3 block text-base font-medium text-[#07074D]">
                            Ca tập
                        </label>
                        <select
                            name="time"
                            id="time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                            <option value="" disabled>Chọn ca tập</option>
                            {timeOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {`${option.start} - ${option.finish}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="pt" className="mb-3 block text-base font-medium text-[#07074D]">
                            PT
                        </label>
                        <select
                            name="pt"
                            id="pt"
                            value={pt}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                            <option value="" disabled>Chọn PT</option>
                            {ptOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {successMessage && (
                        <p className="text-green-600">{successMessage}</p>
                    )}
                    <div className="flex gap-10">
                        <button
                            onClick={postCalendarEntry}
                            type="submit"
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Đăng ký
                        </button>
                        <button
                            type="button"
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                            onClick={handleSubmit1}
                        >
                            Tìm kiếm PT
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DateBook;
