import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const DeliveryOnTimeDetail = ({ apiData }) => {
    const [sprintData, setSprintData] = useState([]);

    useEffect(() => {
        if (apiData && apiData.BV && apiData.story_points) {
            const newData = apiData.BV.map((bvItem, index) => {
                const spItem = apiData.story_points[index];
                return {
                    name: bvItem.milestoneName,
                    bvCompleted: bvItem.bvCompleted,
                    bvTotal: bvItem.bvTotal,
                    spCompleted: spItem.spCompleted,
                    totalPoints: spItem.totalPoints,
                    remBV: bvItem.bvTotal - bvItem.bvCompleted,
                    remSP: spItem.totalPoints - spItem.spCompleted
                };
            });
            setSprintData(newData);
        }
    }, [apiData]);

    return (
        <div>
            <br />
            {sprintData.length > 0 && (
                <div>
                    <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Delivery On Time Chart</h3>
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart
                            data={sprintData}
                            margin={{ top: 20, right: 40, bottom: 70, left: 30 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="category" dataKey="name" label={{value: 'Sprint',
                                position: 'insideBottom', offset: -50, style: { fontSize: '20px' }
                            }}
                                tick={{ fontSize: 12 }} allowDuplicatedCategory={true} />
                            <YAxis type="number" dataKey="" label={{
                                value: 'Story points/BV', angle: -90, position: 'insideLeft', style: { fontSize: '20px' }
                            }} />
                            <Tooltip />
                            <Legend align="right" verticalAlign="top" layout="horizontal"/>
                            <Bar dataKey="bvCompleted" fill="#8884d8" name="Completed BV" />
                            <Bar dataKey="remBV" fill="#82ca9d" name="Remaining BV" />
                            <Bar dataKey="spCompleted" fill="#4184D8" name="Completed SP" />
                            <Bar dataKey="remSP" fill="#FFC658" name="Remaining SP" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
            <br />
        </div>
    );
};
      

export default DeliveryOnTimeDetail;
