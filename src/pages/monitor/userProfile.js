import React, { useState, useRef } from 'react';
import {Dialog} from "primereact/dialog";
import {Toast} from "primereact/toast";
import {Dropdown} from "primereact/dropdown";
import getCurrentTheme, {Themes} from "../../api/Themes";

export default function UserProfile(props){
    const toast = useRef(null);
    const [theme, setTheme] = useState(getCurrentTheme());
    const onThemeChange = (newtheme) =>{
        setTheme(newtheme);
        props.setTheme(newtheme);
        toast.current.show({severity:'info', summary: 'Тема изменена!', detail:'Установлена новая тема ['+newtheme.name+']', life: 5000});
    }
    function hideDialog () {
        props.setIsShow(false);
    }
    return (
        <div>
            <Dialog visible={props.isShow} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} onHide={hideDialog}
                    header="Профиль пользователя" modal className="p-fluid" >
                <Toast ref={toast} />
                    <div className="p-fluid grid">
                        <div className="col-12 md:col-3">
                            <label htmlFor="theme" className="block text-900 font-medium ml-3 mb-2 mt-2 " >Тема оформления</label>
                        </div>
                        <div className="mt-2 col-12 md:col-9">
                            <Dropdown inputId="filterRisk" value={theme} options={Themes} optionLabel="name"
                                      className="w-full mb-1 mr-2" filter filterBy="name"
                                      onChange={(e) => onThemeChange(e.value)}/>
                        </div>
                </div>
            </Dialog>
        </div>
    );
}