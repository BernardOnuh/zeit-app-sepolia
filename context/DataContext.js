import {useState, useContext, createContext } from 'react'
const DataContext=createContext({})
const {Provider}= DataContext

const DataGet=({children})=>{
    const [mode, setMode] = useState(true)
    return (
        <Provider value={{setMode, mode}}>
            {children}
        </Provider>
    )
}

const useData=()=>useContext(DataContext)
export {useData,DataGet}