import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css'
import Login from './pages/Login';
import User from './pages/User';
import UserVIP from './pages/UserVIP';
import Register from './pages/Register';
import { useStateContext } from './contexts/ContextProvider';
import DateBook from './pages/DateBook';
import CalendarUser from './pages/CalendarUser';
import CalendarPT from './pages/CalendarPT';
import HistoryCalendarPT from './pages/HistoryCalendarPT';
import Information from './pages/Information';
import InformationPT from './pages/InformationPT';
import Salary from './pages/Salary';
import SalaryPayment from './pages/SalaryPayment';
import SalaryPT from './pages/SalaryPT';
import RegisterRole from './pages/RegisterRole';
import Equipment from './pages/Equipment';
const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    const role = localStorage.getItem('role');

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    // Kiểm tra nếu có giá trị 'role' thì setLoggedIn(true)
  }, []);

  useEffect(() => {
    if (localStorage.getItem('role')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  },[localStorage.getItem('role')])

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {loggedIn && activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              loggedIn && activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>

                <Route path="/" element={(<Login />)} />
                <Route path="/thong-tin-pt" element={<InformationPT />} />
                
                <Route path="/user/dang-ki-lich-tap" element={<DateBook />} />
                <Route path="/user/lich-tap" element={<CalendarUser />} />
                <Route path="/user/thong-tin" element={<Information />} />

                <Route path="/employee/dang-ki-nguoi-dung" element={<Register />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employee/quan-ly-user" element={<User />} />
                <Route path="/employee/quan-ly-user-vip" element={<UserVIP />} />
                <Route path="/employee/luong" element={<Salary />} />
                <Route path="/employee/luong-da-thanh-toan" element={<SalaryPayment />} />

                <Route path="/admin/dang-ki-nguoi-dung" element={<Register />} />
                <Route path="/admin" element={<Employees />} />
                <Route path="/admin/quan-ly-user" element={<User />} />
                <Route path="/admin/quan-ly-user-vip" element={<UserVIP />} />
                <Route path="/admin/luong" element={<Salary />} />
                <Route path="/admin/luong-da-thanh-toan" element={<SalaryPayment />} />
                <Route path="/admin/dang-ky-role" element={<RegisterRole />} />
                <Route path="/admin/quan-ly-nhan-vien" element={<Employees />} />
                <Route path="/admin/quan-ly-may-moc" element={<Equipment />} />

                <Route path="/login" element={<Login />} />

                <Route path="/pt/lich-tap" element={<CalendarPT />} />
                <Route path="/pt/lich-su-tap" element={<HistoryCalendarPT />} />
                <Route path="/pt/luong" element={<SalaryPT />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
