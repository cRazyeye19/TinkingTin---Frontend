import React from 'react'
import './topbar.css'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Topbar = () => {

    return (
        <div>
            <Navbar expand="lg" className="bg-transparent shadow-sm">
                <Container>
                    <Navbar.Brand href="#home" className='logo'>
                        <h3>Tinking<span>Tin</span></h3>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto text-center d-flex justify-content-center align-items-center">
                            <Nav.Link href="#home" className='text-secondary fw-bold'>Home</Nav.Link>
                            <Nav.Link href="#services" className='text-secondary fw-bold'>Services</Nav.Link>
                            <Nav.Link href="#about" className='text-secondary fw-bold'>About Us</Nav.Link>
                            <Nav.Link href="#contact" className='text-secondary fw-bold'>Contacts</Nav.Link>
                            <Nav.Link className='text-secondary fw-bold text-decoration-none border-0'>
                                <Link to='../auth'>
                                    <Button size="sm" className="bg_login fw-bold text-decoration-none border-0">Get Started</Button>
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Topbar