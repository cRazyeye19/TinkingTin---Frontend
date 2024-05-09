import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import HeaderFoot from '../HeaderFoot/HeaderFoot'
import './hero.css'
import plan from '../../imgs/plan.png'
import teamwork from '../../imgs/teamwork.png'
import promotion from '../../imgs/promotion.png'
import startup from '../../imgs/startup.png'
import courier from '../../imgs/courier.png'


const Hero = () => {
    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="head_right">
                            <div className="imageContainer d-flex justify-content-end align-items-center">
                                <img src={plan} alt="" className='head_rightImg' />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="head_left">
                            <span className='h_subTitle'>Seamless Solutions</span>
                            <div className="w-75 mt-2 h_title">
                                <h1 style={{ color: '#717ff5' }}>Empower Events</h1>
                                <h1 style={{ color: '#3D3F42' }}>Simplify Problems</h1>
                                <h1 style={{ color: '#3D3F42' }}>Elevate Experience</h1>
                            </div>
                            <p className='text-secondary'>
                                Welcome to TinkingTin, where we specialize in revolutionizing event management. Our platform offers seamless ticketing solutions designed to simplify the entire process while elevating the experiences of both event organizers and attendees.
                            </p>
                            <div className="d-flex justify-content-between align-items-start w-50 mt-2 flex-wrap">
                                <Button className='bg_login fw-bold border-0 mt-3'>Get Started</Button>
                                <Button className='contact_btn mt-3' href='#contact'>Contact Us</Button>
                            </div>
                        </div>
                    </Col>
                </Row>


                <Row id='services'>
                    <div className="d-flex my-4 services">
                        <img src={courier} alt="curve" className='curve' />
                        <h5>Services</h5>
                    </div>
                    <Col md={4}>
                        <div className="box">
                            <div className="boxContianer d-flex align-items-center justify-content-center">
                                <div className="">
                                    <img src={teamwork} alt="" className='' style={{ width: '90%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="w-100 heading">
                                    <h5>Seamless Ticket Solutions</h5>
                                    <p className='text-secondary'>Tailored ticketing options to suit your event's unique needs.</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="box">
                            <div className="boxContianer d-flex align-items-center justify-content-center">
                                <div className="">
                                    <img src={promotion} alt="" className='' style={{ width: '90%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="w-100 heading">
                                    <h5>Engagement-Driven Event Tools</h5>
                                    <p className='text-secondary'>Interactive features that enhance attendee interaction and participation.</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="box">
                            <div className="boxContianer d-flex align-items-center justify-content-center">
                                <div className="">
                                    <img src={startup} alt="" className='' style={{ width: '90%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="w-100 heading">
                                    <h5>Data-Driven Insights</h5>
                                    <p className='text-secondary'>Actionable analytics for informed decision-making and event success.</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="headerFoot my-4">
                    <HeaderFoot />
                </div>
            </Container>
        </div>
    )
}

export default Hero