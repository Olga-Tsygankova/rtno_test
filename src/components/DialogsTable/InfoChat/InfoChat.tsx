import {formatDate} from "../../../utils/formateDate";
import {DialogItem} from "../../../types/types";
import {useEffect, useRef, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import "./InfoChat.css"

type IProps = {
    selectedDialog: DialogItem;
    onClose: () => void; // Функция для закрытия диалога
};

export const InfoChat = ({selectedDialog, onClose}: IProps) => {
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
        <div className="info-chat-wrapper">
            <div ref={infoChatRef} className="info-chat">
                <AiOutlineClose
                    className="close-icon"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={handleClose}
                    style={{color: isHovering ? 'red' : 'black'}}
                />
                <h3>Детали диалога</h3>

                <div className="info-chat-content">
                    <p>Начало диалога: <br/>{formatDate(selectedDialog.start_time)}</p>
                    <p>Конец диалога:<br/> {formatDate(selectedDialog.last_message_time)}</p>
                    <p className="chat">Чат:
                        <br/>
                        {selectedDialog.bot_comments}
                        <br/>
                        {selectedDialog.client_comments}
                        <br/>
                        {selectedDialog.employee_comments}
                    </p>
                </div>
            </div>
        </div>
    );
};