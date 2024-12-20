import React, { useState, useEffect } from 'react';
import './Featured.scss'; // Importing the CSS for the Header
import { Link } from 'react-router-dom'
import MiniPromo from '../MiniPromo/MiniPromo';
import Services from '../../Services/Services';

function Featured() {
    const [episodes, setEpisodes] = useState([])

    useEffect(() => {
        const fetchEpisodes = async () => {
            const allEps = await Services.getAllEpisodes()
            setEpisodes(allEps.sort((a,b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0,5))
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

export default Featured