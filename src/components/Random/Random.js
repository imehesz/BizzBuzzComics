import React, { useState, useEffect } from 'react'
import MiniPromo from '../MiniPromo/MiniPromo'
import Services from '../../Services/Services'
import Utils from '../../Services/Utils'

import './Random.scss'

function Random() {
    const [episodes, setEpisodes] = useState([])

    useEffect(() => {
        const fetchEpisodes = async () => {
            const allEps = await Services.getAllEpisodes()
            setEpisodes(Utils.obj().shuffleArray([...allEps]).slice(0,5))
        };

        fetchEpisodes()
    }, [])

    return (
        <section className="featured-comics">
            {episodes.map(episode => (
                <MiniPromo key={`${episode.seriesId}_${episode.episodeId}`} episode={episode} />
            ))}
        </section>
    )
}

export default Random