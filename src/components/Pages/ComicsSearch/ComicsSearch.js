import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Banner from '../../Banner/Banner'
import Services from '../../../Services/Services'
import { ComicsContext } from '../../../Services/ComicsProvider'
import Tags from '../../Tags/Tags'

function ComicsSearch() {
    let {searchWord} = useParams()

    const { comics } = useContext(ComicsContext)
    const [episodes, setEpisodes] = useState([])
    const [searchAbles, setSearchAbles] = useState([])

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
            <Banner />
            <h1 className="title">Searched for: {searchWord}</h1>
        
            <div className='comics-container'>
    
                {searchAbles.filter( i => i.searchText.indexOf(searchWord) > -1 ).map(comic => (
                  <div className="comic-card" key={Math.random()}>
                    <img 
                        className="comic-image"
                        src={comic.imageUrl}
                        alt={`Cover for ${comic.title}`}
                    />
                    <div className="comic-info">
                        <h3 className="comic-title">{comic.title}</h3>
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