import { Button } from 'primereact/button';
import {Navigate} from "react-router-dom";
import React from "react";
import { useNavigate  } from "react-router-dom"

export default function Logout() {
    const navigate = useNavigate();

    const goToLogin = () =>{
        navigate('/login');
    }

    return (
    <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div
            style={{background: 'radial-gradient(50% 109137.91% at 50% 50%, rgba(233, 30, 99, 0.1) 0%, rgba(254, 244, 247, 0) 100%)'}}
            className="text-center">
            <span className="mb-3 mt-3 text-pink-500 font-bold text-2xl inline-block px-3">Вы вышли из программы CARM-REACT</span>
        </div>
        <div className="mt-6 mb-5 font-bold text-6xl text-900 text-center">Ваша сессия завершена</div>
        <p className="text-700 text-3xl mt-0 mb-6 text-center">До встречи!</p>
        <div className="text-center">
            <Button onClick={goToLogin} label="Войти снова" icon="pi pi-home"/>
        </div>
    </div>
    );
}