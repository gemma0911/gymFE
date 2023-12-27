import React, { useState, useEffect } from 'react';

const Information = () => {
    const [personalTrainingData, setPersonalTrainingData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/information/${localStorage.getItem('id')}`);
                const data = await response.json();
                setPersonalTrainingData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <>
            <div className="flex-col justify-center items-center h-[100vh]">
                {personalTrainingData && (
                    <div key={personalTrainingData.personalTrainingModel.id} className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                        <div className="mt-2 mb-8 w-full">
                            <h4 className="px-4 text-xl font-bold text-navy-700 dark:text-white">
                                Thông tin cá nhân
                            </h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-2 w-full">
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">User Name</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {personalTrainingData.personalTrainingModel.user.username}
                                </p>
                            </div>
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Tên</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {personalTrainingData.personalTrainingModel.user.name}
                                </p>
                            </div>
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Số điện thoại</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {personalTrainingData.personalTrainingModel.user.phone}
                                </p>
                            </div>
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Số buổi còn lại</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {personalTrainingData.personalTrainingModel.numberSession}
                                </p>
                            </div>
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Số buổi đã tập</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {personalTrainingData.numberUser}
                                </p>
                            </div>
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Ngày đăng ký</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {personalTrainingData.personalTrainingModel.dateCreate}
                                </p>
                            </div>
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Tình trạng sức khỏe</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {personalTrainingData.personalTrainingModel.status}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Information;
