import React from 'react';
import { Link } from 'react-router-dom';
import './MiniPromo.scss'

const MiniPromo = ({ episode }) => {
    return (
        <div className="mini-promo">
            <Link to={`/comic/read/${episode.seriesId}/${episode.episodeId}/${episode.title}`}>
                <h3>{episode.title}</h3>
                <img src={episode.episodeIconSmall} alt={episode.title} />
            </Link>
        </div>
    );
};

export default MiniPromo