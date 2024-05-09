import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const ErrorMsg = () => {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    There's seems to be a problem with the server. Please try again later.
                </p>
            </Alert>
        )
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default ErrorMsg