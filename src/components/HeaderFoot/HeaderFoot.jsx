import React from 'react'
import './headerfoot.css'
import { Button, Col, Row } from 'react-bootstrap'
import team from '../../imgs/team-spirit.png'

const HeaderFoot = () => {
    return (
        <div>
            <Row id='about'>
                <Col md={6}>
                    <div className="h_footer">
                        <div className="h_ftCona">
                            <img src={team} alt="header-footer" className='img-fluid' />
                        </div>
                    </div>
                </Col>
                <Col md={6} className='wrapper'>
                    <div className="h_ftright">
                        <div className="containerBox">
                            <h1 className='about'>About Us</h1>
                            <p className='text-secondary my-4'>Team Bangan is a vibrant collective of visionaries committed to driving progress and fostering creativity. United by a spirit of collaboration, our diverse talents converge to tackle challenges with ingenuity and determination.</p>
                            <p className='text-secondary'>With a relentless pursuit of excellence, we push boundaries, deliver innovative solutions, and inspire positive change. Together, we embody the ethos of teamwork and passion, shaping a brighter future through our collective efforts.</p>
                            <div className="d-flex justify-content-between align-items-start w-50 mt-2 flex-wrap">
                                <Button className='bg_login fw-bold border-0 mt-3'>Get Started</Button>
                                <Button className='contact_btn mt-3' href='#contact'>contact us</Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HeaderFoot