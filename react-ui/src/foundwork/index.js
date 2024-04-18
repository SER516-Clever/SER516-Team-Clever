import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Legend,
} from 'recharts';

const FoundWork = ({ foundWorkData }) => {
    console.log(foundWorkData)
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
        <div align="center" width={750} height={300} sx={{ mt: 2 }}>
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
                    return `${month}/${day}`;
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
        </div>
    );
}

export default FoundWork;