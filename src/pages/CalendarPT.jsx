import React, { useState, useEffect } from 'react';

const CalendarPT = () => {
    const [bookDates, setBookDates] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu từ server khi component được mount
        fetch(`http://localhost:8080/pt/findCalendar/${localStorage.getItem('id')}`)
            .then(response => response.json())
            .then(data => setBookDates(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Rỗng để chỉ gọi một lần khi component được mount


    const handleCheckIn = async (bookDateId) => {
        try {
            // Tìm bookDate cần check-in
            const updatedBookDate = bookDates.find(bookDate => bookDate.id === bookDateId);
    
            // Kiểm tra xem có bookDate cần check-in không
            if (!updatedBookDate) {
                console.error('BookDate not found');
                return;
            }
    
            // Cập nhật trạng thái checkIn
            const updatedBookDateWithCheckIn = { ...updatedBookDate, checkIn: "YES" };
    
            // Gửi yêu cầu POST đến server chỉ với dữ liệu của bookDate cụ thể
            const response = await fetch('http://localhost:8080/user/updateCheckIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBookDateWithCheckIn),
            });
    
            // Kiểm tra trạng thái của phản hồi từ server
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Đọc và xử lý phản hồi từ server nếu cần
            const data = await response.json();
            console.log(data);
    
            // Cập nhật state chỉ với dữ liệu của bookDate cụ thể
            setBookDates(prevBookDates => {
                return prevBookDates.map(bookDate => {
                    return bookDate.id === updatedBookDate.id ? updatedBookDateWithCheckIn : bookDate;
                });
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error checking in:', error.message);
        }
    };
    
    

    return (
        <div className="flex flex-wrap -mx-3 mb-5">
            <div className="w-full px-3 mb-6">
                <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                    <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                        <div className="flex-auto block py-8 pt-6 px-9 overflow-x-auto">
                            <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                <thead className="align-bottom">
                                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                        <th className="pb-3 text-left ml-[20px] min-w-[100px]">Tên người tập</th>
                                        <th className="pb-3 text-center min-w-[100px]">Ca tập</th>
                                        <th className="pb-3 text-center min-w-[100px]">Ngày</th>
                                        <th className="pb-3 text-center min-w-[100px]">Số điện thoại</th>
                                        <th className="pb-3 text-center min-w-[100px]">Tình trạng</th>
                                        {/* <th className="pb-3 text-center min-w-[100px]">Hủy lịch tập</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookDates.map(bookDate => (
                                        <tr key={bookDate.id} className="border-b border-dashed last:border-b-0">
                                            <td className="p-3 pr-0 text-center">
                                                <div className="flex items-center">
                                                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                                        <img src={`https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-48-new.jpg`} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                                                    </div>
                                                    <div className="flex flex-col justify-start">
                                                        <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                                            {bookDate.user.name}
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 pr-0 text-center">
                                                <span className="font-semibold text-light-inverse text-md/normal">{bookDate.trainingSessionModel.start} - {bookDate.trainingSessionModel.finish}</span>
                                            </td>
                                            <td className="p-3 pr-0 text-center">
                                                <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                                    {bookDate.date}
                                                </span>
                                            </td>
                                            <td className="p-3 pr-0 text-center">
                                                <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">{bookDate.user.phone}</span>
                                            </td>
                                            <td className="pr-0 text-center">
                                                {
                                                    bookDate.checkIn == "NO" ?
                                                        <button class="group relative h-12 w-24 overflow-hidden rounded-2xl bg-green-500 text-[10px] font-bold text-white">
                                                            Chưa tập
                                                            <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                        </button>
                                                        : (
                                                            <button class="group relative h-12 w-24 overflow-hidden rounded-2xl bg-red-950 text-[10px] font-bold text-white">
                                                                Đã tập
                                                                <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                            </button>
                                                        )
                                                }
                                            </td>
                                            {/* <td className="p-3 pr-0 text-center">
                                                <button class="group relative h-12 w-24 overflow-hidden rounded-2xl bg-green-500 text-[10px] font-bold text-white">
                                                    Hủy lịch tập
                                                    <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                </button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-3 mb-6 mx-auto">
                <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                </div>
            </div>
        </div>
    );
};

export default CalendarPT;
