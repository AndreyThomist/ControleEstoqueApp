import Provider from '../../models/provider'
export const FETCH_PROVIDERS = "FETCH_PROVIDERS"


export const fetchProviders = () => {
    return async dispatch => {
        const response =  await fetch('https://estoque-e4c4b.firebaseio.com/providers.json')
        const providers = [];
        const resData = await response.json();
        for(const x  in resData){
            providers.push(new Provider(x,resData[x].name))
        }
        dispatch({
            type:FETCH_PROVIDERS,
            providers:providers
        })
    }
}