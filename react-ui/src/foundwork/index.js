import React from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const FoundWork = ({ foundWorkData }) => {
    const tasksByDate = foundWorkData?.reduce((acc, task) => {
        const date = new Date(task.createdDate).toDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});
    const chartData = Object.entries(tasksByDate).map(([date, count]) => ({
        date,
        count,
    }));    
    return(
        <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: '90%' }}>
        <h4 style={{ textAlign: 'center' }}>Found Work Chart</h4>
            <ResponsiveContainer width="100%" height={600}>
                <LineChart
                    width={730}
                    height={250}
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    tickFormatter={(dateStr) => {
                        const date = new Date(dateStr);
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const year = String(date.getFullYear()).padStart(4, '0');
                        return `${month}-${day}-${year}`;
                    }}
                ></XAxis>
                <YAxis></YAxis>
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    name="# of tasks added"
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
        </div>
        </div>
    );
}

export default FoundWork;