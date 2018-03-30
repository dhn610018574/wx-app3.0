//
const APP_LOGIN = 'APP_LOGIN';
const APP_LOGOUT = 'APP_LOGOUT';

export default function loginRedcer(state,action){
  if(!state){
    state = {
      userInfo:{}
    }
  }
  switch(action.type){
    case APP_LOGIN:
    return {userInfo:action.userInfo}
    case APP_LOGOUT:
    return {userInfo:{}}
    default :
    return state
  }
}

export const app_login = (userInfo) => {
  return {type:APP_LOGIN,userInfo}
}
export const app_logout = (userInfo) => {
  return {type:APP_LOGOUT,userInfo}
}

