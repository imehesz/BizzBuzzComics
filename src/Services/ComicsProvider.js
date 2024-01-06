import React, { createContext, useState, useEffect } from 'react';
import Services from './Services'; // Adjust the path as needed

export const ComicsContext = createContext()

export const ComicsProvider = ({ children }) => {
    const [comics, setComics] = useState([])

    useEffect(() => {
        const fetchComics = async () => {
            const comicsData = await Services.getComics()
            setComics(comicsData)
        }

        fetchComics()
    }, [])

  return (
    <ComicsContext.Provider value={{ comics }}>
        {children}
    </ComicsContext.Provider>
  )
}
