import React, {useEffect, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {InfoChat} from "./InfoChat/InfoChat";
import {formatDate} from "../utils/formateDate";


interface DialogsTable {
    id: number;
    start_time: string;
    last_message_time: string;
    company: string;
    employee: string;
    local_comments: string;
}

const DialogsTable = () => {

    //TODO: провести рефакторинг и разбить по компонентам

    const [dialogs, setDialogs] = useState<DialogsTable[]>([]);
    const [filteredDialogs, setFilteredDialogs] = useState<DialogsTable[]>([]);
    const [selectedDialog, setSelectedDialog] = useState<DialogsTable | null>(null);
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
        axios.get('http://localhost:3003/dialogs_with_comments')
            .then((response: AxiosResponse<DialogsTable[]>) => {
                setDialogs(response.data);
                setFilteredDialogs(response.data);
                setCompanies(Array.from(new Set(response.data.map(dialog => dialog.company))));
                setEmployees(Array.from(new Set(response.data.map(dialog => dialog.employee))));
            })
            .catch((error: AxiosError) => {
                console.error('Error fetching data:', 'Error details:', error);
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

    const sortDialogsByDate = (order: 'asc' | 'desc', dialogsToSort: DialogsTable[], sortBy: 'start_time' | 'last_message_time' | 'company' | 'employee') => {
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
    };

    const handleSortChange = (field: 'start_time' | 'last_message_time' | 'company' | 'employee', direction: 'asc' | 'desc') => {
        setSortConfig({key: field, direction});
    };

    const handleDialogClick = (dialog: DialogsTable) => {
        setSelectedDialog(dialog);
    };
    //TODO: фильтры: сделать недоступными имена которые не относятся к компании


    return (
        <div>
            Таблица
            <div>
                <select
                    value={sortConfig.direction}
                    onChange={(e) => handleSortChange(sortConfig.key, e.target.value as 'asc' | 'desc')}
                >
                    <option value="asc">Сортировать по ранним</option>
                    <option value="desc">Сортировать по поздним</option>
                </select>
                <select
                    value={filters.company}
                    onChange={(e) => handleFilterChange('company', e.target.value)}
                >
                    <option value="">Все компании</option>
                    {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                    ))}
                </select>
                <select
                    value={filters.employee}
                    onChange={(e) => handleFilterChange('employee', e.target.value)}
                >
                    <option value="">Все сотрудники</option>
                    {employees.map(employee => (
                        <option key={employee} value={employee}>{employee}</option>
                    ))}
                </select>

            </div>

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

            {selectedDialog && (
                //TODO: передать пропсы
                <InfoChat/>
            )}
        </div>
    );
};

export default DialogsTable;