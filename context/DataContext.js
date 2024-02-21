import {useState, useContext, createContext } from 'react'
const DataContext = createContext({})
const {Provider}= DataContext

const DataGet=({children})=>{
    const [mode, setMode] = useState(true)
    const [isOnApp, setIsOnApp] = useState(false);

    return (
        <Provider value={{setMode, mode, isOnApp, setIsOnApp}}>
            {children}
        </Provider>
    )
}
const useData = () => useContext(DataContext)
export {useData,DataGet}
