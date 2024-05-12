import React from 'react'
import './footer.css'

const MainFooter = () => {
    return (
        <footer id='footer' className='footer'>
            <div className="copyright">
                &copy; Copyright {''}
                <strong>
                    <span>TinkingTin. </span>
                </strong>
                All Rights Reserved
            </div>
            <div className="credits">
                Designed by <a href="https://www.facebook.com/lester.go.940436">Team Bangan</a>
            </div>
        </footer>
    )
}

export default MainFooter