import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import courier from '../../imgs/courier.png'
import './team.css'
import profile from '../../imgs/pexels-pixabay-415829.jpg'

const Team = () => {
    return (
        <div className="mt-3">
            <Container>
                <Row>
                    <div className="d-flex my-4 services">
                        <img src={courier} alt="curve" className='curve' />
                        <h5>Meet Our Team</h5>
                    </div>
                    <Col md={4}>
                        <Card className='card'>
                            <Card.Img variant="top" src={profile} className='profile' img-fluid />
                            <Card.Body>
                                <Card.Title>Kurt Macasling <span className='role'>UI/UX Designer</span></Card.Title>
                                <Card.Text>
                                    Crafted captivating interfaces, ensuring every interaction was seamless and unforgettable.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='card'>
                            <Card.Img variant="top" src={profile} className='profile' img-fluid />
                            <Card.Body>
                                <Card.Title>Vanessa Cosep <span className='role'>Frontend Developer</span></Card.Title>
                                <Card.Text>
                                    Transformed concepts into captivating web experiences with mastery of Frontend Technology.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='card'>
                            <Card.Img variant="top" src={profile} className='profile' img-fluid />
                            <Card.Body>
                                <Card.Title>Aubrey Pagdalian <span className='role'>Frontend Developer</span></Card.Title>
                                <Card.Text>
                                    Transformed concepts into captivating web experiences with mastery of Frontend Technology.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <div className='cardform'>
                        <Col md={4}>
                            <Card className='card'>
                                <Card.Img variant="top" src={profile} className='profile' img-fluid />
                                <Card.Body>
                                    <Card.Title>John Lester Pansoy <span className='role'>FullStack Developer</span></Card.Title>
                                    <Card.Text>
                                        Navigated frontend and backend technologies adeptly, crafting robust solutions that stood the test of time.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className='card'>
                                <Card.Img variant="top" src={profile} className='profile' img-fluid />
                                <Card.Body>
                                    <Card.Title>Jam Cotejo <span className='role'>Backend Developer</span></Card.Title>
                                    <Card.Text>
                                        Engineered server-side systems with efficiency and security, ensuring reliability and scalability.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Team