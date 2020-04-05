import { FETCH_PROVIDERS } from "../actions/provider";

const initialState = {
    providers:[]
}

const providerReducer = (state=initialState,actions)=>{
    switch(actions.type){
        case FETCH_PROVIDERS:
        return {
            providers:actions.providers
        }
        default:
        return state;
    }
}

export default providerReducer