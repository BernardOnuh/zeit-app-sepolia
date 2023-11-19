import {useState, useContext, createContext } from 'react'
const DataContext = createContext({})
const {Provider}= DataContext

const DataGet=({children})=>{
    const [mode, setMode] = useState(true)
    const [isConnected, setIsConnected] = useState(false);
    return (
        <Provider value={{setMode, mode, isConnected, setIsConnected}}>
            {children}
        </Provider>
    )
}
const useData = () => useContext(DataContext)
export {useData,DataGet}
