import React, { useEffect } from 'react'
import Header from './Header/Header'

export default function Platinum() {

    useEffect(() => {
        document.body.className = 'platinum'
    }, [])

    return (
        <React.Fragment>
            <Header />
        </React.Fragment>
    )
}
