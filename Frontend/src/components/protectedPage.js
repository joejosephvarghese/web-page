import React, { useEffect } from 'react';
import { axiosInstance } from '../axios';
import { userBaseUrl } from '../utils/const';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logoImage from './../../src/logo copy.svg';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './protectedPage.css';
import { usersFetchFailure, usersFetchSuccess } from '../Redux/users/usersAction';


function ProtectedPage({ children }) {

    const user = useSelector(value => value.users?.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const validateToken =  () => {
        axiosInstance.get(`${userBaseUrl}`)
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch(usersFetchSuccess(response.data));
                    console.log(response.data, "data vanuuuuuuuuuuuuuu");
                } else {
                    dispatch(usersFetchFailure(response.message));
                    console.log("Fetch user Failed");
                    throw new Error(response.data.message + " validationToken error");
                }
            })
            .catch((error) => {
                console.error(error.message, "/user not working");
            });
    };
    

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            console.log(localStorage.getItem('jwtToken'));
            validateToken();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = ()=> {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        navigate('/login');
      }

    return (
            <>
                <div className='headerParentDiv'>
                    <div className='headerChildDiv'>
                        <span className='sony-logo'>.</span>
                    </div>
                </div>

                <Navbar expand="lg" className="navbar bg-body-tertiary">
                    <Container fluid>
                        <img className='logo' src={logoImage} alt="Logo" />
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll>
                                <Nav.Link href="#action1">Games</Nav.Link><NavDropdown />
                                <Nav.Link href="#action2">Hardware</Nav.Link><NavDropdown />
                                <Nav.Link href="#action2">Services</Nav.Link><NavDropdown />
                                <Nav.Link href="#action2">News</Nav.Link><NavDropdown />
                                <Nav.Link href="#action2">Shop</Nav.Link><NavDropdown />
                                <Nav.Link href="#action2">Support</Nav.Link><NavDropdown />
                                <h5 className='name'>Welcome  {user?.data?.name.toUpperCase()}</h5>
                            </Nav>
                                <div>
                                    <Button variant="outline-primary" size='md' className='me-4' onClick={() => navigate('/profile')}>
                                        Profile
                                    </Button>

                                    <Button variant="outline-primary" size='md' className='me-4' onClick={handleClick}>
                                        Logout
                                    </Button>
                                </div>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            { children }
            </>
    )
}

export default ProtectedPage;