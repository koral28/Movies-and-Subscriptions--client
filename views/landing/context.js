import React, {useState,createContext} from 'react';

export const sessionContext = createContext();

export const SessionContextProvider = props=>{
    const [sessionData,setSessionData]= useState("");

    return(
        <sessionContext.Provider value={[sessionData,setSessionData]}>
            {props.children}
        </sessionContext.Provider>
    )
}

