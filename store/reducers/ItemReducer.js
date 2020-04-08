
import Item from '../../models/Item'
import { FETCH_ITEMS, DELETE_ITEM, CREATE_ITEM } from '../actions/items';

const initialState = {
    items:[],
    usersItems:[]
}

const ItemReducer = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_ITEMS:
            console.log(actions.resData)
        return {
            items:actions.resData,
            usersItems:actions.resData.find(element => element.userId === "u1")
        }
        case CREATE_ITEM:
            return {
                ...state,
                items:state.items.concat(actions.item),
                usersItems:state.items.concat(actions.item)
            }
        case DELETE_ITEM:
            return {
                ...state,
                items:state.items.filter(element => element.id != actions.id),
                usersItems:state.items.filter(element => element.id != actions.id)
            }
    }
    return state;
}

export default ItemReducer