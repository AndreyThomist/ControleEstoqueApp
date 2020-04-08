
import { AsyncStorage } from 'react-native'
export const LOG_IN = "LOG_IN"
export const START_UP = "START_UP"

import config from '../../helpers/config'






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
