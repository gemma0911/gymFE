import React, { useState, useEffect } from 'react';

const DateBook = () => {
    const [formData, setFormData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);
    const [ptOptions, setPtOptions] = useState([]);
    const [pt, setPt] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [session, setSession] = useState([]);


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

    const handle = async (e) => {
        console.log(e)
        try {

            const postData = {
                date: selectedDate,
                trainingSessionModel: { id: e },
                user: { id: localStorage.getItem('id') },
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
                handleSubmit()
                alert("Đăng ký thành công");
            } else {
                console.error('Failed to add calendar entry');
                alert("Bạn đã hết buổi tập");
            }
        } catch (error) {
            console.error('Error during calendar entry:', error);
        }
    }

    const handleSubmit = async () => {
        try {
            if(!pt) {
                alert("Bạn chưa chọn pt")
                return;
            }
            if(!selectedDate) {
                alert("Bạn chưa chọn ngày")
                return;
            }
            fetchTimeOptions();
            setSuccessMessage(`Đây là lịch của pt vào ngày ${selectedDate}`)

            const ptResponse = await fetch(`http://localhost:8080/user/findBy/${selectedDate}/${pt}`);
            if (ptResponse.ok) {
                const ptData = await ptResponse.json();
                setSession(ptData);
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
        const fetchPt = async () => {
            try {
                const response = await fetch('http://localhost:8080/pt/findAllPt');
                if (response.ok) {
                    const data = await response.json();
                    setPtOptions(data);
                } else {
                    console.error('Failed to fetch time options');
                }
            } catch (error) {
                console.error('Error fetching time options:', error);
            }
        };
        fetchPt()
    }, [ptOptions]);

    const sessionMap = {};
    session.forEach((item) => {
        sessionMap[item.trainingSessionModel.id] = item;
    });

    return (
        <>
            <div>
                <div className="flex flex-row justify-center items-center p-12 gap-3">
                    {/* First Column */}
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
                    </div>

                    {/* Second Column */}
                    <div className="mx-auto w-full max-w-[550px]">
                        <div className="mb-5">
                            <label htmlFor="pt" className="mb-3 block text-base font-medium text-[#07074D]">
                                Chọn PT
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
                    </div>
                </div>
                <div className='flex justify-center mb-[30px]'>
                    <button
                        type="button"
                        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        onClick={handleSubmit}
                    >
                        Xem lịch tập
                    </button>
                </div>
                <div className="flex justify-center mb-[20px] text-green-500">{successMessage}</div>
                <table class="border-collapse w-full">
                    <thead>
                        <tr>
                            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Ca tập</th>
                            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Trạng thái</th>
                            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeOptions.map((option) => {
                            const sessionData = sessionMap[option.id];
                            const isSlotOccupied = sessionData ? (
                                <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">CÓ LỊCH</span>
                            ) : (
                                <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">TRỐNG LỊCH</span>
                            );

                            const isSlotOccupied2 = sessionData ? (
                                <button className="rounded bg-red-400 py-1 px-3 text-xs font-bold">Không thể đăng ký</button>
                            ) : (
                                <button onClick={() => handle(option.id)} className="rounded bg-yellow-400 py-1 px-3 text-xs font-bold hover:bg-blue-700">Đăng ký</button>
                            );

                            return (
                                <tr key={option.id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Company name</span>
                                        {`${option.start} - ${option.finish}`}
                                    </td>
                                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                                        {isSlotOccupied}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static ">
                                        {isSlotOccupied2}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DateBook;
