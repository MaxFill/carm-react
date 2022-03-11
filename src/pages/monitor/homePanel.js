import React, { useState, useEffect, useRef } from 'react';
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import {Toast} from "primereact/toast";

export default function HomePanel() {
    const toast = useRef(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const menu3 = useRef(null);
    const menu4 = useRef(null);
    const items = [
        { label: 'Создать новое', icon: 'pi pi-fw pi-plus' },
        { label: 'Очистить', icon: 'pi pi-fw pi-minus' }
    ];
    useEffect(() => {
        toast.current.show({severity:'info', summary: 'Info Message', detail:'Данная страница находится в разработке и содержит исключительно демо-данные', life: 5000});
    },[]);
return (
<div className="border-2 surface-border border-round surface-section flex-auto h-full">
    <Toast ref={toast} />
    <div className="grid">
        <div className="col-12 lg:col-6 xl:col-3">
            <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">Заявок</span>
                        <div className="text-900 font-medium text-xl">52</div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-id-card text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span className="text-green-500 font-medium">12 новых </span>
                <span className="text-500">за сегодня</span>
            </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
            <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">В работе</span>
                        <div className="text-900 font-medium text-xl">34</div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-cog text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span className="text-green-500 font-medium">30% закрыто </span>
                <span className="text-500">за неделю</span>
            </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
            <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">Требуют внимания</span>
                        <div className="text-900 font-medium text-xl">28</div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-info-circle text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span className="text-green-500 font-medium">7 заявок  </span>
                <span className="text-500">с истекающим сроком</span>
            </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
            <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">Уведомления</span>
                        <div className="text-900 font-medium text-xl">15 непрочитано</div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-comment text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span className="text-green-500 font-medium">8 </span>
                <span className="text-500">персональных</span>
            </div>
        </div>

        <div className="col-12 lg:col-6">
            <div className="surface-card shadow-2 border-round p-4 h-full">
                <div className="flex align-items-center justify-content-between mb-3">
                    <div className="text-900 font-medium text-xl">Активности</div>
                    <div>
                        <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded" onClick={(event) => menu1.current.toggle(event)} />
                        <Menu ref={menu1} popup model={items} />
                    </div>
                </div>
                <ul className="list-none p-0 m-0">
                    <li className="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-power-off text-xl text-orange-500"></i>
                            </div>
                            <div>
                                <span className="text-900 font-medium block mb-2">Отключение оборудования</span>
                                <div className="text-700 mb-2">выезд на объект.</div>
                                <a className="text-blue-500 cursor-pointer">
                                    <i className="pi pi-github text-sm mr-2"></i>
                                    <span>Отчёт добавлен #1185</span>
                                </a>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">14 часов назад</span>
                    </li>
                    <li className="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-server text-xl text-orange-500"></i>
                            </div>
                            <div>
                                <span className="text-900 font-medium block mb-2">Кроссировка</span>
                                <div className="text-700">выполнен проброс линии <span className="text-900">5</span> на <span className="text-900">линию 6</span>.</div>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">20 часов назад</span>
                    </li>
                    <li className="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-lock text-xl text-orange-500"></i>
                            </div>
                            <div>
                                <span className="text-900 font-medium block mb-2">Блокировка</span>
                                <div className="text-700 mb-2">работы выполнены.</div>
                                <a className="text-blue-500 cursor-pointer">
                                    <i className="pi pi-file-pdf text-sm mr-2"></i>
                                    <span>Отчёт готов: report_q4.pdf</span>
                                </a>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">1 день назад</span>
                    </li>
                    <li className="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-globe text-xl text-orange-500"></i>
                            </div>
                            <div>
                                <span className="text-900 font-medium block mb-2">Подключение к сети Интернет</span>
                                <div className="text-700">создан аккаунт <span className="text-900">Пётр Семикин.</span> Статус <span className="text-blue-500">Готово</span>.</div>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">1 день назад</span>
                    </li>
                    <li className="py-3 flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-phone text-xl text-orange-500"></i>
                            </div>
                            <div>
                                <span className="text-900 font-medium block mb-2">Звонок клиенту</span>
                                <div className="text-700">выезд на замену оборудования <span className="text-blue-500">дом 7</span>.</div>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">4 дня назад</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col-12 lg:col-6">
            <div className="surface-card shadow-2 border-round p-4 h-full">
                <div className="flex align-items-center justify-content-between mb-4">
                    <div className="text-900 font-medium text-xl">Уведомления</div>
                    <div>
                        <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded" onClick={(event) => menu2.current.toggle(event)} />
                        <Menu ref={menu2} popup model={items} />
                    </div>
                </div>

                <span className="block text-600 font-medium mb-3">СЕГОДНЯ</span>
                <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i className="pi pi-comment text-xl text-blue-500"></i>
                        </div>
                        <span className="text-900 line-height-3">Новая заявка на кроссировку
                            <span className="text-700">требуется выполнить кроссировку по адресу <span className="text-blue-500">Толмачёва, 79</span></span>
                        </span>
                    </li>
                    <li className="flex align-items-center py-2">
                        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                            <i className="pi pi-comment text-xl text-orange-500"></i>
                        </div>
                        <span className="text-700 line-height-3">Ваш запрос на получение информации по <span className="text-blue-500 font-medium">заявке 33425</span> был зарегистрирован.</span>
                    </li>
                </ul>

                <span className="block text-600 font-medium mb-3">ВЧЕРА</span>
                <ul className="p-0 m-0 list-none">
                    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i className="pi pi-comment text-xl text-blue-500"></i>
                        </div>
                        <span className="text-900 line-height-3">Заявка 422410
                                <span className="text-700"> требует Вашего внимания! <span className="text-blue-500">Срок истекает 20.01.22</span></span>
                        </span>
                    </li>
                    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                            <i className="pi pi-question text-xl text-pink-500"></i>
                        </div>
                        <span className="text-900 line-height-3">Статус заявки 333998
                                <span className="text-700"> изменён на "Возврат на доработку". Требуется Ваше внимание по данному запросу.</span>
                        </span>
                    </li>
                    <li className="flex align-items-center py-2">
                        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0">
                            <i className="pi pi-comment text-xl text-green-500"></i>
                        </div>
                        <span className="text-900 line-height-3">Заявка 22114 исполнена.
                                <span className="text-700"> Вы должны прикрепить отчёт к заявке.</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col-12 lg:col-6">
            <div className="surface-card shadow-2 border-round p-4">
                <div className="flex align-items-center justify-content-between mb-3">
                    <div className="text-900 font-medium text-xl">Поступление заявок</div>
                    <div>
                        <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded" onClick={(event) => menu3.current.toggle(event)} />
                        <Menu ref={menu3} popup model={items} />
                    </div>
                </div>
                <img src="images/chart-line.svg" alt="chart-line" className="w-full" />
            </div>
        </div>
        <div className="col-12 lg:col-6">
            <div className="surface-card shadow-2 border-round p-4">
                <div className="flex align-items-center justify-content-between mb-3">
                    <div className="text-900 font-medium text-xl">В сравнении с прошлым годом</div>
                    <div>
                        <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded" onClick={(event) => menu4.current.toggle(event)} />
                        <Menu ref={menu4} popup model={items} />
                    </div>
                </div>
                <img src="images/chart-bar.svg" alt="chart-bar" className="w-full" />
            </div>
        </div>
        <div className="col-12 lg:col-6">
            <div className="surface-card shadow-2 border-round p-4">
                <div className="flex align-items-center justify-content-between mb-4">
                    <span className="text-xl font-medium text-900">Заявки по категориям</span>
                </div>
                <div className="surface-border border-1 border-round p-3 mb-4">
                    <span className="text-900 font-medium text-3xl">85% <span className="text-600">(2125/2500)</span></span>
                    <ul className="mt-3 list-none p-0 mx-0 flex">
                        <li style={{ height: '1rem' }} className="flex-1 bg-indigo-500 border-round-left"></li>
                        <li style={{ height: '1rem' }} className="flex-1 bg-blue-500"></li>
                        <li style={{ height: '1rem' }} className="flex-1 bg-orange-500"></li>
                        <li style={{ height: '1rem' }} className="flex-1 bg-purple-500"></li>
                        <li style={{ height: '1rem' }} className="flex-1 bg-yellow-500"></li>
                        <li style={{ height: '1rem' }} className="flex-1 bg-cyan-500"></li>
                        <li style={{ height: '1rem' }} className="flex-1 surface-500 border-round-right"></li>
                    </ul>
                </div>
                <ul className="mt-4 list-none p-0 mx-0">
                    <li className="flex align-items-center pb-3">
                        <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-indigo-500 mr-3 flex-shrink-0"></span>
                        <span className="text-xl font-medium text-90">Watch</span>
                        <span className="text-600 text-xl font-medium ml-auto">152</span>
                    </li>
                    <li className="flex align-items-center py-3">
                        <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-blue-500 mr-3 flex-shrink-0"></span>
                        <span className="text-xl font-medium text-90">Blue Band</span>
                        <span className="text-600 text-xl font-medium ml-auto">63</span>
                    </li>
                    <li className="flex align-items-center py-3">
                        <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-orange-500 mr-3 flex-shrink-0"></span>
                        <span className="text-xl font-medium text-90">Controller</span>
                        <span className="text-600 text-xl font-medium ml-auto">23</span>
                    </li>
                    <li className="flex align-items-center py-3">
                        <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-purple-500 mr-3 flex-shrink-0"></span>
                        <span className="text-xl font-medium text-90">Lime Band</span>
                        <span className="text-600 text-xl font-medium ml-auto">42</span>
                    </li>
                    <li className="flex align-items-center py-3">
                        <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-yellow-500 mr-3 flex-shrink-0"></span>
                        <span className="text-xl font-medium text-90">Phone Case</span>
                        <span className="text-600 text-xl font-medium ml-auto">134</span>
                    </li>
                    <li className="flex align-items-center py-3">
                        <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-cyan-500 mr-3 flex-shrink-0"></span>
                        <span className="text-xl font-medium text-90">T-Shirt</span>
                        <span className="text-600 text-xl font-medium ml-auto">89</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col-12 lg:col-6">
            <div className="shadow-2 surface-card border-round p-3">
                <div className="flex align-items-center justify-content-between">
                    <span className="text-xl font-medium text-900">Заявки по статусам</span>
                </div>
                <div className="mt-3">
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <i className="pi pi-twitter text-5xl text-blue-500"></i>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">12</div>
                                <span className="font-medium text-600">Исполнено</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <i className="pi pi-vimeo text-5xl text-blue-500"></i>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">10</div>
                                <span className="font-medium text-600">Возврат</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <i className="pi pi-facebook text-5xl text-blue-500"></i>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">5</div>
                                <span className="font-medium text-600">Отклонено</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <i className="pi pi-discord text-5xl text-indigo-500"></i>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">23</div>
                                <span className="font-medium text-600">В работе</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <i className="pi pi-github text-5xl text-purple-500"></i>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">16</div>
                                <span className="font-medium text-600">Высокой важности</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <i className="pi pi-google text-5xl text-pink-500"></i>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">6</div>
                                <span className="font-medium text-600">Просроченные</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
);
}