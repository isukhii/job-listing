import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import JobGet from '../../assets/images/JobGet.png'; 
import './Header.css'
function Header(props) {
    return(
    <Navbar expand="lg" variant="white" bg="white" fixed="top">
        <Container>
            <Navbar.Brand href="#"> <img src={JobGet} alt="Logo" className="logoImg"/> </Navbar.Brand>
        </Container>
    </Navbar>
    )
}

export default Header;