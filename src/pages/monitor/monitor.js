import React, { useState, useRef } from 'react';
import { useNavigate  } from "react-router-dom"
import {Ripple} from "primereact/ripple";
import FilterPanel from './filterPanel';
import { classNames } from 'primereact/utils';
import SettingsPanel from "./settingsPanel";
import ClearPanel from "./clearPanel";
import Cookies from 'universal-cookie';
import {Tooltip} from "primereact/tooltip";
import HomePanel from "./homePanel";
import {Badge} from "primereact/badge";
import {InputText} from "primereact/inputtext";
import TicketCard from "../card/ticketCard";
import {loadTicket} from "../../api/Ticket";
import {Button} from "primereact/button";
import UserProfile from "../monitor/userProfile";
import {Toast} from "primereact/toast";

export default function Monitor(props) {
    const cookies = new Cookies();
    const token = cookies.get('carm-cookie-tocken');
    const toast = useRef(null);
    const [activeTab, setActiveTab] = useState(1);
    const navigate = useNavigate();
    const [showTicketDialog, setShowTicketDialog] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const OnCloseSission = () =>{
        const cookies = new Cookies();
        //cookies.remove("carm-cookie-tocken", {path: "/", domain: ".example.com"})
        cookies.remove("carm-cookie-tocken", {path: "/"});
        cookies.remove("carm-cookie-userid", {path: "/"});
        navigate('/logout');
    }
    const [editTicket, setEditTicket] = useState(null);
    const [ticketId, setTicketId] = useState('');
    const startSearchTicket = (e) =>{
        const val = (e.target && e.target.value) || '';
        setTicketId(val);
    }
    const onSearchTicket = () => {
        if (ticketId == null ) return;
        loadTicket(ticketId, token).then(data => {
            if (data == null) {
                toast.current.show({severity:'warn', summary: 'Заявка не найдена', detail:'Заявка с номером ['+ticketId+'] не найдена!', life: 5000});
                return;
            }
            setEditTicket(data);
            setShowTicketDialog(true);
        });
    }
    const handleKeyDown =(event) => {
        if(event.keyCode === 13) {
            onSearchTicket();
        }
    }
    return (
    <div className="min-h-screen flex relative lg:static surface-ground">
        <Toast ref={toast} />
        <div id="app-sidebar-9" className="h-screen surface-section hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border w-18rem lg:w-4rem select-none">
            <div className="flex flex-column h-full">
                <div className="flex align-items-center justify-content-center flex-shrink-0 bg-black-alpha-90 border-bottom-1 " style={{ height: '50px' }}>
                    <img src="images/logo.svg" alt="logo" height="30" />
                </div>
                <div className="mt-1">
                    <ul className="list-none p-0 m-0">
                        <li>
                            <a className="p-ripple" onClick={() => setActiveTab(0)}
                                className={classNames('p-ripple flex align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-indigo-400 border-round text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', { 'bg-indigo-700': activeTab === 0 })}>
                                <Tooltip target=".main-panel-icon" />
                                <i className="main-panel-icon pi pi-home mr-2 lg:mr-0 text-base lg:text-2xl" data-pr-tooltip="Домашняя страница" data-pr-position="right" data-pr-at="right+5 top" data-pr-my="left center-2"></i>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple" onClick={() => setActiveTab(1)}
                               className={classNames('p-ripple flex align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-indigo-400 border-round text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', { 'bg-indigo-700': activeTab === 1 })}>
                                <Tooltip target=".filter-panel-icon" />
                                <i className="filter-panel-icon pi pi-search mr-2 lg:mr-0 text-base lg:text-2xl" data-pr-tooltip="Поиск заявок" data-pr-position="right" data-pr-at="right+5 top" data-pr-my="left center-2"></i>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple" onClick={() => setActiveTab(2)}
                               className={classNames('p-ripple flex align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-indigo-400 border-round text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', { 'bg-indigo-700': activeTab === 2 })}>
                                <i className="pi pi-users mr-2 lg:mr-0 text-base lg:text-2xl"></i>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple" onClick={() => setActiveTab(3)}
                               className={classNames('p-ripple flex align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-indigo-400 border-round text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', { 'bg-indigo-700': activeTab === 3 })}>
                                <i className="pi pi-calendar mr-2 lg:mr-0 text-base lg:text-2xl"></i>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple" onClick={() => setActiveTab(4)}
                               className={classNames('p-ripple flex align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-indigo-400 border-round text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', { 'bg-indigo-700': activeTab === 4 })}>
                                <i className="pi pi-cog mr-2 lg:mr-0 text-base lg:text-2xl"></i>
                                <span className="font-medium inline text-base lg:text-xs lg:hidden">Опции</span>
                                <Ripple />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="mt-auto">
                    <hr className="mx-3 border-top-1 border-none surface-border" />
                    <a onClick={OnCloseSission} className="p-ripple my-0 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                        <i className="pi pi-sign-out mr-2 lg:mr-0 text-base lg:text-2xl text-pink-500"></i>
                        <span className="font-medium inline lg:hidden">Выход</span>
                        <Ripple />
                    </a>
                </div>
            </div>
        </div>

        <div className="min-h-screen flex flex-column relative flex-auto">
            <div className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border" style={{ height: '50px' }}>
                <div className="flex">
                    <div className="p-inputgroup">
                        <InputText value={ticketId} onChange={(e) => startSearchTicket(e)} keyfilter="int"
                                   onKeyDown={handleKeyDown}
                                   className="border-none w-8rem sm:w-20rem" placeholder="Найти заявку по номеру"
                                   tooltipOptions={{position: 'bottom'}} tooltip="Введите номер заявки и нажмите Enter. " />
                        <Button icon="pi pi-times" onClick={()=>setTicketId("")}/>
                        <Button icon="pi pi-search" onClick={onSearchTicket}/>
                    </div>
                </div>
                <ul id="topbarmenu" className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row lg:ml-auto
                    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
                    <li>
                        <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
                            transition-duration-150 transition-colors">
                            <Tooltip target=".ibox-icon" />
                            <i className="ibox-icon pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0" data-pr-tooltip="Входящие" data-pr-position="right" data-pr-at="right+5 top" data-pr-my="left center-2"></i>
                            <Ripple />
                        </a>
                    </li>
                    <li>
                        <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
                            transition-duration-150 transition-colors">
                            <Tooltip target=".bell-icon" />
                            <i className="bell-icon pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge" data-pr-tooltip="Уведомления" data-pr-position="left" data-pr-at="left+5 top" data-pr-my="left center-2" severity="danger">
                                <Badge value="0" severity="danger" /></i>
                            <Ripple />
                        </a>
                    </li>
                    <li className="border-top-1 surface-border lg:border-top-none">
                        <a onClick={() => setShowUserProfile(true)} className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
                            transition-duration-150 transition-colors">
                            <Tooltip target=".user-icon" />
                            <i className="user-icon pi pi-user text-base lg:text-2xl mr-2 lg:mr-0 " data-pr-tooltip="Профиль" data-pr-position="left" data-pr-at="left+5 top" data-pr-my="left center-2"></i>
                            <Ripple />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="p-1 flex flex-auto">
                <div className={classNames('p-1 font-medium text-xl text-900 w-full', { 'hidden': activeTab !== 0 })}><HomePanel/></div>
                <div className={classNames('p-1 font-medium text-xl text-900 w-full', { 'hidden': activeTab !== 1 })}><FilterPanel/></div>
                <div className={classNames('p-1 font-medium text-xl text-900 w-full', { 'hidden': activeTab !== 2 })}><ClearPanel/></div>
                <div className={classNames('p-1 font-medium text-xl text-900 w-full', { 'hidden': activeTab !== 3 })}><ClearPanel/></div>
                <div className={classNames('p-1 font-medium text-xl text-900 w-full', { 'hidden': activeTab !== 4 })}><SettingsPanel/></div>
            </div>
        </div>
        {showTicketDialog &&
            <TicketCard isShow={showTicketDialog} ticket={editTicket} setTicket={setEditTicket} setIsShow={setShowTicketDialog} token={token}/>}
        {showUserProfile &&
            <UserProfile isShow={showUserProfile} setIsShow={setShowUserProfile} setTheme={props.setTheme}/>}
    </div>
    );
};