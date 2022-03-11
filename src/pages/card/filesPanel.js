import React, { useState, useRef, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import Cookies from 'universal-cookie';
import {loadTicketAttaches, download, deleteAttach} from "../../api/TicketFiles";
import {Dialog} from "primereact/dialog";

export default function Attached(props){
    let ticket = props.ticket
    const cookies = new Cookies();
    const token = cookies.get('carm-cookie-tocken');
    const userId = cookies.get('carm-cookie-userid');
    const urlUpload = "http://10.26.102.196:8080/FSOMWorkflowClient/upload?ticketId="+ticket.ticketId+'&userId='+userId+'&token='+token;
    const [files, setFiles] = useState(null);
    const [file, setFile] = useState(null);
    const [isNeedReload, setIsNeedReload] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const dt = useRef(null);

    useEffect(() => {
        loadTicketAttaches( ticket.ticketId, token).then(data => {
            setFiles(data);
            setIsNeedReload(false);
        });
    }, [isNeedReload]);

    const onDownLoad = (attache) => {
        setFile(attache);
        download(attache.id, token);
    }

    const onDelete = () => {
        deleteAttach(file.id, token).then(d => {
            if (d != null) {
                console.log("файл удалён!");
                setIsNeedReload(true);
            }
        });
        /*
        if (isNeedReload) {
            props.message.current.show({severity: 'info', summary: 'Успешно!', detail: 'Файл(ы) удалён(ы)'});
        } else {
            props.message.current.show({severity: 'warn', summary: 'Не выполнено!', detail: 'Не удалось удалить файл'});
        }
         */
    }

    const onUpload = (e) => {
        e.files.forEach(file => {
            const fileName = file.name;
            /*
            if (fileName) {
                const fileExt = file.name.split('.').pop();
                let _files = [...files];
                const fileId = _files.length + 1;
                let _file = new Attache(fileId, fileName, fileExt, file.type, file.size, userId, createUID(), ticket.ticketId, new Date());
                addFile(_file, token).then(newFile=>{
                    _file.id = newFile.id;
                    _files.push(_file);
                    props.setFiles(_files);
                });
            }
             */
            props.toast.current.show({severity: 'info', summary: 'Выполнено!', detail: 'Файл [' + fileName +'] сохранен на сервере'});
            setIsNeedReload(true);
        });
    }
    const confirmDelete = (attach) => {
        setFile(attach);
        setShowDeleteDialog(true);
    }
    const hideDeleteDialog = () => {
        setShowDeleteDialog(false);
    }
    const dateCreateConv = (rowData) =>{
        if (rowData.dateCreate == null) return null;
        return new Date(rowData.dateCreate).toLocaleDateString("ru-RU");
    }
    const onRowSelect = (event) => {
        setFile(event.data);
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-download" className="p-button-rounded mr-2"
                        tooltip="Скачать" tooltipOptions={{position: 'right'}}
                        onClick={() => onDownLoad(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded mr-2"
                        tooltip="Удалить" tooltipOptions={{position: 'right'}}
                        onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }
    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="Отмена" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
            <Button label="Удалить!" icon="pi pi-check" className="p-button-text" onClick={onDelete} />
        </React.Fragment>
    );
    const tableHeader = (
        <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
            <div className="mt-3 md:mt-0 flex justify-content-end">
                <FileUpload mode="basic" name="demo[]" url={urlUpload}
                            auto chooseLabel="Загрузить файл"
                            accept="image/*" maxFileSize={1000000}
                            onUpload={onUpload} />
            </div>
        </div>
    );
    return (
    <div className="w-full">
        <DataTable ref={dt} value={files} selection={file} size="small"
                   selectionMode="single" dataKey="ticketId"
                   onRowSelect={onRowSelect}
                   onSelectionChange={(e) => setFile(e.value)}
                   paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                   emptyMessage="Нет записей для отображения"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   currentPageReportTemplate="Отображено с {first} по {last} из {totalRecords} записей"
                   header={tableHeader} responsiveLayout="scroll">
            <Column field="name" header="Наименование" sortable ></Column>
            <Column field="fileSize" header="Размер" sortable ></Column>
            <Column field="type" header="Тип" sortable ></Column>
            <Column field="dateCreate" header="Дата создания" body={dateCreateConv} sortable ></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem' }}></Column>
        </DataTable>
        <Dialog visible={showDeleteDialog} style={{ width: '450px' }} header="Подтвердите действие" modal
                footer={deleteDialogFooter} onHide={hideDeleteDialog}>
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                {file && <span>Удалить файл <b>{file.name}</b>? Данное действие не обратимо!</span>}
            </div>
        </Dialog>
    </div>
    );
}