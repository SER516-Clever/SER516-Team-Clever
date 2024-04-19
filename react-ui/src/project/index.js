import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Dropdown, FloatingLabel, Form, Image, InputGroup, ListGroup, Nav, Navbar, Spinner, Stack } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import DateSelectorCruft from '../cruft';
import DateSelector from '../devfocus';
import Graph from "../graph";
import Name from "../images/Name.png";
import CustomModal from "../modal";
import SprintDetail from "../sprint";
import DateSelector from '../devfocus';
import DateSelectorCruft from '../cruft';
import DateSelectorTechDebt from '../techdebt';


const Project = () => {
    const location = useLocation();
    const [auth, setAuth] = useState("");
    const [project, setProject] = useState("");
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [metric, setMetric] = useState(null);
    const [spinnerFlag, setSpinnerFlag] = useState(false);
    const [isBurndown, setIsBurndown] = useState(false);
    const [isLeadTime, setIsLeadTime] = useState(false);
    const [isCycleTime, setIsCycleTime] = useState(false);
    const [isDevFocus, setIsDevFocus] = useState(false);
    const [isCruft, setIsCruft] = useState(false);
    const [isFoundWork, setIsFoundWork] = useState(false);
    const [isDoT, setIsDoT] = useState(false);
    const [isTechDebt, setIsTechDebt] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);
        if (eventKey === "Lead Time") {
            setMetric("8080/api/metric/LeadTime");
            setIsBurndown(false);
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsCruft(false);
            setIsLeadTime(true);
            setIsFoundWork(false);
        }
        else if (eventKey === "Cycle Time") {
            setMetric("8080/api/metric/CycleTime");
            setIsBurndown(false);
            setIsCycleTime(true);
            setIsDevFocus(false);
            setIsCruft(false);
            setIsLeadTime(false);
            setIsFoundWork(false);
        }
        else if (eventKey === "Burndown Chart") {
            setMetric("8080/api/Sprints");
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsLeadTime(false);
            setIsCruft(false);
            setIsFoundWork(false);
        }
        else if (eventKey === "Dev Focus") {
            setIsBurndown(false);
            setIsLeadTime(false);
            setIsCycleTime(false);
            setIsCruft(false);
            setIsFoundWork(false);
            setMetric("8080/api/Project");
            setIsFoundWork(false);
        }
        else if (eventKey === "Cruft") {
            setMetric("8080/api/Sprints");
            setIsBurndown(false);
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsLeadTime(false);
            setIsFoundWork(false);
        }
        else if (eventKey === "Found Work") {
            setMetric("8080/api/Sprints");
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsLeadTime(false);
            setIsCruft(false);
            setIsBurndown(false);
        }
        else if (eventKey === "Delivery On Time") {
            setMetric("8080/api/DoT");      // To do change the URL as required
            setIsBurndown(false);
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsLeadTime(false);
            setIsCruft(false);
            setIsDoT(true);
        }
        else if (eventKey === "Tech Debt") {
            setMetric("8080/api/Sprints");
            setIsBurndown(false);
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsLeadTime(false);
            setIsCruft(false);
        }
    };

    useEffect(() => {
        setAuth(location?.state?.token);
    }, [location]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSpinnerFlag(true);

        axios({
            method: "post",
            url: `http://localhost:${metric}`,
            data: {
                projectslug: project,
                from_date: startDate,
                to_date: endDate
            },
            headers: {
                "Content-Type": "application/json",
                "token": auth
            }
        })
            .then(res => {
                setData(res.data);
                console.log(data);
                setSpinnerFlag(false);
                setError(false);
                selectedValue === "Dev Focus" ? setIsDevFocus(true) : setIsDevFocus(false);
                selectedValue === "Burndown Chart" ? setIsBurndown(true) : setIsBurndown(false);
                selectedValue === "Cruft" ? setIsCruft(true) : setIsCruft(false);
                selectedValue === "Found Work" ? setIsFoundWork(true) : setIsFoundWork(false);
                selectedValue === "Tech Debt" ? setIsTechDebt(true) : setIsTechDebt(false);
            })
            .catch(ex => {
                setError(true);
                setSpinnerFlag(false);
                setIsBurndown(false);
                setIsDevFocus(false);
                setIsFoundWork(false);
            });
    }

    const handleProjectSlugField = (event) => {
        event.preventDefault();
        setProject(event.target.value);
        setError(false);
    }

    if (!location?.state) {
        return (
            <CustomModal message="User not authenticated" headerTitle="Invalid Authentication!" showModal={true} />
        );
    }

    return (
        <div className="backgroundDashboard fontUniform" style={{ display: "flex", minWidth: "100vh", minHeight: "100vh", justifyContent: 'center', alignItems: 'center' }}>
            <title>Team Clever</title>
            <div className="backgroundWhite" style={{ minWidth: "95%", minHeight: "95%", width: "95%", height: "95%", maxHeight: "95vh", overflow: "auto", borderRadius: "15px" }}>
                <div style={{ position: "fixed", width: "25vh" }}>
                    <div className="backgroundNavBar" style={{ minHeight: "10vh", borderTopLeftRadius: "15px", overflow: "hidden", borderRight: "1px solid #61677A"  }}>
                        <Image src={Name} style={{ width: "100%", height: "100%", marginTop: "15px" }} />
                    </div>
                    <div className="backgroundWhite" style={{ minHeight: "85vh", borderBottomLeftRadius: "15px", borderTop: "1px solid #61677A", borderRight: "1px solid #61677A" }}>
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <ListGroup defaultActiveKey={['0']} alwaysOpen>
                                <ListGroup.Item  as={Link} to="/project" state={{token: auth}}><b>Dashboard</b></ListGroup.Item>
                            </ListGroup>
                            <Accordion defaultActiveKey={['0']} alwaysOpen>
                                <Accordion.Item eventKey="0">
                                    <ListGroup defaultActiveKey={['0']} alwaysOpen>
                                        <ListGroup.Item  as={Link} to="/metricwiki" state={{token: auth}}>Metric Wiki</ListGroup.Item>
                                    </ListGroup>
                                    <Accordion.Body style={{ paddingTop: "5px" }}>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Lead Time</Nav.Link>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Cycle Time</Nav.Link>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Burndown Chart</Nav.Link>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Dev Focus</Nav.Link>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Cruft</Nav.Link>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Adopted Work</Nav.Link>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Found Work</Nav.Link>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Delivery On Time</Nav.Link>
                                        <Nav.Link style={{ borderBottom: "1px solid #61677A" }} as={Link} to="/metricwiki" state={{token: auth}}>Technical Debt</Nav.Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <ListGroup defaultActiveKey={['0']} alwaysOpen>
                                <ListGroup.Item as={Link} to="/aboutus" state={{token: auth}}>About Us</ListGroup.Item>
                            </ListGroup>
                        </Nav>
                    </div>
                </div>
                <div style={{ marginLeft: "25vh" }}>
                    <div className="backgroundNavBar" style={{ minHeight: "10vh", borderBottom: "1px solid #61677A" }}>
                        <Navbar>
                            <div style={{ marginLeft: "40px", marginTop: "10px" }}><h2><b>Dashboard</b></h2></div>
                            <div className="ms-auto" style={{ marginRight: "45px", marginTop: "5px" }}>
                                <a href="/" style={{ fontSize: "20px" }}><u>Logout</u></a>
                            </div>
                        </Navbar>
                    </div>
                    <div className="backgroundWhite" style={{ minHeight: "85vh" }}>
                        <Stack>
                            <div>
                                <br />
                                <Form>
                                    <div style={{padding: "45px"}}>Welcome to Team Clever's SER516 Project! Metrics are important 
                                    for any developer team to characterize, evaluate, predict and improve. This dashboard will help you
                                    evaluate your sprints and projects using different metrics. Read up more about the metrics  
                                    <a href="/metricwiki"> here</a>.
                                     <br /><br />To utilize the dashboard, kindly input the project slug below and other details 
                                     as required. 
                                        <br /></div>
                                    <div className="d-flex justify-content-center col-sm-8 offset-sm-2">
                                        <InputGroup>
                                            <FloatingLabel
                                                controlId="formProjectSlug"
                                                label="Project Slug"
                                            >
                                                <Form.Control type="text" placeholder="Project Slug" onChange={handleProjectSlugField} />
                                            </FloatingLabel>
                                            <Dropdown onSelect={handleSelect}>
                                                <Dropdown.Toggle variant="outline-secondary" className="backgroundButton">
                                                    {selectedValue ? selectedValue : 'Select Metric'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="Lead Time">Lead Time</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Cycle Time">Cycle Time</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Burndown Chart">Burndown Chart</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Dev Focus">Dev Focus</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Cruft">Cruft</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Found Work">Found Work</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Delivery On Time">Delivery On Time</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Tech Debt">Tech Debt</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </InputGroup>
                                    </div><br />

                            {isLeadTime || isCycleTime ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                        <Form.Group controlId="dateFrom" style={{ width: '15%' }}>
                                            <Form.Label>From</Form.Label>
                                            <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="dateTo" style={{ width: '15%' }}>
                                            <Form.Label>To</Form.Label>
                                            <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                                        </Form.Group>
                                    </div>
                                </div>
                            ) : null}

                                    <Button type="submit" className="submitButton backgroundButton" onClick={handleSubmit}>
                                        Submit
                                    </Button>

                                    <br />

                                    {error ? (
                                        <p className="errorMessage">Unable to fetch project detail</p>
                                    ) : null}

                                    {spinnerFlag ? <Spinner animation="border" style={{ justifyContent: "center", alignItems: "center", display: "flex", marginLeft: "49%", color: "#61677A" }} /> : null}
                                </Form>
                            </div>

                            {data?.metric === "LEAD" && isLeadTime ? (
                                <div>
                                    <br />
                                    <h3 className="projectName">{data.projectInfo.name}</h3>
                                    <Graph type="Lead Time" apiData={data.leadTime.storiesLeadTime.userStory} avg={data.leadTime.storiesLeadTime.avgLeadTime} chartFor={"User Story"} title={`User Story ${selectedValue}`} />
                                    <br />
                                    <Graph type="Lead Time" apiData={data.leadTime.tasksLeadTime.task} avg={data.leadTime.tasksLeadTime.avgLeadTime} chartFor={"Task"} title={`Task ${selectedValue}`} />
                                </div>
                            ) : null}
                            {data?.metric === "CYCLE" && isCycleTime ? (
                                <div>
                                    <br />
                                    <h3 className="projectName">{data.projectInfo.name}</h3>
                                    <Graph type="Cycle Time" apiData={data.cycleTime.storyCycleTime.story} avg={data.cycleTime.storyCycleTime.avgCycleTime} chartFor={"User Story"} title={`User Story ${selectedValue}`} />
                                    <br />
                                    <Graph type="Cycle Time" apiData={data.cycleTime.taskCycleTime.task} avg={data.cycleTime.taskCycleTime.avgCycleTime} chartFor={"Task"} title={`Task ${selectedValue}`} />
                                </div>
                            ) : null}
                            {selectedValue === "Burndown Chart" && isBurndown ? (
                                <SprintDetail sprintDetails={data.sprints} attributes={data.custom_attributes} token={auth} projectName={data.name} isBurndown={isBurndown} isFoundWork={isFoundWork} />
                            ) : null}
                            {selectedValue === "Dev Focus" && isDevFocus ? (
                                <DateSelector memberDetails={data.members} token={auth} projectId={data.id} onDateSubmit={(startDate, endDate) => {
                                    console.log("Date range submitted:", startDate, "to", endDate);
                                }} />
                            ) : null}
                            {selectedValue === "Cruft" && isCruft ? (
                                <DateSelectorCruft attributes={data.custom_attributes} token={auth} projectId={data.id} onDateSubmit={(startDate, endDate) => {
                                    console.log("Date range submitted:", startDate, "to", endDate);
                                }} />
                            ) : null}

                            {selectedValue === "Found Work" && isFoundWork ? (
                                <SprintDetail sprintDetails={data.sprints} attributes={data.custom_attributes} token={auth} projectName={data.name} isBurndown={isBurndown} isFoundWork={isFoundWork} />
                            ) : null}

                            {/* {selectedValue === "Delivery On Time" && isDoT ? (
                                <DateSelectorCruft attributes={data.custom_attributes} token={auth} projectId={data.id} onDateSubmit={(startDate, endDate) => {
                                    console.log("Date range submitted:", startDate, "to", endDate);
                                }} />
                            ) : null} */}
                            
                            {selectedValue === "Tech Debt" && isTechDebt ? (
                                <DateSelectorTechDebt attributes={data.custom_attributes} token={auth} projectId={data.id} onDateSubmit={(startDate, endDate) => {
                                    console.log("Date range submitted:", startDate, "to", endDate);
                                }} />
                            ) : null}
                            <br />
                        </Stack>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Project;
