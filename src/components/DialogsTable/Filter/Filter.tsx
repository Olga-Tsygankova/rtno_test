import {FilterProps} from "../../../types/types";
import './Filter.css'


export const Filter = ({
                           sortConfig,
                           filters,
                           companies,
                           employees,
                           handleSortChange,
                           handleFilterChange
                       }: FilterProps) => {
    return (
        <div className="filter">
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
    );
};

