import {formatDate} from "../../../utils/formateDate";
import {DialogItem} from "../../../types/types";

type IProps = {
    selectedDialog: DialogItem
}
export const InfoChat = ({selectedDialog}: IProps) => {
    return (
        <div>
            <h3>Dialog Details</h3>
            <p>Начало диалога: {formatDate(selectedDialog.start_time)}</p>
            <p>Конец диалога: {formatDate(selectedDialog.last_message_time)}</p>
            <p>Компания: {selectedDialog.company}</p>
            <p>Сотрудник: {selectedDialog.employee}</p>
            <p>Комментарий: {selectedDialog.local_comments}</p>
        </div>
    )
}