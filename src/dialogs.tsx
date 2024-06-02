import React, {useEffect, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';

interface Dialogs {
    id: number;
    start_time: string;
    company: string;
    employee: string;
    comments: string;
}

const Dialogs: React.FC = () => {
    const [dialogs, setDialogs] = useState<Dialogs[]>([]);
    useEffect(() => {
        axios.get('http://localhost:3001/dialogs_with_comments')
            .then((response: AxiosResponse<Dialogs[]>) => {
                console.log(response.data);
                setDialogs(response.data);
            })
            .catch((error: AxiosError) => {
                console.error('Error fetching data:', 'Error details:', error);
            });
    }, []);

    return (
        <div>
        </div>
    );
};

export default Dialogs;