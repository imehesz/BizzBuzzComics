import React, { createContext, useState, useEffect } from 'react';
import Services from './Services'; // Adjust the path as needed

export const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState([])

    console.log("MOO?")

    useEffect(() => {
            console.log("HERE")
        const fetchConfig = async () => {
            const configData = await Services.getDynConfig()
            setConfig(configData)
        }

        fetchConfig()
    }, [])

  return (
    <ConfigContext.Provider value={{ config }}>
        {children}
    </ConfigContext.Provider>
  )
}
