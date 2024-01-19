import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../../Services/ConfigProvider';
import Services from '../../../Services/Services';
import Utils from '../../../Services/Utils';
import Slideshow from '../../Slideshow/Slideshow';
import Featured from '../../Featured/Featured';
import Random from '../../Random/Random'
import Banner from '../../Banner/Banner'

import './Home.scss'

function Home() {
    const [dynConfig, setDynConfig] = useState([])

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

        if(cv(dynConfig,"SlideShowSlides")) {
            slides = JSON.parse(cv(dynConfig, "SlideShowSlides")).map((el) => {return {url:el[0], link:el[1]}})
        }
    }

    return (
            <div className='page-container page-container__home'>
                <Banner />
                
                <section>
                    <Slideshow slides={slides} />
                </section>

                <div></div>

                <section>
                    <h1 className="title">Latest</h1>
                    <Featured />
                </section>

                <section>
                    <h1 className='title'>Staff Picks</h1>
                    <Random />
                </section>
            </div>
    );
}

export default Home