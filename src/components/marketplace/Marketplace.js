import axios from 'axios';
import {useState, useEffect} from 'react';
import JobCard from '../JobCard/JobCard';
import JobSearchForm from '../JobSearch/JobSearchForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Marketplace.css';
import Paging from '../Paging/Paging';
import Filters from '../Filters/Filters';
import Spinner from 'react-bootstrap/Spinner';

function Marketplace() {
  const [jobs, setJobs] = useState('');
  const [jobData, setJobData] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [filter, setFilterData] = useState({ radius: 0, daysAgo: ''});
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoaderValue] = useState(false);
  const [error, setError] = useState(false);
  const [filterBy, setFilters] = useState('Popular');

  const apikey = 'mthpyw9ea7zyswfuj3zur6bt55fce7qf';

  // Job Search API Call
  const searchJobAPI = () => {
    // If Jobdata is entered
    if(!!jobData) {
      setLoaderValue(true);
      let searchObj = `${jobData.jobTitle} Job&location=${jobData.location}&page=${activePage}&jobs_per_page=12&api_key=${apikey}`;
      if(!!filter.radius) {
        searchObj = searchObj + `&radius_miles=${filter.radius}`;
        setFilters('Radius');
      }
      if(!!filter.daysAgo) {
        searchObj = searchObj + `&days_ago=${filter.daysAgo}`;
        setFilters('Days Ago');
      }
      if(!!filter.radius && !!filter.daysAgo) setFilters('Radius & Days Ago');

      // API Call
      axios.get(`https://api.ziprecruiter.com/jobs/v1?search=${searchObj}`)
      .then((response) => {
        setJobs(response.data.jobs)
        if(activePage === 1) setTotalPages(Math.ceil(response.data.num_paginable_jobs/12));
        setLoaderValue(false);
      }).catch((error) => {
        setError(true);
        setJobData({radius: 0, daysAgo: ''})
        console.log(error);
      })
    }
  }

  // Save entered job data and search job
  const searchJobHandler  = (enteredJobData) => {
    setJobData(enteredJobData);
    setFilterData({
      radius: 0,
      daysAgo: ''
    })
    setActivePage(1);
  }

  // Change active page
  const pageNumberHandler = (pageNumber) => {
    setActivePage(pageNumber);
  }

  // Add filters
  const filterHandler = (filterData) => {
    setFilterData(filterData);
    setActivePage(1);
  }

  // Search job when filter changes
  useEffect(() => {
    searchJobAPI();
  }, [filter]);

  // Search job when active page changes
  useEffect(() => {
    searchJobAPI();
  }, [activePage]);

  return (
  <section className="master-page p-3">
    <div className="master-page-container">
      {!jobData &&
        <h2 className="text-center dreamJob">Find your dream job</h2>
      }
      {/* Search Job Form */}
      <JobSearchForm onSearchJob={searchJobHandler}/>
      {!loader &&
      // Filter section
      <span>
        {jobs.length !== 0 &&
        <Row className="mb-2 mt-3">
          <Col md={6} sm={12}>
            <h5 className="text-muted">
              Jobs For You
              <span className="sort-by">
                {filterBy}
              </span>
            </h5> 
          </Col>
          <Col md={6} sm={12}>
          <Filters onFilter={filterHandler} filter={filter}/>
          </Col>
        </Row>
        }
        {!!jobData && 
        // Job card
          <Row className="job-list mt-3 mb-3">
            {jobs.length === 0 ? 
              (<h5 className="text-center">No Jobs Found for the job title and location</h5>) : 
              ( jobs.map((job) => 
                  <Col md={6} lg={4} className="job-card">
                    <JobCard job = {job}/>
                  </Col>
              ))}
          </Row>
        }
      {jobs.length !== 0 && <Paging activePage={activePage} onPageChange={pageNumberHandler} totalPages={totalPages}/> }
     </span>
      }
      {loader &&
      // Loader
      <Row className="text-center mt-3">
        <Col md={{span:6, offset:3}}>
          <Spinner animation="border" className="spinner text-muted" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
      }
      {error &&
      // Error
      <h5 className="text-center">Opps! Some error occurred. Please try again</h5>
      }
    </div>
  </section>
  )
}

export default Marketplace;