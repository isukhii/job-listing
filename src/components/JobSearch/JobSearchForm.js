import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './JobSearchForm.css';

function JobSearchForm(props) {
    const [jobTitle, setEnteredJob] = useState('');
    const [location, setEnteredLocation] = useState('');

    const jobHandler = (event) => setEnteredJob(event.target.value); // Change state of jobTitle
    const handlelocationChange = (event) => setEnteredLocation(event.target.value); // Change state of location

    // Submit Form with jobdata
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
                        <Form.Group>
                            <Form.Control size="md" placeholder="Job Title" onChange={jobHandler} />
                        </Form.Group>
                    </Col>
                    <Col md={3}> 
                        <Form.Group>
                            <Form.Control size="md" placeholder="Location" onChange={handlelocationChange} />
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