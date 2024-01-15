import React from 'react'
import Utils from '../../Services/Utils'
import './Tags.scss'

const Tags = ({ tagsString }) => {
    let tags = tagsString ? tagsString.split(',') : []

    if (!tags.length) return null

    return (
        <section className="tags">
            {tags.map((tag, index) => (
                <span className={`tag tag_${Utils.str().sanitize(tag).toLowerCase()}`} key={index}>{tag}</span>
            ))}
        </section>
    );
};

export default Tags