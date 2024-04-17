import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomPieChart = ({ title, apidata, type }) => {
    const [countChartData, setCountChartData] = useState([]);
    const [storyPointData, setstoryPointData] = useState([]);
    const [technicalDebtData, setTechnicalDebtData] = useState([]);
    const pieColors = ['#A7C7E7', '#F3A683', '#B8B5FF'];

    useEffect(() => {
        if (type === "cruft") {
            setCountChartData([
                { "name": "Stories with Zero BV", "value": apidata.zero_bv_us.total_zero_bv_user_stories },
                { "name": "Stories with Non Zero BV", "value": apidata.zero_bv_us.total_user_stories - apidata.zero_bv_us.total_zero_bv_user_stories },
                { "name": "Issues", "value": apidata.issues.issues.length }
            ]);
            setstoryPointData([
                { "name": "Story Points without Business Value", "value": apidata.zero_bv_us.total_zero_bv_story_points },
                { "name": "Story Points With Business Value", "value": apidata.zero_bv_us.total_story_points }
            ]);
        } else if (type === "techDebt") {
            setTechnicalDebtData(apidata);
        }
    }, [apidata, type]);

return (
    <div>
        <h4 style={{ textAlign: 'center' }}>{title}</h4>
        {type === "cruft" && (
            <>
            <ResponsiveContainer height={400}>
                <PieChart>
                    <Pie
                        data={countChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        dataKey="value"
                        nameKey="name"
                        label={({ name }) => name}
                    >
                        {countChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>Zero Business Value Comparison</div>
            <ResponsiveContainer height={400}>
                <PieChart>
                    <Pie
                        data={storyPointData}
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        dataKey="value"
                        nameKey="name"
                        label={({ name }) => name}
                    >
                        {storyPointData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                        
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center' }}>Zero BV Story Points Comparison</div>
        </>
    )}
    {type === "techDebt" && (
        <>            
            <ResponsiveContainer height={400}>
                <PieChart>
                    <Pie
                        data={technicalDebtData}
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        dataKey="value"
                        nameKey="name"
                        label={({ name }) => name}
                    >
                        {technicalDebtData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}  
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center' }}>Technical Debt Comparison</div>
            </>
            )}
        </div>
    );
}        

export default CustomPieChart;