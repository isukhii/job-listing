import Pagination from 'react-bootstrap/Pagination';
import {useState, useEffect} from 'react';
import './Paging.css';

function Paging(props) {
    const [activePage, setActivePage] = useState(props.activePage);
    const [firstPageNumber, setFirstPageNumber] = useState(1);
    const [allProjects, setAllProjects] = useState([]);

    let items = [];
    
    // Show Prev/ Next Pages
    const pageNumberHandler = (pageNumber) => {
        setActivePage(pageNumber);
    }

    // Show page number 1
    const showFirstPage = () => {
        setActivePage(1);
        setFirstPageNumber(1);
    }

    // Show last page
    const showLastPage = () => {
        setActivePage(props.totalPages);
        setFirstPageNumber(props.totalPages - 5);
    }

    // Display page numbers
    const paginationHandler = () => {
        items = [];
        for (let number = activePage; number <= activePage + 5; number++) {
            if(number > props.totalPages) break;
            items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={ (e) => pageNumberHandler(number)}>
                {number}
            </Pagination.Item>,
            );
        }
        setAllProjects(items);
    }

    // Call paginationHandler on change on showMaxPage
    useEffect(() => {
        paginationHandler();
      }, [activePage]);

    // Call onPageChange on change on activePage
    useEffect(() => {
        props.onPageChange(activePage);
      }, [activePage]);
    return (
        <div className="float-right">
            <Pagination size="sm">
            { activePage !== 1 && <Pagination.First onClick={showFirstPage}/> }
            { activePage !== 1 && <Pagination.Prev onClick={(e)=> pageNumberHandler(activePage-1)}/> }
            {allProjects}
            { activePage !== props.totalPages && <Pagination.Next onClick={(e)=> pageNumberHandler(activePage+1)}/> }
            { activePage !== props.totalPages && <Pagination.Last onClick={showLastPage}/> }
            </Pagination>
        </div>
    )
}

export default Paging;