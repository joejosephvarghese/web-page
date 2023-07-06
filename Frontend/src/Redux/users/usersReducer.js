import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "./userTypes"

const initialState = {
    users : [],
    error : '',
    profilePic: ''
}

const usersReducer=(state=initialState, action)=>{
    switch(action.type){
        case FETCH_USERS_SUCCESS:
            return{
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            
            return{
                users: [],
                error: action.payload
            }
                
        default: return state
    }
}

export default usersReducer;