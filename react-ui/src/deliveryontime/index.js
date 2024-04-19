import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import CustomBarChart from "../graph/barchart";

const DeliveryOnTimeDetail = ({ attributes, token, projectId }) => {
    const [bvAttribute, setBvAttribute] = useState(null);
    const [spAttribute, setSpAttribute] = useState(null);
    const [totalBV, setTotalBV] = useState(null);
    const [totalSP, setTotalSP] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [isDoT, setIsDoT] = useState(false);
    const [spinnerFlag, setSpinnerFlag] = useState(false);

    useEffect(() => {
        let bvId = null;
        let spId = null;
    
        for (const attribute of attributes) {
            const attributeName = attribute.name.toLowerCase();
            if (attributeName === "bv" || attributeName === "business value") {
                bvId = attribute.id.toString();
            } else if (attributeName === "sp" || attributeName === "story_points") {
                spId = attribute.id.toString();
            }
        }
    
        if (bvId) {
            setBvAttribute(bvId);
        } else {
            setBvAttribute(null);
        }
    
        if (spId) {
            setSpAttribute(spId);
        } else {
            setSpAttribute(null);
        }
    }, [attributes])

    const handleSubmit = (eventKey) => {
        eventKey.preventDefault();
        setError(false);
        setSpinner(true);

        const formData = {
            "projectId": projectId,
        }

        if (bvAttribute !== null) {
            formData.attributeKey = bvAttribute
        } else if (spAttribute !== null) {
            formData.attributeKey = spAttribute
        }

        console.log(formData)

        axios({
            method: "post",
            url: `http://localhost:8080/api/DoT/by-slug/${project}`, // error
            data: { project_id: projectId.toString() },
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        .then(res => {
            let calculatedData = [];
            let totalBV = 0;
            let totalSP = 0;
    
            for (let name in res.data) {
                let projectData = res.data[name];
                let deliveredBV = projectData.deliveredBV;
                let deliveredSP = projectData.deliveredSP;
                let totalBVFromData = projectData.total_BV;
                let totalSPFromData = projectData.total_SP;
                let remBV = totalBVFromData - deliveredBV;
                let remSP = totalSPFromData - deliveredSP;
    
                totalBV += deliveredBV;
                totalSP += deliveredSP;
    
                calculatedData.push({
                    name: name,
                    deliveredBV: deliveredBV,
                    remBV: remBV,
                    deliveredSP: deliveredSP,
                    remSP: remSP
                });
            }
    
            setData(calculatedData);
            setTotalBV(totalBV);        
            setTotalSP(totalSP);        
            setIsDoT(true);
            setSpinnerFlag(false);
        })
        .catch(ex => {
            console.error('Error fetching data:', ex);
            setIsDoT(false);
            setSpinnerFlag(false);
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
