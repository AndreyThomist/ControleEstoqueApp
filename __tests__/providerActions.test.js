import * as providerActions from '../store/actions/provider'
import Provider from '../models/provider'
import {FETCH_PROVIDERS} from '../store/actions/provider'
import thunk from 'redux-thunk'
import 'isomorphic-fetch';
import configureMockStore from 'redux-mock-store'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)



describe('actions', () => {
    it('buscou os dados do servidor', async () => {
        let request = await fetch('https://estoque-e4c4b.firebaseio.com/providers.json');
        const resData = await request.json();
        const providers = [];
        for (const x in resData) {
            providers.push(new Provider(x.toString(), resData[x].name));
        }
        console.log(providers);
        const expectedActions = [{
            type:FETCH_PROVIDERS,
            providers:providers
        }]
        const store = mockStore();
        return store.dispatch(providerActions.fetchProviders()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

