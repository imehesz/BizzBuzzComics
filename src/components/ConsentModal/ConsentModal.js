/**
 * ConsentModal.js
 */
import React, { useEffect, useState } from 'react'
import { Modal } from'react-responsive-modal'

import 'react-responsive-modal/styles.css'
import './ConsentModal.scss'

/**
 * 
 * @returns 
 */
const ConsentModal = () => {
    const consentId = 'bzz-bzz-consent'
    const [open, setOpen] = useState(false)
    const [consented, setConsent] = useState(localStorage.getItem(consentId || ''))

    const onCloseModal = () => {
        setOpen(false)
        setConsent('Y')
        localStorage.setItem(consentId, 'Y')
    }

    setTimeout(() => {
        if(consented != 'Y') setOpen(true)
    }, 1000)

    return (
        <div className='consent-modal'>
            <Modal open={open} onClose={onCloseModal} center>
                <h1>WARNING! MATURE CONTENT!</h1>
                <p>
                    <strong>Bizz Buzz Comics</strong> contains and delves into themes and situations intended for mature audiences <strong>only</strong>!
                </p>

                <p>
                    Viewer discretion is advised. 
                </p>

                <p>
                    By closing this window, you acknowledge and agree to this condition in order to continue.
                </p>
            </Modal>
        </div>
    )
}

export default ConsentModal