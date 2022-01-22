import axios from 'axios';
import {useState} from 'react';
import JobCard from '../JobCard/JobCard';
import { useSearchParams, useNavigate } from "react-router-dom";
import JobSearchForm from '../JobSearch/JobSearchForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Marketplace.css';
import PageItem from 'react-bootstrap/PageItem';
import Pagination from 'react-bootstrap/Pagination'
function Marketplace() {
  const [jobs, setJobs] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [activePage, setActivePage] = useState(1);

  let active = 1;
  let items = [];

  const searchJobHandler = (enteredJobData) => {
    const jobData = {
      ...enteredJobData,
    }
    console.log( active)
    axios.get(`https://api.ziprecruiter.com/jobs/v1?search=${jobData.jobTitle} Job&location=${jobData.location}&page=${active}&jobs_per_page=10&api_key=mthpyw9ea7zyswfuj3zur6bt55fce7qf`)
    .then((response) => {
      setJobs(response.data.jobs)
      console.log(jobs, response)
    }).catch((error) => {
      console.log(error);
    })
  }
  const pageNumberHandler = (event, pageNumber) => {
    active = pageNumber;
    let i = items.findIndex(x => console.log(x));
    setActivePage(pageNumber);
    setPageNumber(pageNumber);
  }
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} onClick={ (e) => pageNumberHandler(e, number)}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
  <section className="master-page p-3">
    <div className="master-page-container">
      <JobSearchForm onSearchJob={searchJobHandler}/>
      <Row>
        <Col md={6}>
          <h5 className="text-muted">
            Jobs For You
            <span className="sort-by">
              Popular
            </span>
          </h5> 
        </Col>
        <Col md={6}>

        </Col>
      </Row>
      <Row className="job-list">
        {jobs.length === 0  ? 
          (<p>No Job Found</p>) : 
          ( jobs.map((job) => 
              <Col md={6}>
                <JobCard job = {job}/>
              </Col>
          ))}
     </Row>
     <Pagination>{items}</Pagination>
    </div>
  </section>
  )
}

export default Marketplace;