import React, { createContext, useReducer } from "react"

import { initialState, LeadReducer  } from 'src_redux/reducers/LeadReducer'

export const LeadContext = createContext()

export const LeadProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(LeadReducer, initialState)

    return (
        <LeadContext.Provider value={{ state, dispatch }}>
            {/* useReducer returns the state and a dispatch function to update state */}
            {children}
        </LeadContext.Provider>
    )
}
