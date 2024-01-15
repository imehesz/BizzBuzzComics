import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Services from '../../../Services/Services'
import config from '../../../AppConfig'
import { Link } from 'react-router-dom'
import DisqusComments from '../../Disqus/DisqusComments'
import Utils from '../../../Services/Utils'
import Banner from '../../Banner/Banner'
import moment from 'moment'

import './Comic.scss'
import Tags from '../../Tags/Tags'

function Comic() {
    const { seriesId } = useParams(); // Capture the seriesId from the URL
    const [seriesInfo, setSeriesInfo] = useState(null)
    const [episodes, setEpisodes] = useState([])
    const defaultImage = config.defaultImageUrl
    let disqusConfig

    const getReaderLink = (episode) => {
        return `/comic/` + seriesInfo.seriesId + '/read/' + episode.episodeId
    }


  useEffect(() => {
    const fetchSeriesInfo = async () => {
      //const info = await Services.getSeriesById(seriesId);
      const info = await Services.getComicById(seriesId)
      setSeriesInfo(info[0])
      fetchEpisodes(info.seriesId)
    };

    const fetchEpisodes = async () => {
      const eps = await Services.getEpisodesBySeriesId(seriesId)
      console.log("EPS", seriesId, eps)
      setEpisodes(eps.sort((a,b) => parseInt(b.orderId) - parseInt(a.orderId)))
    };

    if (seriesId) {
        fetchSeriesInfo();
    }
  }, [seriesId]);

    if (!seriesInfo) {
        return <div>Loading series information...</div>;
    }

    if ( seriesId && seriesInfo ) {
        disqusConfig = {
            url: window.location.href,
            identifier: `bzzbzz-${seriesId}`, // Unique identifier for each comic/episode
            title: seriesInfo.title // Title of the current page
        }

        Utils.site().setTitle(seriesInfo.title)
    }

  return (
    <div className='page-container page-container__comic'>
        <Banner />

        <div className='episodes-container'>
            <div className='comic-info'>
                <h1 className="title">{seriesInfo.title}</h1>
                <p class="summary">{seriesInfo.summary}</p>
                <p class="description">{seriesInfo.description}</p>
                {/* Display other series info here */}
            </div>
    
            <div className='episodes-list'>
                <h2 className='subtitle'>Episodes</h2>
    
                {episodes.map(episode => (
                    <div className="episode-card" key={episode.orderId}>
                        <div className='episode-order-id'>
                            <h3>#{episode.orderId}</h3>
                        </div>
                        <img 
                            className="episode-icon"
                            src={episode.episodeIconSmall || defaultImage}
                            alt={`Icon for ${episode.title}`}
                            onError={(e) => e.target.src = defaultImage}
                        />
                        <div className="episode-details">
                            <h3 className="episode-title"><Link to={getReaderLink(episode)}>{episode.title}</Link></h3>
                            <p className="episode-summary">{episode.summary}</p>
                            <div class="date-n-tags">
                                <Tags key={Math.random()} tagsString={episode.tags} />
                                <p className="episode-date">Published on {moment(episode.publishDate).format('MMMM Do YYYY, h:mm a')}</p>
                                <p className="episode-date episode-date_sm">{moment(episode.publishDate).format('MMMM Do YYYY')}</p>
                            </div>
                        </div>
                    </div>
                ))}
    
                <DisqusComments config={disqusConfig} />
            </div>
        </div>
    </div>
  );
}

export default Comic