import {useState, useContext, createContext } from 'react'
const DataContext = createContext({})
const {Provider}= DataContext

const DataGet=({children})=>{
    const [mode, setMode] = useState(true)
    const [isOnApp, setIsOnApp] = useState(false);
    const [network, setNetwork] = useState({});
    return (
        <Provider value={{setMode, mode, isOnApp, setIsOnApp, network, setNetwork}}>
            {children}
        </Provider>
    )
}
const useData = () => useContext(DataContext)
export {useData,DataGet}
