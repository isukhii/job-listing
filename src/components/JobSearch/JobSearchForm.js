import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './JobSearchForm.css';

function JobSearchForm(props) {
    const [jobTitle, setEnteredJob] = useState('');
    const [location, setEnteredLocation] = useState('');
    const [errorJob, setErrorJob] = useState(false);
    const [errorLocation, setErrorLocation] = useState(false);

    // Change state of jobTitle
    const jobHandler = (event) => {
        setEnteredJob(event.target.value);
        if(!!jobTitle) setErrorJob(false);
    }

    // Change state of location
    const handlelocationChange = (event) => {
        setEnteredLocation(event.target.value);
        if(!!location) setErrorLocation(false);
     } 

    // Submit Form with jobdata
    const submitHandler = (event) => {
        if(!!location && !!jobTitle) {
            event.preventDefault();
            const jobData = {
                jobTitle: jobTitle,
                location: location
            }
            props.onSearchJob(jobData);
        } else {
            if(!jobTitle) setErrorJob(true);
            if(!location) setErrorLocation(true);
        }
    }

    return (
        <div>
            <form>
                <Row className="g-2">
                    <Col md={{ span: 3, offset: 3 }}> 
                        <Form.Group>
                            <Form.Control value={jobTitle} className={!errorJob ? "" : "is-invalid"} size="md" placeholder="Job Title" onChange={jobHandler} required/>
                        </Form.Group>
                    </Col>
                    <Col md={3}> 
                        <Form.Group>
                            <Form.Control value={location} size="md" className={!errorLocation ? "" : "is-invalid"} placeholder="Location (City, State)" onChange={handlelocationChange} required/>
                        </Form.Group>
                    </Col>
                    <Col md={2}> 
                        <Button onClick={submitHandler} className="search-button" size="md">Find Job</Button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default JobSearchForm;