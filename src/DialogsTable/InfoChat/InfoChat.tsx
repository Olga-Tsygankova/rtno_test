import React from "react";
import {formatDate} from "../../utils/formateDate";
import DialogsTable from "../DialogsTable";

export const InfoChat=()=>{
    return (
        <div>
            <h3>Dialog Details</h3>
            <p>Начало диалога: {formatDate(dialog.start_time)}</p>
            <p>Конец диалога: {formatDate(dialog.last_message_time)}</p>
            <p>Компания: {dialog.company}</p>
            <p>Сотрудник: {dialog.employee}</p>
            <p>Комментарий: {dialog.local_comments}</p>
        </div>
    )
}