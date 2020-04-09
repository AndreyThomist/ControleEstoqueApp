
import { AsyncStorage } from 'react-native'
export const LOG_IN = "LOG_IN"
export const START_UP = "START_UP"
export const LOG_OUT = "LOG_OUT"
export const AUTHENTICATE = 'AUTHENTICATE'

import config from '../../helpers/config'

let timer;

export const logout = () => {
    return async dispatch => {
        clearTimeout(timer);
        console.log('entrou');
       await  AsyncStorage.removeItem('userData')
        dispatch({
            type:LOG_OUT
        })
    }
}

const expirationInterval = (timeout) => {
    if(timeout){
      return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
          },timeout * 1000)
      }
    }
}

export const authenticate = (auth) => {
    return dispatch => {
        dispatch({
            type:AUTHENTICATE,
            auth:auth
        })
    }
}


export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`, {
            method: "post",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })
        const resData = await response.json();
        await AsyncStorage.setItem('userData', JSON.stringify({
            email: resData.email,
            token: resData.idToken,
            expiresIn: new Date().getTime() + resData.expiresIn * 1000,
            userId: resData.localId
        }))
        dispatch(expirationInterval(resData.expiresIn))
        dispatch({
            type: LOG_IN,
            data: {
                email: resData.email,
                token: resData.idToken,
                expiresIn: resData.expiresIn,
                userId: resData.localId
            }
        })
    }
}
