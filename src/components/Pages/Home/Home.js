import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../../Services/ConfigProvider';
import Services from '../../../Services/Services';
import Utils from '../../../Services/Utils';
import Slideshow from '../../Slideshow/Slideshow';

import './Home.scss'
// import FeaturedComic from './FeaturedComic'
// import LatestUpdates from './LatestUpdates'
// import ComicOfTheDay from './ComicOfTheDay'
// import ArtistSpotlight from './ArtistSpotLight'

function Home() {
    const [dynConfig, setDynConfig] = useState([])
    let homeBg
    let backgroundStyle = {}


    let slides = []

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

        if(cv(dynConfig,"SlideShowSlides")) {
            slides = JSON.parse(cv(dynConfig, "SlideShowSlides")).map((el) => {return {url:el[0], link:el[1]}})
        }
    }

    return (
            <div className='page-container page-container__home'>
                <div className="banner" style={backgroundStyle}></div>
                
                <section>
                    <Slideshow slides={slides} />
                </section>

                <div></div>

                <section>
                <h1>aaa</h1>
                <p>sadsadas</p>
                <p>sadsadas</p>
                <p>sadsadas</p>
                <p>sadsadas</p>
                <p>sadsadas</p>
                <p>sadsadas</p>
                </section>
            </div>
    );
}

export default Home