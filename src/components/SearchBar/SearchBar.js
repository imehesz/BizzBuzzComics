import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import './SearchBar.scss'

/**
 * SearchBar()
 * 
 * @returns 
 */
function SearchBar() {
    const [searchWord, setSearchWord] = useState('')

    const navigate = useNavigate()

    const searchComic = () => {
        navigate(`/comics/search/${searchWord}`)
    }
    
    const searchWordChange = (e) => {
        setSearchWord(e.target.value)
    }

    const submitSearch = searchComic

    return(
        <div className="search-bar">
            <form onSubmit={submitSearch}>
                <input  value={searchWord} 
                    onChange={searchWordChange} 
                    className="search" 
                    placeholder="Search Comics ...">
                </input>
                <i className="fa fa-search fa_custom" onClick={searchComic}></i>
            </form>
        </div>
    )
} 

export default SearchBar