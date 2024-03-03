import React from 'react';
import { Link } from 'react-router-dom';
import './MiniPromo.scss'

const MiniPromo = ({ episode }) => {
    return (
        <div className="mini-promo">
            <Link to={`/comic/${episode.seriesId}/read/${episode.episodeId}`} title={episode.title}>
                <img src={episode.episodeIconSmall} alt={episode.title} title={episode.title} />
                <h3>{episode.title}</h3>
            </Link>
        </div>
    );
};

export default MiniPromo