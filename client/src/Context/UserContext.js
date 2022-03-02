//IMPORT CREATECONTEXT FROM REACT TO CREAT NEW CONTEXT 
import { createContext, useReducer } from 'react';
//IMPORT REDUCER FROM UserReducer
import UserReducer from './UserReducer';

//IDINTIFY THE INITIAL STATE OF LOGIN USER (when user click login)
const INIT_STATE = {
  // user: null,
  user: JSON.parse(localStorage.getItem('userConnected')),
  isFetching: false,
  error: false
}
  //EXPORT THIS CONTEXT
  export const UserContext = createContext(INIT_STATE);

  //CREATE WRAPPER TO WRAP THIS CONTEXT INSIDE THE APPLICATION
  export const UserContextProvider = ( {children} ) => {
    //use reducer (UserReducer file) (updatedState, dispatch)
    const [state, dispatch] = useReducer(UserReducer, INIT_STATE)

    //RETURN UserCONTEXT.PROVIDER AND PASS VALUES AND CHILDRENS(WRAP INSIDE THE WHOLE APP)
    return(
      <UserContext.Provider value={ { user:state.user, isFetching:state.isFetching, error:state.error, dispatch } }>
        {children}
      </UserContext.Provider>
    )
  }