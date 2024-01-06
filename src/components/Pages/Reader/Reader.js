import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Services from '../../../Services/Services';
import './Reader.scss';

function Reader() {
    const { seriesId, episodeId } = useParams();
    const [episodeData, setEpisodeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

        if (seriesId && episodeId) {
            fetchEpisodeData();
        }
    }, [seriesId, episodeId]);

    if (isLoading) {
        return <div>Loading pages ...</div>;
    }

    if (!episodeData) {
        return <div>Episode not found or an error occurred :/</div>;
    }

    // Assuming episodeData.pages is an array of page URLs
    return (
        <div className="reader">
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
        </div>
    );
}

export default Reader;
