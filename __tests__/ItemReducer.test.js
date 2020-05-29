import ItemReducer from '../store/reducers/ItemReducer'
import 'isomorphic-fetch';
import {FETCH_ITEMS,CREATE_ITEM} from '../store/actions/items'
import Item from '../models/Item';


const initialState = {
    items: [],
    usersItems: []
}

describe('testando items reducer',() => {
    it('testando FETCH ITEMS REDUCER',() => {
        /*Estado Inicial do reducer */
       /*Esse Json com actions é passado do arquivo de action para o reducer */
        const actions = {
            type:FETCH_ITEMS,
            resData:[]
        };
        ItemReducer(initialState,actions);
    })

    it('testando create item',() => {
        const item = new Item((new Date().getTime() * (Math.random() + (10 - 1) + 1),'u1','Ronie','P1',10);
        const actions = {
            type:CREATE_ITEM,
            item
        }
        ItemReducer(initialState,actions);
    })
})

