import ProviderReducer   from '../store/reducers/providerReducer'
import 'isomorphic-fetch';
import {FETCH_PROVIDERS} from '../store/actions/provider'
import Provider from '../models/provider';


const initialState = {
    providers:[]
}

describe('testando provider reducer',() => {
    
    it('testando FETCH_PROVIDERS',() => {
        const provider = new Provider(1, "Teste")
        const actions = {
            type:FETCH_PROVIDERS,
            providers:[provider]
        };
        const expected = {
            providers: actions.providers,
        }
        expect(ProviderReducer(initialState,actions)).toEqual(expected)
    })

})

