/**
 * Utils.js
 */
class Utils {
    /**
     * 
     * @returns Object
     */
    obj = function() {
        return {
            /**
             * 
             * @param {*} arr 
             * @param {*} orderId 
             * @returns 
             */
            findNeighborsByOrderId: (arr, orderId) => {
                let prev = null
                let next = null
            
                const currentIndex = arr.findIndex(item => item.orderId === orderId)
            
                if (currentIndex > 0) {
                    prev = arr[currentIndex - 1]
                }
            
                if (currentIndex < arr.length - 1) {
                    next = arr[currentIndex + 1]
                }
            
                return { prev, next }
            },

            /**
             * 
             * @param {*} arr 
             * @param {*} keyToFind 
             * @returns 
             */
            getValByKey: (arr, keyToFind) => arr.find(item => item.key === keyToFind)?.value
        }
    }

    /**
     * 
     */
    str = function() {
        return {
            /**
             * 
             * @param {*} str 
             * @returns 
             */
            sanitize: (str) => str.replace(/\W/g, '-')
        }
    }

    site = function() {
        return {
            setTitle: (str) => document.title = `${str} || BizzBuzzComics.com`
        }
    }

    /**
     * 
     * @returns 
     */
    comic = function () {
        return {
            getReaderLink: (episode) => `/comic/` + episode.seriesId + '/read/' + episode.episodeId
        }
    }

    disqus = function() {
        return {
            getConfig: (url,identifier,title) => {
                return { url, identifier, title }
            }
        }
    }
}

export default new Utils()