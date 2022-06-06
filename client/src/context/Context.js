import {createContext,useEffect,useReducer} from 'react'
import { Reducer } from './Reducer'

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem('user')) || null,
    isFetching:false,
    error:false,
    focused:false,
    isLoading:false,
}

export const context = createContext(INITIAL_STATE)

export const ContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,INITIAL_STATE)

    useEffect(()=> {
        localStorage.setItem('user',JSON.stringify(state.user))
    },[state.user])

    return (
        <context.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            focused:state.focused,
            dispatch,
            isLoading:state.isLoading
        }} >
            {children}
        </context.Provider>
    )

}
