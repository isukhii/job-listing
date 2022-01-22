import React, { useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";

function JobSearch() {
    const [jobTitle, setEnteredJob] = useState('');
    const [location, setEnteredLocation] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const searchJob  = (event) => {
        event.preventDefault();
        setSearchParams({'page': 1, 'jobTitle':jobTitle, 'location':location});
    }
    const jobHandler = (event) => {
        setEnteredJob(event.target.value);
    }
    const handlelocationChange = (event) => {
        setEnteredLocation(event.target.value);
    }
    return (
        <div>
            <form onSubmit={searchJob}>
                <input type="text" onChange={jobHandler}/>
                <input type="text" onChange={handlelocationChange}/>
                <button>Click</button>
            </form>
        </div>
    )
}
export default JobSearch;