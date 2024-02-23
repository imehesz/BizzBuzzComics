import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Banner from '../../Banner/Banner'
import Services from '../../../Services/Services'
import { ComicsContext } from '../../../Services/ComicsProvider'
import Tags from '../../Tags/Tags'
import SearchBar from '../../SearchBar/SearchBar'

function ComicsSearch() {
    let {searchWord} = useParams()

    const { comics } = useContext(ComicsContext)
    const [episodes, setEpisodes] = useState([])
    const [searchAbles, setSearchAbles] = useState([])

    const linkToComic = (comic) => `/comic/${comic.seriesId}`
    const linkToEpisode = (episode) => `/comic/${episode.seriesId}/read/${episode.episodeId}`

    useEffect(() => {
        const fetchAllEpisodes = async () => {
            const eps = await Services.getAllEpisodes()
            setEpisodes(eps.sort((a,b) => parseInt(b.orderId) - parseInt(a.orderId)))
        };
    
        if(comics) {
            fetchAllEpisodes()
        }
    }, [])

    if(comics.length && episodes.length && !searchAbles.length) {
        let tmpSearchArr = comics.concat(episodes)
        setSearchAbles(tmpSearchArr.map(item => {
            let retObj = {
                seriesId: item.seriesId,
                episodeId: item.episodeId,
                type: item.episodeId ? 'episode' : 'series',
                title: item.title,
                imageUrl: item.episodeId ? item.episodeIconSmall : item.seriesIconSmall,
                tags: item.tags,
                summary: item.summary,
                searchText: `${item?.title?.toLowerCase()} ${item?.summary?.toLowerCase()} ${item?.tags?.toLowerCase()}`
            }

            return retObj
        }))
    }

    return(
        <div className="page-container page-container__comics">
            <SearchBar />

            <Banner />
            
            <h1 className="title">Searched for: {searchWord}</h1>
        
            <div className='comics-container'>
    
                {searchAbles.filter( i => i.searchText.indexOf(searchWord) > -1 ).map(comic => (
                  <div className="comic-card" key={Math.random()}>
                    <Link to={comic.type == 'episode' ? linkToEpisode(comic) : linkToComic(comic)}>
                        <img 
                            className="comic-image"
                            src={comic.imageUrl}
                            alt={`Cover for ${comic.title}`}
                            title={comic.title}
                        />
                    </Link>
                    <div className="comic-info">
                        <h3 className="comic-title">
                            <Link to={comic.type == 'episode' ? linkToEpisode(comic) : linkToComic(comic)} title={comic.title}>
                                {comic.title}
                            </Link>
                        </h3>
                        <div className="comic-actions">
                            <Tags key={Math.random()} tagsString={comic.tags} />
                        </div>
                    </div>
                  </div>
                ))}

                {searchAbles.filter( i => i.searchText.indexOf(searchWord) > -1 ).length == 0 && <div>No comics found :(</div>}
    
            </div>
        </div>
    )
}

export default ComicsSearch