/* global DISQUS */

import React, { useEffect } from 'react';
import config from '../../AppConfig';

const DisqusComments = ({ dqconfig }) => {
    useEffect(() => {
        // Function to reset Disqus with new config
        const resetDisqus = () => {
            if (typeof DISQUS !== 'undefined') {
                DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.url = dqconfig.url;
                        this.page.identifier = `${config.env}_${dqconfig.identifier}`;
                    }
                });
            }
        };

        // Load the Disqus script
        const script = document.createElement('script');
        script.src = `https://bizzbuzzcomics.disqus.com/embed.js`;
        script.setAttribute('data-timestamp', +new Date());
        setTimeout(() => {
            script.onload = resetDisqus; // Reset Disqus when the script loads
            (document.head || document.body).appendChild(script);
        },1000)

        return () => {
            // Clean up the script when the component unmounts
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [dqconfig]); // Effect dependency array includes config

    return (
        <div id="disqus_thread"></div>
    );
};

export default DisqusComments