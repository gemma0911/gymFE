import React, { useState, useEffect } from 'react';

const CalendarUser = () => {
    const [bookDates, setBookDates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch data when the component mounts
        fetch(`http://localhost:8080/user/findBookDate/${localStorage.getItem('id')}`)
            .then(response => response.json())
            .then(data => setBookDates(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [bookDates]);

    const handleCheckIn = async (bookDateId) => {
        try {

            const response = await fetch(`http://localhost:8080/user/updateCheckIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
                body: JSON.stringify(bookDateId),
            });

            if (response.ok) {
                // If the request is successful, update the local state or trigger a re-fetch
                // Update the check-in status in the local state or re-fetch the data
                // Example: fetchBookDates();
            } else {
                // Handle error scenarios, if needed
                console.error('Error checking in:', response.statusText);
            }
        } catch (error) {
            console.error('Error checking in:', error.message);
        }
    };

    // Function to filter bookings based on search term
    const filterBookings = (booking) => {
        const normalizedSearchTerm = searchTerm.toLowerCase();
        return (
            booking.pt.name.toLowerCase().includes(normalizedSearchTerm) ||
            booking.date.includes(normalizedSearchTerm) ||
            `${booking.trainingSessionModel.start} - ${booking.trainingSessionModel.finish}`.includes(normalizedSearchTerm)
        );
    };

    // Filtered bookings based on the search term
    const filteredBookDates = bookDates.filter(filterBookings);

    return (
        <div className="flex flex-wrap -mx-3 mb-5">
            <div className="w-full px-3 mb-6">
                <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                    <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                        <div className="flex-auto block py-8 pt-6 px-9 overflow-x-auto">
                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search by PT name, date, or session"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block p-2 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />

                            {/* Table */}
                            <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                <thead className="align-bottom">
                                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                        <th className="pb-3 text-center min-w-[100px]">Tên PT</th>
                                        <th className="pb-3 text-center min-w-[100px]">Ca tập</th>
                                        <th className="pb-3 text-center min-w-[100px]">Ngày</th>
                                        <th className="pb-3 text-center min-w-[100px]">Số điện thoại PT</th>
                                        <th className="pb-3 text-center min-w-[100px]">CheckIn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookDates.map((bookDate) => (
                                        <tr key={bookDate.id} className="border-b border-dashed last:border-b-0">
                                            <td className="p-3 pl-0">
                                                <div className="flex items-center">
                                                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                                        <img src={`https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-48-new.jpg`} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                                                    </div>
                                                    <div className="flex flex-col justify-start">
                                                        <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                                            {bookDate.pt.name}
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
                                            <td className="p-3 pr-12 text-center">
                                                <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">{bookDate.pt.phone}</span>
                                            </td>
                                            <td className="pr-0 text-center">
                                                {
                                                    bookDate.checkIn == "NO" ?
                                                        <button onClick={() => handleCheckIn(bookDate)} class="group relative h-12 w-24 overflow-hidden rounded-2xl bg-green-500 text-[10px] font-bold text-white">
                                                            Check In
                                                            <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                        </button>
                                                        : (
                                                            <button class="group relative h-12 w-24 overflow-hidden rounded-2xl bg-red-950 text-[10px] font-bold text-white">
                                                                Đã check In
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
        </div>
    );
};

export default CalendarUser;
