import {useEffect, useState} from 'react';
import {InfoChat} from "./InfoChat/InfoChat";
import {Filter} from "./Filter/Filter";
import {Table} from "./Table/Table";
import {DialogItem} from "../../types/types";
import "./DialogsTable.css"
import {DialogsChart} from "./DialogsChart/DialogsChart";


export const DialogsTable = () => {

    const [dialogs, setDialogs] = useState<DialogItem[]>([]);
    const [filteredDialogs, setFilteredDialogs] = useState<DialogItem[]>([]);
    const [selectedDialog, setSelectedDialog] = useState<DialogItem | null>(null);
    const [filters, setFilters] = useState<{ date: string, company: string, employee: string }>({
        date: '',
        company: '',
        employee: ''
    });
    const [sortConfig, setSortConfig] = useState<{
        key: 'start_time' | 'last_message_time' | 'company' | 'employee';
        direction: 'asc' | 'desc'
    }>({key: 'start_time', direction: 'asc'});

    const [companies, setCompanies] = useState<string[]>([]);
    const [employees, setEmployees] = useState<string[]>([]);

    useEffect(() => {
        fetch('http://localhost:3003/dialogs_with_comments', {
        })

            .then(response => response.json())
            .then(data => {
                console.log('Полученные данные:', data)
                setDialogs(data);
                setFilteredDialogs(data);
                setCompanies(Array.from(new Set(data.map((dialog:DialogItem) => dialog.company))));
                setEmployees(Array.from(new Set(data.map((dialog:DialogItem) => dialog.employee))));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const filterAndSortDialogs = () => {
        let filtered = dialogs.filter(dialog =>
            dialog.start_time.includes(filters.date) &&
            dialog.company.includes(filters.company) &&
            dialog.employee.includes(filters.employee)
        );

        if (sortConfig.key === 'start_time' || sortConfig.key === 'last_message_time' || sortConfig.key === 'company' || sortConfig.key === 'employee') {
            filtered = sortDialogsByDate(sortConfig.direction, filtered, sortConfig.key);
        }
        setFilteredDialogs(filtered);
    };

    const sortDialogsByDate = (order: 'asc' | 'desc', dialogsToSort: DialogItem[], sortBy: 'start_time' | 'last_message_time' | 'company' | 'employee') => {
        return [...dialogsToSort].sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (sortBy === 'start_time' || sortBy === 'last_message_time') {
                return order === 'asc' ? new Date(aValue).getTime() - new Date(bValue).getTime() : new Date(bValue).getTime() - new Date(aValue).getTime();
            } else {
                return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        });
    };


    useEffect(() => {
        filterAndSortDialogs();
    }, [filters.date, filters.company, filters.employee, sortConfig]);

    const handleFilterChange = (field: 'date' | 'company' | 'employee', value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [field]: value
        }));
        if (field === 'company') {

            if (value === "") {
                setEmployees(Array.from(new Set(dialogs.map(dialog => dialog.employee))));
            } else {
                setEmployees(Array.from(new Set(dialogs.filter(dialog => dialog.company === value).map(dialog => dialog.employee))));
            }
        }

        if (field === 'employee') {

            if (value === "") {
                setCompanies(Array.from(new Set(dialogs.map(dialog => dialog.company))));
            } else {
                setCompanies(Array.from(new Set(dialogs.filter(dialog => dialog.employee === value).map(dialog => dialog.company))));
            }
        }
    };

    const handleSortChange = (field: 'start_time' | 'last_message_time' | 'company' | 'employee', direction: 'asc' | 'desc') => {
        setSortConfig({key: field, direction});
    };

    const handleDialogClick = (dialog: DialogItem) => {
        setSelectedDialog(dialog);
    };

    const handleClose = () => {
        setSelectedDialog(null);
    };

    return (
        <div className="dialogs-table">
            <h1>Таблица диалогов</h1>
            <Filter
                sortConfig={sortConfig}
                filters={filters}
                companies={companies}
                employees={employees}
                handleSortChange={handleSortChange}
                handleFilterChange={handleFilterChange}
            />

            <Table
                sortConfig={sortConfig}
                filteredDialogs={filteredDialogs}
                handleDialogClick={handleDialogClick}
                handleSortChange={handleSortChange}

            />

            {selectedDialog && (
                <InfoChat selectedDialog={selectedDialog} onClose={handleClose}/>
            )}
            <DialogsChart dialogs={filteredDialogs} selectedCompany={filters.company}/>

        </div>
    );
};

