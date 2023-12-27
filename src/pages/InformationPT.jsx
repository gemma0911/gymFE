import React, { useState, useEffect } from 'react';

const InformationPT = () => {

    const [bookDates, setBookDates] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/pt/findAllPt")
            .then(response => response.json())
            .then(data => setBookDates(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    return (
        <>
            <div className="mt-[70px] mb-[20px] text-center font-medium"><h1>DANH SÁCH HUẤN LUYỆN VIÊN</h1></div>
            <div class="grid grid-cols-3 gap-4">
                {
                    bookDates.map((item) => {
                        return (
                            <div class="p-4 bg-gray-200">
                                <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                    <div class="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                                        <img src={`${item.images}`} alt="profile-picture" />
                                    </div>
                                    <div class="p-6 text-center">
                                        <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                            {item.name}
                                        </h4>
                                        <p class="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                                            {item.phone}
                                        </p>
                                    </div>
                                    <div class="flex justify-center gap-7 p-6 pt-2">
                                        <a
                                            href="#facebook"
                                            class="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
                                        >
                                            <i class="fab fa-facebook" aria-hidden="true"></i>
                                        </a>
                                        <a
                                            href="#twitter"
                                            class="block bg-gradient-to-tr from-light-blue-600 to-light-blue-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
                                        >
                                            <i class="fab fa-twitter" aria-hidden="true"></i>
                                        </a>
                                        <a
                                            href="#instagram"
                                            class="block bg-gradient-to-tr from-purple-600 to-purple-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
                                        >
                                            <i class="fab fa-instagram" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <link
                rel="stylesheet"
                href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
                integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
                crossorigin="anonymous"
            />
        </>
    )
}

export default InformationPT