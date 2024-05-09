import React from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const LoadSpinners = () => {
    return (
        <Button className='btn btn-sm btn-primary mx-3' disabled>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
        </Button>
    )
}

export default LoadSpinners