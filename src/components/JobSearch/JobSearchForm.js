import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './JobSearchForm.css';
function JobSearchForm(props) {
    const [jobTitle, setEnteredJob] = useState('');
    const [location, setEnteredLocation] = useState('');
    const jobHandler = (event) => {
        setEnteredJob(event.target.value);
    }
    const handlelocationChange = (event) => {
        setEnteredLocation(event.target.value);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const jobData = {
            jobTitle: jobTitle,
            location: location
        }
        props.onSearchJob(jobData);
    }
    return (
        <div>
            <form>
                <Row className="g-2">
                    <Col md={{ span: 3, offset: 3 }}>
                        <FloatingLabel controlId="floatingInput" label="Job Title" className="mb-2">
                            <Form.Control type="text" placeholder="Job Title" onChange={jobHandler} className="job-title-input"/>
                        </FloatingLabel>
                    </Col>
                    <Col md={3}>
                        <FloatingLabel controlId="floatingInput" label="Location" className="mb-2">
                            <Form.Control type="text" placeholder="Location" onChange={handlelocationChange} className="job-location-input"/>
                        </FloatingLabel>
                    </Col>
                    <Col md={{ span: 1 }}>
                        <Button onClick={submitHandler} className="search-button">Find Job</Button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default JobSearchForm;