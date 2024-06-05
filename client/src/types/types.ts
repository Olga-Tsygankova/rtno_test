export type DialogItem = {
    id: number;
    start_time: string;
    last_message_time: string;
    company: string;
    employee: string;
    comments: string;
    bot_comments:string;
    client_comments:string;
    employee_comments:string;
}

export type TableProps = {
    sortConfig: {
        direction: 'asc' | 'desc';
        key: 'start_time' | 'last_message_time' | 'company' | 'employee';
    };
    filteredDialogs: DialogItem[];
    handleDialogClick: (dialog: DialogItem) => void;
    handleSortChange: (field: 'start_time' | 'last_message_time' | 'company' | 'employee', direction: 'asc' | 'desc') => void;
}

export type FilterProps = {
    sortConfig: {
        direction: 'asc' | 'desc';
        key: 'start_time' | 'last_message_time' | 'company' | 'employee';
    };
    filters: {
        company: string;
        employee: string;
    };
    companies: string[];
    employees: string[];
    handleSortChange: (field: 'start_time' | 'last_message_time' | 'company' | 'employee', direction: 'asc' | 'desc') => void;
    handleFilterChange: (field: 'company' | 'employee', value: string) => void;
}