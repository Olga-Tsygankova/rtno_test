import {useEffect, useState} from 'react';

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {DialogItem} from "../../../types/types";

interface DialogsChartProps {
    dialogs: DialogItem[];
    selectedCompany: string;
}

export const DialogsChart = ({dialogs, selectedCompany}: DialogsChartProps) => {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const filteredDialogs = selectedCompany
            ? dialogs.filter((dialog) => dialog.company === selectedCompany)
            : dialogs;

        const data = new Array(31).fill(0).map((_, index) => ({
            date: index + 1,
            count: 0
        }));

        filteredDialogs.forEach((dialog) => {
            const date = new Date(dialog.start_time).getDate();
            const existingEntry = data.find((entry) => entry.date === date);
            if (existingEntry) {
                existingEntry.count++;
            }
        });

        setChartData(data);
    }, [dialogs, selectedCompany]);

    return (
        <div className="dialogs-chart">
            <h3>График</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis
                        dataKey="date"
                        tickFormatter={(value) => `${value}`}
                    />
                    <YAxis
                        domain={[0, 3]}
                        ticks={[0, 1, 2]}
                    />
                    <CartesianGrid stroke="#f5f5f5"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};