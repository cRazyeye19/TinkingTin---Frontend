import React from 'react'
import './footer.css'
import logo from '../../imgs/call-back.png'

const Footer = () => {
    return (
        <footer className="footer-section" id='contact'>
            <div className="container">
                <div className="footer-cta pt-5 pb-5">
                    <div className="row">
                        <div className="d-flex my-4 services">
                            <img src={logo} alt="curve" className='curve' />
                            <h5>Contacts</h5>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="bi bi-geo-alt-fill" />
                                <div className="cta-text">
                                    <h4>Find us</h4>
                                    <span>Natalio B. Bacalso Ave, Cebu City, 6000 Cebu</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="bi bi-telephone-fill" />
                                <div className="cta-text">
                                    <h4>Call us</h4>
                                    <span>+639982020869</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="bi bi-envelope-at-fill" />
                                <div className="cta-text">
                                    <h4>Mail us</h4>
                                    <span>tinkingtin@hotmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30 d-flex align-items-center justify-content-center">
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <h4>TinkingTin</h4>
                                </div>
                                <div className="footer-text">
                                    <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                        elit,Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className="footer-social-icon">
                                    <button>Follow Us</button>
                                </div>
                                <div className="footer-social-icon">
                                    <a href="https://www.facebook.com/lester.go.940436"><i className="bi bi-facebook" /></a>
                                    <a href="#"><i className="bi bi-twitter" /></a>
                                    <a href="#"><i className="bi bi-instagram" /></a>
                                    <a href="#"><i className="bi bi-threads" /></a>
                                    <a href="#"><i className="bi bi-github" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30 d-flex align-items-center justify-content-center">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">about</a></li>
                                    <li><a href="#">services</a></li>
                                    <li><a href="#">portfolio</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Our Services</a></li>
                                    <li><a href="#">Expert Team</a></li>
                                    <li><a href="#">Contact us</a></li>
                                    <li><a href="#">Latest News</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Subscribe</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                </div>
                                <div className="subscribe-form">
                                    <form action="#">
                                        <input type="text" placeholder="Email Address" />
                                        <button><i className="bi bi-send-fill" /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                            <div className="copyright-text">
                                <p>Copyright © 2024, All Right Reserved <a href="https://codepen.io/anupkumar92/">TinkingTin</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer