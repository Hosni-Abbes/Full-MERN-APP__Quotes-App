//THIS FILE FOR API CALLS (USER LOGIN)

import axios from "axios";

//LOGIN API
export const loginApi = async (userCredintials, dispatch) => {
  //dipatch actions
  dispatch( { type: "START_LOGIN" } )
  //make request
  try{
    const res = await axios.post('/auth/login', userCredintials)
    //if req is successful dispatch SUCCESS_LOGIN action
    dispatch( { type: "SUCCESS_LOGIN", payload:res.data } )
  }catch(err){
    //if there is an error dispatch error action
    dispatch( { type: "FAIL_LOGIN", payload:err } )
  }
}
