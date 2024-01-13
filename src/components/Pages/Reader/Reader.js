import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Services from '../../../Services/Services';
import './Reader.scss';
import Utils from '../../../Services/Utils';
import { Link } from 'react-router-dom';
import DisqusComments from '../../Disqus/DisqusComments'

function Reader() {
    const { seriesId, episodeId } = useParams();
    const [episodeData, setEpisodeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [prevEpisode, setPrevEpisode] = useState(null)
    const [nextEpisode, setNextEpisode] = useState(null)
    const [currentTitle, setCurrentTitle] = useState(null)

    useEffect(() => {
        const fetchEpisodeData = async () => {
            setIsLoading(true);
            try {
                // Use the Services class to load episode data by seriesId and episodeId
                const data = await Services.getPages(seriesId, episodeId);
                setEpisodeData(data);
            } catch (error) {
                console.error('Failed to fetch episode data:', error);
                // Optionally, handle error state as needed
            } finally {
                setIsLoading(false);
            }
        };

        const fetchEpisodesData = async() => {
            try {
                const data = await Services.getEpisodesBySeriesId(seriesId)
                
                // find the current orderId, they all should have it
                let currentEpisode = data.find((ep) => ep.seriesId === seriesId && ep.episodeId === episodeId)
                let currentOrderId = currentEpisode.orderId
                let prevNextEpisodes = Utils.obj().findNeighborsByOrderId(data, currentOrderId)

                setPrevEpisode(prevNextEpisodes.prev)
                setNextEpisode(prevNextEpisodes.next)
                setCurrentTitle(currentEpisode.title)

                Utils.site().setTitle(currentEpisode.title)
            } catch(error) {
                console.error('Failed to fetch Episodes', error)
            }
        }

        if (seriesId && episodeId) {
            fetchEpisodeData()
            fetchEpisodesData()
        }
    }, [seriesId, episodeId])

    if (isLoading) {
        return <div>Loading pages ...</div>;
    }

    if (!episodeData) {
        return <div>Episode not found or an error occurred :/</div>;
    }

    // Assuming episodeData.pages is an array of page URLs
    return (
        <div className="reader">
            <section className='action-row action-row__top'>
                {prevEpisode && <div title={prevEpisode.title}><Link to={Utils.comic().getReaderLink(prevEpisode)}>&#9664;</Link></div>}
                {<span className="separator"> | {currentTitle} | </span>}
                {prevEpisode && nextEpisode && <div title={nextEpisode.title}><Link to={Utils.comic().getReaderLink(nextEpisode)}>&#9654;</Link></div>}
            </section>

            <div className="page-content">
                {episodeData.map((page, index) => (
                    <img
                        key={index}
                        src={page.pageLink}
                        alt={`Page ${index + 1}`}
                        className="comic-page"
                    />
                ))}
            </div>
            <section className='action-row action-row__bottom'>
                {prevEpisode && <div title={prevEpisode.title}><Link to={Utils.comic().getReaderLink(prevEpisode)}>&#9664; {prevEpisode.title}</Link></div>}
                {prevEpisode && nextEpisode && <div className="separator">|</div>}
                {prevEpisode && nextEpisode && <div title={nextEpisode.title}><Link to={Utils.comic().getReaderLink(nextEpisode)}>{nextEpisode.title} &#9654;</Link></div>}
            </section>

            <section className="disqus-container">
                <DisqusComments config={{url:window.location.href,identifier:`bzzbzz-${seriesId}-${episodeId}`}} />
            </section>
        </div>
    );
}

export default Reader