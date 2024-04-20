import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import CustomBarChart from "../graph/barchart";

const DeliveryOnTimeDetail = ({ attributes, token, projectId }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [isDoT, setIsDoT] = useState(false);
    const [spinnerFlag, setSpinnerFlag] = useState(false);

    const handleSubmit = (eventKey) => {
        eventKey.preventDefault();
        setError(false);
        setSpinner(true);

        console.log(formData)

        axios({
            method: "post",
            url: `http://localhost:8080/api/DoT/by-slug/${projectID}`, // error
            data: { project_id: projectId.toString() },
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        .then(res => {
            let calculatedData = res.data.map(milestone => ({
                name: milestone.milestoneName,
                deliveredBV: milestone.bvCompleted,
                totalBV: milestone.bvTotal,
                remBV: milestone.bvTotal - milestone.bvCompleted,
                deliveredSP: milestone.spCompleted,
                remSP: milestone.totalPoints - milestone.spCompleted
            }));
            
            setData(calculatedData);
            setSpinner(false);
        })
        .catch(ex => {
            console.error('Error fetching data:', ex);
            setError(true);
            setSpinner(false);
        });
    }
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="primary" type="submit" className="submitButton backgroundButton">Submit</Button>
                </div>
            </Form>
            <br />
            {spinnerFlag ? <Spinner variant="primary" animation="border" style={{ justifyContent: "center", alignItems: "center", display:"flex", marginLeft: "49%" }} /> : null}

            {error ? (
                    <p className="errorMessage">Unable to fetch Sprint Detail</p>
                ) : null}

            {isDoT ? (
                <div>
                    <CustomBarChart title={"Delivery On Time"} data={data} showMemberViolations={false} showInProgressTasks={false} showDeliveryOnTime={true} />
                </div>
            ) : null}
        </div>
    );
};
      

export default DeliveryOnTimeDetail;
