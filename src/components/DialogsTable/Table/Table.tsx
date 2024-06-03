import {formatDate} from "../../../utils/formateDate";
import {TableProps} from "../../../types/types";


export const Table = ({filteredDialogs, handleDialogClick, handleSortChange, sortConfig}: TableProps) => {
    return (
        <table>
            <thead>
            <tr>
                <th onClick={() => handleSortChange('start_time', sortConfig.direction)}>Начало диалога</th>
                <th onClick={() => handleSortChange('last_message_time', sortConfig.direction)}>Конец диалога</th>
                <th onClick={() => handleSortChange('company', sortConfig.direction)}>Организация</th>
                <th onClick={() => handleSortChange('employee', sortConfig.direction)}>Сотрудник</th>
                <th>Комментарии</th>
            </tr>
            </thead>
            <tbody>
            {filteredDialogs.map(dialog => (
                <tr key={dialog.id} onClick={() => handleDialogClick(dialog)}>
                    <td>{formatDate(dialog.start_time)}</td>
                    <td>{formatDate(dialog.last_message_time)}</td>
                    <td>{dialog.company}</td>
                    <td>{dialog.employee}</td>
                    <td>Нажми на меня</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

