
//CREATE AUTH ACTIONS (START_LOGIN , SUCCESS_LOGIN, FAIL_LOGIN)
export const StartLogin = (userCredentials) => ({
  type: "START_LOGIN"
})

export const SuccessLogin = (user) => ({
  type: "SUCCESS_LOGIN",
  payload: user
})

export const FailLogin = (error) => ({
  type: "FAIL_LOGIN",
  payload: error
})