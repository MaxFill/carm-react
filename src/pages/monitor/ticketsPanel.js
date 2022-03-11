import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getTickets } from '../../api/Tickets';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Cookies from 'universal-cookie';
import {ticketStatuses} from '../../api/TicketStatus';
import {Card} from "primereact/card";
import {InputSwitch} from "primereact/inputswitch";
import TicketCard from '../card/ticketCard';
import {loadTicket} from "../../api/Ticket";

export default function TicketsPanel(props) {
    let emptyTicket ={
        userId: null,
        taskId: null,
        ticketId: null,
        requestId: null,
        userName: "",
        ticketInfo: "",
        status: "",
        dateExpiration: null,
        dateIssue: null,
        dateJeopardy: null,
        dateProcessed: null
    };

    const [tickets, setTickets] = useState(null);
    const [showTicketDialog, setShowTicketDialog] = useState(false);
    const [ticket, setTicket] = useState(emptyTicket);
    const [editTicket, setEditTicket] = useState(emptyTicket);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const cookies = new Cookies();
    const token = cookies.get('carm-cookie-tocken');

    useEffect(() => {
        if (props.filterData != null) {
            getTickets(props.filterData, token).then(data => setTickets(data));
        }
    }, [props.filterData]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const statusBodyTemplate = (rowData) => {
        if (rowData.status == null) return null;
        const ticketStatus = ticketStatuses.find((t)=>rowData.status === t.statusId);
        if (ticketStatus == null) return null;
        return <span className={`${ticketStatus.style}`}>{ticketStatus.name}</span>;
    }
    const dateIssueConv = (rowData) =>{
        if (rowData.dateIssue == null) return null;
        return new Date(rowData.dateIssue).toLocaleDateString("ru-RU");
    }
    const dateJeopardyIssueConv = (rowData) =>{
        if (rowData.dateJeopardy == null) return null;
        return new Date(rowData.dateJeopardy).toLocaleDateString("ru-RU");
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                        tooltip="Открыть карточку заявки" tooltipOptions={{position: 'right'}}
                        onClick={() => onEditTicket(rowData)} />
            </React.Fragment>
        );
    }
    const onRowSelect = (event) => {
        setTicket(event.data);
        checkAndShowPreview();
    }
    const checkAndShowPreview=()=>{
        if (switchShowPreview == true) {
            setShowTicketView(true);
        } else {
            setShowTicketView(false);
        }
    }
    const [showTicketView, setShowTicketView] = useState(false);
    const [switchShowPreview, setSwitchShowPreview] = useState(true);
    const onSwitchShowPreview = (value) =>{
        setSwitchShowPreview(value);
        if (value == false){
            setShowTicketView(false);
        }
    }
    const onEditTicket = (product) => {
        setTicket(product);
        checkAndShowPreview();
        const ticketId = product.ticketId;
        if (ticketId == null) return;
        loadTicket(ticketId, token).then(data => {
            setEditTicket(data);
            setShowTicketDialog(true);
        });
    }
    const header = (
        <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
            <span className="p-input-icon-left w-full md:w-auto">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Поиск в отобранном..." className="w-full lg:w-auto" />
            </span>
            <div className="mt-3 md:mt-0 flex justify-content-end">
                <label className="text-900 font-medium mr-1 mt-1 " >Режим быстрого просмотра</label>
                <InputSwitch checked={switchShowPreview} className="mt-1 mr-2"
                             tooltip="При включённом режиме выделите заявку для отображения панели просмотра" tooltipOptions={{position: 'top'}}
                             onChange={(e) => onSwitchShowPreview(e.value)} />
            </div>
        </div>
    );

    const setHideTicketView =() =>{
        setShowTicketView(false);
        onSwitchShowPreview(false);
    }

    const ticketViewHeader =
        <div className="pt-3 pr-2 flex-auto">
            <label className="text-900 font-medium ml-3 mb-2 mt-2" >Быстрый просмотр</label>
            <Button icon="pi pi-times " className="p-button-rounded p-button-danger p-button-text float-right" onClick={setHideTicketView} />
        </div>

    return (
        <div className="surface-card p-3 border-round shadow-2">
            <Toast ref={toast} />
            <div className="formgrid grid">
            <div className={classNames('col-12', {'md:col-9': showTicketView}, {'md:col-12': !showTicketView})}>
                <DataTable ref={dt} value={tickets} selection={ticket} size="small" responsiveLayout="scroll"
                           selectionMode="single" dataKey="ticketId"
                           onRowSelect={onRowSelect}
                           onSelectionChange={(e) => setTicket(e.value)}
                    paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    emptyMessage="Нет записей для отображения"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Отображено с {first} по {last} из {totalRecords} записей"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column field="ticketId" header="Заявка" sortable ></Column>
                    <Column field="requestId" header="Запрос" sortable ></Column>
                    <Column field="userName" header="Владелец" sortable ></Column>
                    <Column field="dateIssue" header="Дата выдачи" body={dateIssueConv} sortable ></Column>
                    <Column field="dateJeopardy" header="Дата риска" body={dateJeopardyIssueConv} sortable ></Column>
                    <Column field="ticketInfo" header="Описание" sortable ></Column>
                    <Column field="status" header="Статус" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem' }}></Column>
                </DataTable>
            </div>
            {showTicketView && <div className="col-12 md:col-3">
                <Card header={ticketViewHeader}>
                    <div className="p-fluid grid w-full">
                    <label htmlFor="ticket" className="mb-1 mt-1">Номер заявки</label>
                    <InputText id="ticket" value={ticket.ticketId} disabled />

                    <label htmlFor="description" className="mb-1 mt-1">Описание</label>
                    <InputText id="description" value={ticket.ticketInfo} disabled/>

                    <label htmlFor="request" className="mb-1 mt-1">Запрос</label>
                    <InputText id="request" value={ticket.requestId} disabled />

                    <label htmlFor="task" className="mb-1 mt-1">Задача</label>
                    <InputText id="task" value={ticket.taskId} disabled />

                    <label htmlFor="dateIssue" className="mb-1 mt-1">Дата выдачи</label>
                    <InputText id="dateIssue" value={new Date(ticket.dateIssue).toLocaleDateString("ru-RU")} disabled />

                    </div>
                </Card>
            </div>}
            </div>
            {showTicketDialog &&
                <TicketCard isShow={showTicketDialog}
                            ticket={editTicket} setTicket={setTicket}
                            setIsShow={setShowTicketDialog}/>}
        </div>
    );
}