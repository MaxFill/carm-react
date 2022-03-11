import React, {useState, useRef, useEffect} from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useNavigate, useLocation } from 'react-router-dom'
import { getJWToken } from '../../api/JWTocken';
import Cookies from 'universal-cookie';
import { classNames } from 'primereact/utils';

const Login = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const cookies = new Cookies();
    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const [errInUser, setErrInUser] = useState(false);
    const [errInPassword, setErrInPassword] = useState(false);
    const errMsgs = useRef(null);
    const [isNowLogin, setIsNowLogin] = useState(false);

    const gotoTickets = () => {
        errMsgs.current.clear();
        if(!user){
            setErrInUser(true);
        }
        if(!password){
            setErrInPassword(true);
        }
        if(!user || !password) return;
        setIsNowLogin(true);
        setTimeout(() => {
            getJWToken(user, password).then(response=> {
                setIsNowLogin(false);
                if (response.reason != 200){
                    //console.log("response status=" + response.reason);
                    if (response.reason == 404) {
                        addErrMessages('Пользователь с такими учётными данными не найден!');
                    } else
                        if(response.reason == 500){
                            addErrMessages('При обработке запроса возникла внутренняя ошибка сервера!');
                        }
                    return;
                }
                cookies.set('carm-cookie-tocken', response.tocken, { path: '/' });
                cookies.set('carm-cookie-userid', response.userId, { path: '/' });
                navigate(state?.path || "/monitor");
            })
        }, 500);
    }
    const onUserChange = (e)=>{
        setErrInUser(false);
        setUser(e);
    }
    const onPasswordChange = (e)=>{
        setErrInPassword(false);
        setPassword(e);
    }
    const addErrMessages = (msg) => {
        errMsgs.current.show([
            { severity: 'error', summary: '', detail: msg, sticky: true }
        ]);
    }

    return (
        <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div className="logoWrapper">
                <div className="logo"/>
            </div>
            <div className="text-center mb-5">
                <div className="text-900 text-3xl font-medium mb-3 mt-3">Добро пожаловать в систему CARM-REACT!</div>
                <span className="text-600 font-medium line-height-3">Нет учётной записи?</span>
                <a href="/reguser" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"> Зарегистрируйтесь сейчас!</a>
            </div>

            <Messages ref={errMsgs} />
            <div className="p-fluid grid">
                 <div className=" col-12 md:col-2">
                    <label htmlFor="user" className="block text-900 font-medium mb-2 mt-2 " >Пользователь</label>
                 </div>
                <div className=" col-12 md:col-10">
                    <InputText id="user" type="text" value={user} autoFocus required
                               placeholder="укажите Ваш email или login"
                               onChange={(e) => onUserChange(e.target.value)}
                               className={"w-full mb-1 " + classNames( {'p-invalid': errInUser })} />
                    {errInUser && !user && <small className="p-error">Необходимо указать имя пользователя!</small>}
                </div>
                <div className=" col-12 md:col-2">
                    <label htmlFor="password" className="block text-900 font-medium mb-2 mt-2" >Пароль</label>
                </div>
                <div className=" col-12 md:col-10">
                    <InputText id="password" type="password" value={password} required
                               onChange={e=>onPasswordChange(e.target.value)} className={"w-full mb-1 " + classNames( {'p-invalid': errInPassword })}/>
                    {errInPassword && !password && <small className="p-error">Необходимо указать пароль!</small>}
                    <a href="/#" className="font-normal no-underline text-blue-500 float-right cursor-pointer">Забыли пароль?</a>
                </div>
                <div className=" col-12 md:col-2"/>
                <div className=" col-12 md:col-10">
                    <Button label="Войти" icon="pi pi-user" onClick={gotoTickets} loading={isNowLogin}/>
                </div>
                <div className=" col-12 md:col-6">
                    <label className="block text-800 font-light text-xs mt-2" >Разработка и дизайн Maksim.Filatov@rt.ru</label>
                </div>
                <div className=" col-12 md:col-6">
                    <label className="block text-800 font-light float-right text-xs mt-2" >© ООО "РТК ИТ". 2022г. Все права защищены</label>
                </div>
            </div>
        </div>
    </div>
    );
  };

export default Login;