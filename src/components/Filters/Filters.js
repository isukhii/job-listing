import Offcanvas from 'react-bootstrap/Offcanvas';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FunnelFill } from 'react-bootstrap-icons';
import './Filters.css';

function Filters(props) {
    const [radius, setRadiusData] = useState(props.filter.radius);
    const [show, setShow] = useState(false);
    const [daysAgo, setDaysAgo] = useState(props.filter.daysAgo);

    const handleClose = () => setShow(false); // Show Canvas
    const handleShow = () => setShow(true); // Hide Canvas
    
    // Create filtered data object and call parent function
    const filterJobs  = () => {
        const filterData = {
            radius: radius,
            daysAgo: daysAgo
        }
        props.onFilter(filterData);
    }

  return (
    <div>
        {/* Filter launch button */}
        <Button variant="primary" size="sm" onClick={handleShow} className="float-right filter">
        <FunnelFill />  Add Filters
        </Button>
        {/* Offcanvas section starts */}
        <Offcanvas show={show} onHide={handleClose} placement='end' >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/* Radius Filter */}
                <Form.Label>Radius within {radius} miles </Form.Label>
                <Form.Range value={radius} onChange={event => setRadiusData(event.target.value)}/>

                {/* Posted time Filter */}
                <Form.Label className="mt-2">Job Posted </Form.Label>
                <Form.Select value={daysAgo} onChange={event => setDaysAgo(event.target.value)}>
                    <option value="">Anytime</option>
                    <option value="1">Past 24 hours</option>
                    <option value="7">Past week</option>
                    <option value="30">Past Month</option>
                </Form.Select>
                <Button variant="primary" className="float-right mt-3" onClick={filterJobs}>
                    Filter
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
        {/* Offcanvas section ends */}
    </div>
  );
}

export default Filters;