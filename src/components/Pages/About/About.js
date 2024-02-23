import React, { useEffect, useState } from 'react'
import Banner from '../../Banner/Banner'
import Utils from '../../../Services/Utils'
import Services from '../../../Services/Services'

import './About.scss'

function About() {
    const [dynConfig, setDynConfig] = useState([])

    let articles = []

    useEffect(() => {
        const fetchDynConfig = async () => {
            const c = await Services.getDynConfig()
            setDynConfig(c)
        }

        fetchDynConfig()
    }, [])

    if( dynConfig ) {
        const cv = Utils.obj().getValByKey

        if(cv(dynConfig,"SlideShowSlides")) {
            articles = JSON.parse(cv(dynConfig, "Articles")).map((el) => {return {label:el[0], url:el[1]}})
        }
    }

  return (
    <div className='page-container page-container__about'>
        <Banner />
        <h1>About BizzBuzz Comics</h1>
        <p>
            Welcome to <strong>Bizz Buzz Comics</strong>, where every strip is a journey, and every panel, a universe waiting to unfold. Born from a passion for storytelling and a decade-long journey that began in 2014, we've been bringing original webcomics to fans across the globe, one frame at a time.
        </p>

        <h3>Our Journey</h3>

        <p>
            It all started around back in 2014 with a simple idea: to create a space where imaginative stories could thrive and reach readers across the globe. From our humble beginnings to becoming a cherished name in the webcomics community, our journey has been nothing short of a roller coaster. With each story, we try to push the boundaries of what webcomics can be, blending genres, styles, and voices to create something truly unique.
        </p>

        <p>
            <strong>Bizz Buzz Comics</strong> was born out of this vision, a testament to our love for the art form and our commitment to sharing it with the world.
        </p>

        <img src="/stripe.png" class="bizz-buzz-stripe" alt="Bizz Buzz Comics" />

        <h3>Join Our Community</h3>

        <p>
            As we look back on an over a decade of storytelling, we're filled with gratitude for the journey so far and excitement for the adventures to come. We invite you to dive into our world of webcomics, explore stories that ignite your imagination, and join a community where creativity knows no bounds.
        </p>

        <p>
            You can follow us on <a href="https://www.facebook.com/BizzBuzzComics" target="_blank">Facebook</a>, read our stories here or on <a href="https://www.webtoons.com/en/creator/BizzBuzzComics" target="_blank">Webtoons</a> to stay updated on our latest releases, behind-the-scenes glimpses, and more. Whether you're a long-time fan or a curious newcomer, there's always something new to discover at <strong>Bizz Buzz Comics</strong>.
        </p>

        <p>Thank you for being a part of our story, thank you for reading. Here's to the next chapter and beyond!</p>
        <p><i>-- the Bizz Buzz Team</i></p>

        <h2>Articles / Interviews</h2>
        <p>
            <ul>
                {articles.map(article => (
                    <li><a href={article.url} target="_blank">{article.label}</a></li>
                ))}

            </ul>
        </p>
        {/* You can add more content here such as images, team member profiles, etc. */}
    </div>
  );
}

export default About
