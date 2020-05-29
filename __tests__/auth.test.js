import * as Auth from '../store/actions/auth'
import thunk from 'redux-thunk'
import 'isomorphic-fetch';
import configureMockStore from 'redux-mock-store'
import config from '../helpers/config'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const email = "teste@gmail.com"
const password = "123456"


describe('actions', () => {
    it('buscou os dados do servidor', async () => {
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
  
        const expectedActions = [{
            type: "LOG_IN",
            data: {
                email: resData.email,
                token: resData.idToken,
                expiresIn: resData.expiresIn,
                userId: resData.localId
            }
        }]
        const store = mockStore();
        return store.dispatch(Auth.login(email,password)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})


