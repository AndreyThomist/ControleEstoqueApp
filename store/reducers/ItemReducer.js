
import Item from '../../models/Item'
import { FETCH_ITEMS, DELETE_ITEM, FETCH_USER_ITEMS, CREATE_ITEM,UPDATE_ITEM } from '../actions/items';

const initialState = {
    items: [],
    usersItems: []
}

const ItemReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_ITEMS:
            return {
                items: actions.resData,
            }
        case CREATE_ITEM:
            return {
                ...state,
                items: state.items.concat(actions.item),
                usersItems: state.usersItems.concat(actions.item)
            }
        case FETCH_USER_ITEMS:
            return {
                ...state,
                usersItems: actions.resData
            }
        case UPDATE_ITEM:
            const items = [...state.items]
            const index =  items.findIndex(item => item.id === actions.item.id)
            items[index] = actions.item
            let usersItems = [];
            if(state.usersItems){
                 usersItems = [...state.usersItems]
                 userItemindex = usersItems.findIndex(item => item.id === actions.item.id)
                 if(userItemindex){
                    usersItems[userItemindex] = actions.item
                }
            }
            return {
                ...state,
                items: items,
                usersItems: usersItems
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(element => element.id != actions.id),
                usersItems: state.items.filter(element => element.id != actions.id)
            }
        default:
            return state;
    }
}

export default ItemReducer