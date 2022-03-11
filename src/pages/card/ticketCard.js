import React, { useState, useRef } from 'react';
import {Dialog} from "primereact/dialog";
import {TabPanel, TabView} from "primereact/tabview";
import {classNames} from "primereact/utils";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import { Toast } from 'primereact/toast';
import Attached from "./filesPanel";

export default function TicketCard(props){
    const toast = useRef(null);
    let ticket = props.ticket;
    const [submitted, setSubmitted] = useState(false);  //используется при проверке обязательных полей
    const ticketDialogFooter = (
        <React.Fragment>
            <Button label="Отмена" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Сохранить" icon="pi pi-check" onClick={saveTicket} />
        </React.Fragment>
    );

    function hideDialog () {
        setSubmitted(false);
        props.setIsShow(false);
    }
    /*
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < tickets.length; i++) {
            if (tickets[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
     */

    function saveTicket () {
        setSubmitted(true);
        //тут должен быть код валидации
        props.setTicket(ticket);
        //тут должен быть код вызова запроса для записи изменений в базу
        hideDialog();
        /*
        if (ticket.name.trim()) {
            let _products = [...tickets];
            let _product = {...ticket};
            if (ticket.id) {
                const index = findIndexById(ticket.id);
                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: '', detail: 'Изменения сохранены', life: 3000 });
            }
            setTickets(_products);
        }
         */
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        //let _product = {...ticket};
        //_product[`${name}`] = val;
        //setChangeTicket(_product);
        ticket[`${name}`] = val;
    }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        //let _product = {...ticket};
        //_product[`${name}`] = val;
        //setChangeTicket(_product);
        ticket[`${name}`] = val;
    }

    return (
    <div>
    <Dialog visible={props.isShow} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}
             header="Заявка на кроссировку" modal className="p-fluid" footer={ticketDialogFooter} onHide={hideDialog}>
        <Toast ref={toast} />
        <TabView orientation="left">
            <TabPanel header="Основное" leftIcon="pi pi-calendar">
                <div className="field">
                    <label htmlFor="name" className="mb-1">Номер заявки</label>
                    <InputNumber id="name" value={ticket.ticketId} required autoFocus integeronly useGrouping={false} disabled
                                className={classNames({ 'p-invalid': submitted && ticket.ticketId == null })}
                                onValueChange={(e) => onInputNumberChange(e, 'ticketId')} />
                    {submitted && ticket.ticketId !=null && <small className="p-error">Должен быть указан номер заявки!.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="mb-1">Описание</label>
                    <InputTextarea id="description" value={ticket.ticketInfo} required rows={3} cols={20}
                                   onChange={(e) => onInputChange(e, 'ticketInfo')} />
                </div>
                <div className="field">
                    <label htmlFor="request" className="mb-1">Запрос</label>
                    <InputNumber id="request" value={ticket.requestId} integeronly useGrouping={false} disabled
                                 onValueChange={(e) => onInputNumberChange(e, 'requestId')} />
                </div>
                <div className="field">
                    <label htmlFor="task" className="mb-1">Задача</label>
                    <InputNumber id="task" value={ticket.taskId} integeronly useGrouping={false} disabled
                                 onValueChange={(e) => onInputNumberChange(e, 'taskId')}  />
                </div>
            </TabPanel>
            <TabPanel header="Группы">
                <div className="formgrid grid">
                    Страница находится в разработке...
                </div>
            </TabPanel>
            <TabPanel header="Состав заказа">
                <div className="formgrid grid">
                    Страница находится в разработке...
                </div>
            </TabPanel>
            <TabPanel header="Параметры">
                <div className="formgrid grid">
                    Страница находится в разработке...
                </div>
            </TabPanel>
            <TabPanel header="Файлы">
                <div className="formgrid grid">
                    <Attached files={props.files} toast={toast} setFiles={props.setFiles} ticket={ticket} />
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
    </div>
    );
}