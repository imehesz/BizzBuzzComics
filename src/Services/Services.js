import config from '../AppConfig'
import Utils from './Utils'
import { compress, decompress } from 'lz-string'

class Services {
    comicStructure = [
        'seriesId', 'title', 'author', 
        'seriesIconSmall', 'seriesIconLarge', 
        'publishDate', 'summary', 'description', 'tags'
    ]

    episodesStructure = [
        'seriesId', 'episodeId', 'orderId', 
        'episodeIconSmall', 'episodeIconLarge', 
        'title', 'summary', 'description', 
        'published', 'publishDate', 'tags'
    ]

    pagesStructure = [
        'seriesId', 'episodeId', 'orderId', 'pageLink'
    ]

    dynConfigSturcture = [ 'key', 'value']

    constructor() {
        this.sheetUrl = config.SeriesInfoURL
    }

    /**
     * 
     * @param {*} apiString 
     * @returns 
     */
    async fetchDataWithCache(apiString, accessFn) {
        const cacheKey = `bzz-bzz_cache_${apiString}`
        const cached = localStorage.getItem(cacheKey)

        if (cached) {
            const { data, timestamp } = JSON.parse(decompress(cached))
            const isExpired = (new Date().getTime() - timestamp) > 3600000 // 1 hour in milliseconds

            if (!isExpired) {
                return data // Return cached data if not expired
            }
        }

        // Fetch new data if not cached or cache is expired
        const response = await fetch(accessFn(apiString))
        const newData = await response.json()

        // Cache the new data with a timestamp
        localStorage.setItem(cacheKey, compress(JSON.stringify({ data: newData, timestamp: new Date().getTime() })))

        return newData
    }

    /**
     * 
     * @param {*} arrayData 
     * @returns 
     */
    mapComicData(arrayData) {
        return arrayData.map(row => {
            let comic = {}
            this.comicStructure.forEach((fieldName, index) => {
                comic[fieldName] = row[index]
            })
            return comic
        })
    }

    /**
     * 
     * @param {*} arrayData 
     * @returns 
     */
    mapEpisodesData(arrayData) {
        return arrayData.map(row => {
            let episode = {}
            this.episodesStructure.forEach((fieldName, index) => {
                episode[fieldName] = row[index]
            })
            return episode
        })
    }

    /**
     * 
     * @param {*} arrayData 
     * @returns 
     */
    mapPagesData(arrayData) {
        return arrayData.map(row => {
            let page = {}
            this.pagesStructure.forEach((fieldName, index) => {
                page[fieldName] = row[index]
            })

            return page
        })
    }

    /**
     * 
     * @param {*} arrayData 
     * @returns 
     */
    mapDynConfigData(arrayData) {
        return arrayData.map(row => {
            let confEntry = {}
            this.dynConfigSturcture.forEach((fieldName, index) => {
                confEntry[fieldName] = row[index]
            })

            return confEntry
        })
    }

    getSeriesAccessUrl (paramStr) {
        return `${config.SeriesInfoURL}${paramStr}?key=${config.GSheetAccessKey}`       
    }

    getDynConfigAccessUrl (paramStr) {
        return `${config.DynConfigURL}${paramStr}?key=${config.GSheetAccessKey}`       
    }

    /**
     * 
     * @returns 
     */
    async getDynConfig() {
        try {
            const response = await this.fetchDataWithCache('CONFIG!A1:B1000', this.getDynConfigAccessUrl)
            const data = response.json ? await response.json() : response
            return this.mapDynConfigData(data.values)
        } catch(error) {
            console.error('Error fetching config:', error)            
        }
    }

    async getComics() {
        try {
            const response = await this.fetchDataWithCache('SERIES!A2:K1000', this.getSeriesAccessUrl)
            const data = response.json ? await response.json() : response
            return this.mapComicData(data.values) // Format or process data as needed
        } catch (error) {
            console.error('Error fetching comics:', error);
        }
    }

    async getComicById(id) {
        const fetchComics = async () => {
            const comicsData = await this.getComics()
            return comicsData.filter(row => row['seriesId'] == id)
        }

        return fetchComics()
    }

    /**
     * 
     * @param {*} seriesId 
     * @returns 
     */
    async getEpisodesBySeriesId(id) {
        try {
                const response = await this.fetchDataWithCache('EPISODES!A2:K1000', this.getSeriesAccessUrl)
                const data = response.json ? await response.json() : response
                const rows = data.values
    
                return this.mapEpisodesData(rows.filter(row => row[0] == id && row[8] == 'Y'))
        } catch (error) {
                console.error('Error fetching comics:', error);
        }
    }

    /**
     * 
     * @returns 
     */
    async getAllEpisodes() {
        try {
            const response = await this.fetchDataWithCache('EPISODES!A2:K1000', this.getSeriesAccessUrl)
            const data = response.json ? await response.json() : response
            const rows = data.values
    
            return this.mapEpisodesData(rows.filter(row => row[8] == 'Y'))
        } catch (error) {
            console.error('Error fetching comics:', error)
        }
    }
    
    /**
     * 
     * @param {*} seriesId 
     * @param {*} episodeId 
     * @returns 
     */
    async getPages(seriesId, episodeId) {
        try {
            const response = await this.fetchDataWithCache('PAGES!A2:D10000', this.getSeriesAccessUrl)
            const data = response.json ? await response.json() : response
            const rows = data.values

            return this.mapPagesData(rows.filter(row => row[0] == seriesId && row[1] == episodeId))
        } catch(error) {
            console.log('Error fetching pages:', error)
        }
    }
}

export default new Services()