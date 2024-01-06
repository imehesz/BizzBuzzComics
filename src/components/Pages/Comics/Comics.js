import React, { useContext } from 'react';
import { ComicsContext } from '../../../Services/ComicsProvider';
import './Comics.scss'
import { Link } from 'react-router-dom';

function Comics() {
    const defaultImage = 'https://i.imgur.com/Pdii38C.png'
    const { comics } = useContext(ComicsContext)

    const linkToComic = (comic) => `/comic/${comic.seriesId}`

    return (
    <div className="comics-container">
      {comics.map(comic => (
        <div className="comic-card" key={comic.seriesId}>
          <img 
            className="comic-image"
            src={comic.seriesIconSmall || defaultImage}
            alt={`Cover for ${comic.title}`}
            onError={(e) => e.target.src = defaultImage}
          />
          <div className="comic-info">
            <h3 className="comic-title"><Link to={linkToComic(comic)}>{comic.title}</Link></h3>
            <p className="comic-genre">{comic.genre}</p> {/* Replace `comic.genre` with actual data */}
            <p className="comic-updated">Updated {comic.publishDate}</p>
            <div className="comic-actions">
                {comic.tags}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comics