
import Item from '../../models/Item'
import { FETCH_ITEMS, DELETE_ITEM,FETCH_USER_ITEMS, CREATE_ITEM } from '../actions/items';

const initialState = {
    items:[],
    usersItems:[]
}

const ItemReducer = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_ITEMS:
        return {
            items:actions.resData,
        }
        case CREATE_ITEM:
            return {
                ...state,
                items:state.items.concat(actions.item),
                usersItems:state.items.concat(actions.item)
            }
        case FETCH_USER_ITEMS:
            console.log(actions.resData)
            return {
                ...state,
                usersItems:actions.resData
            }
        case DELETE_ITEM:
            return {
                ...state,
                items:state.items.filter(element => element.id != actions.id),
                usersItems:state.items.filter(element => element.id != actions.id)
        }
        default:
            return state;
    }
}

export default ItemReducer