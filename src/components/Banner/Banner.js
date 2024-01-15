/**
 * Banner.js
 */
import React, { useEffect, useState } from 'react'
import Services from '../../Services/Services'
import Utils from '../../Services/Utils'

import './Banner.scss'

/**
 * 
 * @returns 
 */
const Banner = () => {

    const [dynConfig, setDynConfig] = useState([])
    let homeBg
    let backgroundStyle = {}

    useEffect(() => {
        const fetchDynConfig = async () => {
            const c = await Services.getDynConfig()
            setDynConfig(c)
        }

        fetchDynConfig()
    }, [])

    if( dynConfig ) {
        const cv = Utils.obj().getValByKey

        homeBg = cv(dynConfig, "HomeBackground")
        backgroundStyle.backgroundImage = homeBg ? `url(${homeBg})` : ''
    }

    return (
        <div className="banner" style={backgroundStyle}></div>
    )
}

export default Banner