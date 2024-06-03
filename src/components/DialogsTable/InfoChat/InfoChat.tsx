import {formatDate} from "../../../utils/formateDate";
import {DialogItem} from "../../../types/types";
import {useEffect, useRef, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";

type IProps = {
    selectedDialog: DialogItem;
    onClose: () => void; // Функция для закрытия диалога
};

export const InfoChat = ({ selectedDialog, onClose }: IProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const infoChatRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        onClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (infoChatRef.current && !infoChatRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={infoChatRef} className="info-chat">
            <div className="info-chat-header">
                <h3>Dialog Details</h3>
                <AiOutlineClose
                    className="close-icon"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={handleClose}
                    style={{ color: isHovering ? 'red' : 'black' }}
                />
            </div>
            <div className="info-chat-content">
                <p>Начало диалога: {formatDate(selectedDialog.start_time)}</p>
                <p>Конец диалога: {formatDate(selectedDialog.last_message_time)}</p>
                <p>Компания: {selectedDialog.company}</p>
                <p>Сотрудник: {selectedDialog.employee}</p>
                <p>Комментарий: {selectedDialog.comments}</p>
            </div>
        </div>
    );
};