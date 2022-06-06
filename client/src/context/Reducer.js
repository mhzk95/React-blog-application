export const Reducer = (state,{type,payload}) => {
    switch(type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false
            }
        case "LOGIN_SUCCESS" :
            return{
                user:payload,
                isFetching:false,
                error:false,
                focused:true
            }
        case "LOGIN_FAILURE" :
            return{
                user:null,
                isFetching:false,
                error:true,
                focused:true
            }
        case "LOGOUT":
            return{
                user:null,
                isFetching:false,
                error:false
            }
        case "RESET":
            return{
                ...state,
                error:false,
                focused:true
            }
        case "UPDATE_START":
                return{
                    ...state,
                    isFetching:true
                }
        case "UPDATE_SUCCESS" :
                return{
                    user:payload,
                    isFetching:false,
                    error:false
                }
        case "UPDATE_FAILURE" :
                return{
                    user:null,
                    isFetching:false,
                    error:true
                }
        case "FETCHING_START" :
            return{
                ...state,
                isLoading:true
            }
        case "FETCHING_SUCCESS" :
            return{
                ...state,
                isLoading:false
            }
        case "FETCHING_FAILURE" :
            return{
                ...state,
                isLoading:false,
                error:true
            }
        default: return state
        
    }
}