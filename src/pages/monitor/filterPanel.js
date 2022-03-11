import React, { useState, useEffect, useRef } from 'react';
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {MultiSelect} from "primereact/multiselect";
import { Messages } from 'primereact/messages';
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import { InputNumber } from 'primereact/inputnumber';
import { Accordion, AccordionTab } from 'primereact/accordion';
import TicketsPanel from "./ticketsPanel";
import Cookies from 'universal-cookie';
import {ticketStatuses, STATUS_SENT_EXP} from '../../api/TicketStatus';
import {getTicketGroups} from '../../api/TicketGroup';

export default function FilterPanel() {
    const cookies = new Cookies();
    const userId = cookies.get('carm-cookie-userid');

    let EmptyFilter ={
        userId: userId,
        name: "",
        ticketId: null, //49565601,
        requestId: null,
        userName: "",
        ticketInfo: "",
        risk: null,
        group: null,
        jeopardyStatus: "",
        dateIssueFrom: null,
        dateIssueTo: null,
        dateJeopardyFrom: null,
        dateJeopardyTo: null,
        statuses: [STATUS_SENT_EXP],
        positionStart: 0,
        positionEnd: 1000
    };

    const [filter, setFilter] = useState(EmptyFilter);
    const [groups, setGroups] = useState(null);
    const msgs = useRef(null);

    useEffect(() => {
        msgs.current.show([{ severity: 'info', summary: '', detail: 'Поиск задач выполняется автоматически при вводе данных в поля фильтра', sticky: true}]);
        setTimeout(() => {
            msgs.current.clear();
        }, 4000);
        getTicketGroups().then(data => setGroups(data));
    }, []);

    const riskJeopardy = [
        {name: 'Yes', code: 'YES'},
        {name: 'No', code: 'NO'}
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const onPanelToggle = (itemIndex) => {
        let _activeIndex = activeIndex ? [...activeIndex] : [];
        if (_activeIndex.length === 0) {
            _activeIndex.push(itemIndex);
        }
        else {
            const index = _activeIndex.indexOf(itemIndex);
            if (index === -1) {
                _activeIndex.push(itemIndex);
            }
            else {
                _activeIndex.splice(index, 1);
            }
        }
        setActiveIndex(_activeIndex);
    }

    return (
        <div className="border-2 surface-border border-round surface-section flex-auto h-full">
            <Accordion id="filterPanel" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <AccordionTab header={<React.Fragment><span>Панель фильтров </span></React.Fragment>}>
                <Messages ref={msgs} />
                <div className="p-fluid grid">
                    <div className="col-12 md:col-9">
                        <div className="p-fluid grid">
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup mt-3">
                                    <span className="p-float-label">
                                        <MultiSelect inputId="filterTicketStatus" value={filter.statuses} options={ticketStatuses} optionLabel="name"
                                                     onChange={(e) => setFilter(prevState => ({...prevState, statuses: e.value}))} />
                                        <label htmlFor="filterTicketStatus">Статус заявки:</label>
                                    </span>
                                    <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, statuses: null}))}/>
                                </div>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-float-label">
                                        <Dropdown inputId="filterRisk" value={filter.risk} options={riskJeopardy} optionLabel="name"
                                                  onChange={(e) => setFilter(prevState => ({...prevState, risk: e.value}))}/>
                                        <label htmlFor="filterRisk">Риск:</label>
                                    </span>
                                    <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, risk: null}))}/>
                                </div>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-float-label">
                                        <Dropdown inputId="filterGroup" value={filter.group} options={groups} optionLabel="name" filter filterBy="name"
                                                  onChange={(e) => setFilter(prevState => ({...prevState, group: e.value}))}/>
                                        <label htmlFor="filterGroup">Группа:</label>
                                    </span>
                                    <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, group: null}))}/>
                                </div>
                    </div>
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup mt-3">
                                    <span className="p-float-label">
                                        <InputNumber  id="filterRequest" value={filter.requestId} mode="decimal" useGrouping={false}
                                                   onChange={(e) => setFilter(prevState => ({...prevState, requestId: e.value}))}/>
                                        <label htmlFor="filterRequest">Номер запроса</label>
                                    </span>
                                    <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, requestId: null}))}/>
                                </div>
                                <div className="p-inputgroup mt-3">
                                     <span className="p-float-label">
                                        <InputNumber  id="filterTicket" value={filter.ticketId} mode="decimal" useGrouping={false}
                                                   onChange={(e) => setFilter(prevState => ({...prevState, ticketId: e.value}))}/>
                                        <label htmlFor="filterTicket">Номер заявки</label>
                                     </span>
                                    <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, ticketId: null}))}/>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                        <div className="p-inputgroup mt-3">
                            <span className="p-float-label">
                                <InputText id="filterOwner" value={filter.userName}
                                           onChange={(e) => setFilter(prevState => ({...prevState, userName: e.target.value}))} />
                                <label htmlFor="filterOwner">Владелец</label>
                            </span>
                            <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, userName: ""}))} />
                        </div>
                        <div className="p-inputgroup mt-3">
                            <span className="p-float-label">
                                <InputText id="filterContent" value={filter.ticketInfo}
                                           onChange={(e) => setFilter(prevState => ({...prevState, ticketInfo: e.target.value}))} />
                                <label htmlFor="filterContent">Описание содержит...</label>
                            </span>
                            <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, ticketInfo: ""}))}/>
                        </div>
                    </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-3">
                        <div className="p-inputgroup mt-3">
                            <span className="p-float-label">
                                <Calendar id="dateOutBegin"value={filter.dateIssueFrom} showIcon monthNavigator yearNavigator yearRange="2010:2030" mask="99.99.9999" locale="ru" dateFormat="dd.mm.yyyy"
                                          onChange={(e) => setFilter(prevState => ({...prevState, dateIssueFrom: e.value}))} />
                                <label htmlFor="dateOutBegin">Дата выдачи от</label>
                            </span>
                            <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, dateIssueFrom: null}))}/>
                        </div>
                        <div className="p-inputgroup mt-3">
                            <span className="p-float-label">
                                <Calendar id="dateOutEnd" value={filter.dateIssueTo} showIcon monthNavigator yearNavigator yearRange="2010:2030" mask="99.99.9999" locale="ru" dateFormat="dd.mm.yyyy"
                                          onChange={(e) => setFilter(prevState => ({...prevState, dateIssueTo: e.value}))} />
                                <label htmlFor="dateOutEnd">Дата выдачи до</label>
                            </span>
                            <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, dateIssueTo: null}))}/>
                        </div>
                        <div className="p-inputgroup mt-3">
                            <span className="p-float-label">
                                <Calendar id="dateJeopardyBegin"value={filter.dateJeopardyFrom} showIcon monthNavigator yearNavigator yearRange="2010:2030" mask="99.99.9999" locale="ru" dateFormat="dd.mm.yyyy"
                                          onChange={(e) => setFilter(prevState => ({...prevState, dateJeopardyFrom: e.value}))} />
                                <label htmlFor="dateOutBegin">Дата риска от</label>
                            </span>
                            <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, dateJeopardyFrom: null}))}/>
                        </div>
                        <div className="p-inputgroup mt-3">
                            <span className="p-float-label">
                                <Calendar id="dateJeopardyEnd" value={filter.dateJeopardyTo} showIcon monthNavigator yearNavigator yearRange="2010:2030" mask="99.99.9999" locale="ru" dateFormat="dd.mm.yyyy"
                                          onChange={(e) => setFilter(prevState => ({...prevState, dateJeopardyTo: e.value}))} />
                                <label htmlFor="dateOutEnd">Дата риска до</label>
                            </span>
                            <Button icon="pi pi-times" onClick={()=>setFilter(prevState => ({...prevState, dateJeopardyTo: null}))}/>
                        </div>
                    </div>
                </div>
                </AccordionTab>
            </Accordion>
            <TicketsPanel filterData={filter}/>
        </div>
    );
};