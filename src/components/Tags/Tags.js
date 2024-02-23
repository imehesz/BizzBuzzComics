import React from 'react'
import Utils from '../../Services/Utils'
import { Link } from'react-router-dom'

import './Tags.scss'

const Tags = ({ tagsString }) => {
    let tags = tagsString ? tagsString.split(',') : []

    if (!tags.length) return null
    
    const getCleanedTag = (tag) => Utils.str().sanitize(tag).toLowerCase()

    return (
        <section className="tags">
            {tags.map((tag, index) => (
                <Link to={`/comics/search/${getCleanedTag(tag)}`}>
                    <span className={`tag tag_${getCleanedTag(tag)}`} key={index}>{tag}</span>
                </Link>
            ))}
        </section>
    );
};

export default Tags