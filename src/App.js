import {Navigate, BrowserRouter, Routes, Route, useLocation  } from "react-router-dom"
import Login from './pages/login/login';
import Monitor from './pages/monitor/monitor'
import {Reguser} from "./pages/login/reguser"
import { addLocale } from 'primereact/api';
import Cookies from 'universal-cookie';
import Logout from "./pages/login/logout";
import getCurrentTheme from "./api/Themes";
import {useEffect, useState} from "react";

addLocale('ru', {
    firstDayOfWeek: 0,
    dayNames: ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    dayNamesShort: ['пон', 'вт', 'ср', 'чет', 'пят', 'суб', 'вос'],
    dayNamesMin: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    monthNames: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    monthNamesShort: ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'нояб', 'дек'],
    today: 'Сегодня',
    clear: 'Очистить'
});

const cookies = new Cookies();
const token = cookies.get('carm-cookie-tocken');

function RequireAuth({ children }) {
    const authed = token !== "";
    //console.log("RequireAuth: authed=" + authed);
    const location = useLocation();
    return authed === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

export default function App() {
    const currentTheme = getCurrentTheme();
    const [ theme, setTheme ] = useState(currentTheme);

    useEffect(() => {
        let head = document.head;
        let link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = theme.path;

        head.appendChild(link);
        cookies.set('carm-cookie-theme', theme.name, { path: '/' });
        //return () => { head.removeChild(link); }

    }, [theme]);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact strict path="/" element= {
                            <Login /> } />
                    <Route path="/monitor" element= {
                        <RequireAuth>
                            <Monitor setTheme={setTheme} />
                        </RequireAuth>} />
                    <Route path="/login" element={
                        <Login />} />
                    <Route path="/reguser" element={
                        <Reguser />} />
                    <Route path="/logout" element={
                        <Logout />} />
                </Routes>
            </BrowserRouter>
        </div>
  );
}