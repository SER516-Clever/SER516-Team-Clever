import { useState } from "react";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import CustomPieChart from "../graph/piechart";

const DateSelectorTechDebt = () => {
    const dummyData = [
        { name: "Technical Debt with Zero BV", value: 40 },
        { name: "Technical Debt with Non Zero BV", value: 60 }
    ];

    return (
        <div>
            <CustomPieChart apidata={dummyData} title={"Technical Debt Pie Chart"} type="techDebt" />
        </div>
    );
};

export default DateSelectorTechDebt;
