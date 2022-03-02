//CREATE AUTH REDUCER
const UserReducer = (state, action) => {
  //switch actions (for each action do something)
  switch (action.type){
    case "START_LOGIN":
      return {
        user:null,
        isFetching: true,
        error: false
      }

    case "SUCCESS_LOGIN":
      return {
        user:action.payload,
        isFetching: false,
        error: false
      }

    case "FAIL_LOGIN":
      return {
        user:null,
        isFetching: false,
        error: action.payload
      }

    default: return state
  }
}

export default UserReducer;