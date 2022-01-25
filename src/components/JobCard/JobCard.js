import Card from 'react-bootstrap/Card';
import { PinMapFill, Dot } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './JobCard.css';
function JobCard(props) {
    return(
        // Job card section starts
        <Card className="job-card-details"> 
            <Card.Body>
                <Card.Title className="job-title">{props.job.name}</Card.Title>
                <Row>
                    <Col md={6}>
                        <Card.Text className="company-name margin-bottom-5">{props.job.hiring_company.name}</Card.Text>
                    </Col>
                    <Col md={6} className="job-location margin-bottom-5">
                        <Card.Text>
                            <PinMapFill className="text-muted"/> {props.job.location}
                        </Card.Text>
                    </Col>
                    <Col md={6} className="align-self-lg-end">
                        <Card.Text className="job-details">
                            {props.job.posted_time_friendly} <Dot /> {props.job.category}
                        </Card.Text>
                    </Col>
                    <Col md={6} className="apply-now">
                        <Button size="sm" className="apply-now-button">Apply Now</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        // Job card section ends
    )
}

export default JobCard;