const config = {
    env: 'DEV|PROD',
    cacheEnabled: 'true|false', // boolean!!
    GSheetAccessKey: 'GOOGLE-SHEET-ACCESS-KEY',
    WebsiteConfigURL: 'YOUR_GOOGLE_SHEET_URL', // Replace with your actual URL
    SeriesInfoURL: 'YOUR_GOOGLE_SHEET_URL', // Replace with your actual URL
    DynConfigURL: 'YOUR_GOOGLE_SHEET_URL', // Replace with your actual URLo
    data: {
        prod: {
            config: 'URL-TO-APP-CONFIG',
            series: 'URL-TO-SERIES-INFO',
            episodes: 'URL-TO-EPISODES-INFO',
            pages: 'URL-TO-PAGES-INFO',
        }
    },

    defaultImageUrl: 'URL-TO-DEFAULT-IMAGE',
}

export default config
