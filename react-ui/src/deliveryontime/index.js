import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import CustomBarChart from "../graph/barchart";

const DateSelector = ({ token, projectId }) => {
    const [data, setData] = useState(null);
    const [isDoT, setIsDoT] = useState(false);
    const [spinnerFlag, setSpinnerFlag] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinnerFlag(true);

        axios({
            method: "post",
            url: `http://localhost:8080/api/DoT/by-slug/${project}`,
            data: {
                project_id: projectId.toString(),
            },
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        .then(res => {
            setData(res.data);
            // let violationMembers = []
            // let totalViolations = 0;
            // for (let name in res.data) {
            //     let count = 0;
            //     for (let date in res.data[name]) {
            //         let list = res.data[name][date].filter(task => task["inProgressDate"] !== null);
            //         let filteredTasks = filterTasks(list);
            //         if (filteredTasks.length >= threshold) {
            //             totalViolations += 1;
            //             count += 1;
            //         }
            //     }
            //     if (count !== 0) {
            //         violationMembers.push(name);
            //     }
            // }
            setIsDoT(true);
            setSpinnerFlag(false);
        })
        .catch(ex => {
            setIsDoT(false);
            setSpinnerFlag(false);
        });
    }

    // const filterTasks = (tasks) => {
    //     let removeTasks = [];
    //     for (let t1 of tasks) {
    //         for (let t2 of tasks) {
    //             if (t1["taskId"] !== t2["taskId"]) {
    //                 let date1 = new Date(t1["inProgressDate"]);
    //                 let date2 = new Date(t2["finished_date"]);
    //                 if (date1.getUTCDate() === date2.getUTCDate() && date1.getUTCSeconds() > date2.getUTCSeconds()) {
    //                     removeTasks.push(t2["taskId"]);
    //                 }
    //             }
    //         }
    //     }
    //     return tasks.filter(task => !removeTasks.includes(task["taskId"]));
    // }
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="primary" type="submit" className="submitButton backgroundButton">Submit</Button>
                </div>
            </Form>
            <br />
            {spinnerFlag ? <Spinner variant="primary" animation="border" style={{ justifyContent: "center", alignItems: "center", display:"flex", marginLeft: "49%" }} /> : null}

            {isDoT ? (
                <div>
                    <CustomBarChart title={"Delivery On Time"} data={data} showMemberViolations={false} showInProgressTasks={false} showDeliveryOnTime={true} />
                </div>
            ) : null}
        </div>
    );
};
      

export default DateSelector;
