import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../../Services/ConfigProvider';
import Services from '../../../Services/Services';
import Utils from '../../../Services/Utils';

import './Home.scss'
// import FeaturedComic from './FeaturedComic'
// import LatestUpdates from './LatestUpdates'
// import ComicOfTheDay from './ComicOfTheDay'
// import ArtistSpotlight from './ArtistSpotLight'

function Home() {
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
        homeBg = Utils.obj().getValByKey(dynConfig, "HomeBackground")
        backgroundStyle.backgroundImage = homeBg ? `url(${homeBg})` : ''
    }

    return (
            <div>
                <div className="banner" style={backgroundStyle}></div>
                
                <div className="page-container page-container__home"></div>
                <h1>aaa</h1>
                <p>sadsadas</p>
                <p>sadsadas</p>
                <p>sadsadas</p>
                <p>sadsadas</p>
                <p>sadsadas</p>
                <p>sadsadas</p>
            </div>
    );
}

export default Home