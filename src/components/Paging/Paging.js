import Pagination from 'react-bootstrap/Pagination';
import {useState, useEffect} from 'react';
import './Paging.css';

function Paging(props) {
    const [showMaxPage, setMaxPage] = useState(5);
    const [activePage, setActivePage] = useState(props.activePage);
    const [firstPageNumber, setFirstPageNumber] = useState(1);
    let items = [];
    
    // Show Prev/ Next Pages
    const pageNumberHandler = (pageNumber) => {
        setMaxPage(pageNumber + 5);
        setActivePage(pageNumber);
    }

    // Show page number 1
    const showFirstPage = () => {
        setActivePage(1);
        setFirstPageNumber(1);
        setMaxPage(5);
    }

    // Show last page
    const showLastPage = () => {
        setActivePage(props.totalPages);
        setFirstPageNumber(props.totalPages - 5);
        setMaxPage(props.totalPages);
    }

    // Display page numbers
    const paginationHandler = () => {
        items = [];
        for (let number = activePage; number <= showMaxPage; number++) {
            if(number > props.totalPages) break;
            items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={ (e) => pageNumberHandler(number)}>
                {number}
            </Pagination.Item>,
            );
        }
    }

    paginationHandler();

    // Call paginationHandler on change on showMaxPage
    useEffect(() => {
        paginationHandler();
      }, [showMaxPage]);

    // Call onPageChange on change on activePage
    useEffect(() => {
        props.onPageChange(activePage);
      }, [activePage]);
    return (
        <div className="float-right">
            <Pagination>
            { activePage !== 1 && <Pagination.First onClick={showFirstPage}/> }
            { activePage !== 1 && <Pagination.Prev onClick={(e)=> pageNumberHandler(activePage-1)}/> }
            {items}
            { activePage !== showMaxPage && <Pagination.Next onClick={(e)=> pageNumberHandler(activePage+1)}/> }
            { activePage !== showMaxPage && <Pagination.Last onClick={showLastPage}/> }
            </Pagination>
        </div>
    )
}

export default Paging;