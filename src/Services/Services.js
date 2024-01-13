import config from '../AppConfig' // Adjust the path based on where you placed config.js

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
        'published', 'publishDate'
    ]

    pagesStructure = [
        'seriesId', 'episodeId', 'orderId', 'pageLink'
    ]

    dynConfigSturcture = [ 'key', 'value']

    constructor() {
        //https://sheets.googleapis.com/v4/spreadsheets/1zxgIQpGKZ5g2Kzbk0Xk6WGJGBG-jNrenTRv5OBzHCo8/values/Sheet1!A${tag.tipId}?key=
        // https://sheets.googleapis.com/v4/spreadsheets/185f327CqZNyAkWJh2hMu-J9EiT0yLK-zX8uOg1QKA6k/values/SERIES!A1:D500?key=AIzaSyBLySbKUYIzPNpscruuGrSpnA3VeZ1sdvk
        this.sheetUrl = config.SeriesInfoURL // Replace with your Google Sheet's public URL
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
            const response = await fetch(this.getDynConfigAccessUrl('CONFIG!A1:B100'))
            const data = await response.json()
            return this.mapDynConfigData(data.values)
        } catch(error) {
            console.error('Error fetching config:', error)            
        }
    }

    async getComics() {
    // Logic to fetch and return the list of comics
        try {
            const response = await fetch(this.getSeriesAccessUrl('SERIES!A2:K1000'))
            const data = await response.json()
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

    async getSeriesById(seriesId) {
        // Fetch series info from your Google Sheet or API endpoint
        // Return the series info as an object
    }

    /**
     * 
     * @param {*} seriesId 
     * @returns 
     */
    async getEpisodesBySeriesId(id) {
        try {
                const response = await fetch(this.getSeriesAccessUrl('EPISODES!A2:K1000'))
                const data = await response.json()
                const rows = data.values
    
                return this.mapEpisodesData(rows.filter(row => row[0] == id && row[8] == 'Y'))
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        }
    

    async getPages(seriesId, episodeId) {
        // Logic to fetch episode data from Google Sheets or your API
        // For example, using a URL to your API endpoint:
        try {
            const response = await fetch(this.getSeriesAccessUrl('PAGES!A2:D10000'));
            const data = await response.json()
            const rows = data.values

            return this.mapPagesData(rows.filter(row => row[0] == seriesId && row[1] == episodeId))
        } catch(error) {
            console.log('Error fetching pages:', error)
        }
    }
}

export default new Services();
