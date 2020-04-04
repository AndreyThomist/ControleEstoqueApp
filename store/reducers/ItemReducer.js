
import Item from '../../models/Item'
import { FETCH_ITEMS } from '../actions/items';



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
    }
    return state;
}

export default ItemReducer