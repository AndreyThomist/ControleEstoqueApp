import ItemReducer   from '../store/reducers/ItemReducer'
import 'isomorphic-fetch';
import {FETCH_ITEMS,CREATE_ITEM,FETCH_USER_ITEMS,UPDATE_ITEM,DELETE_ITEM} from '../store/actions/items'
import Item from '../models/Item';


const initialState = {
    items: [],
    usersItems: []
}

describe('testando items reducer',() => {
    
    it('testando FETCH ITEMS REDUCER',() => {

        const actions = {
            type:FETCH_ITEMS,
            resData:[]
        };
        const expected = {
            items: actions.resData,
        }
        expect(ItemReducer(initialState,actions)).toEqual(expected)
    })

    it('testando FETCH_USER_ITEMS',() => {
      
        const actions = {
            type:FETCH_USER_ITEMS,
            resData:[]
        };
        const expected = {
            items:[] ,
            usersItems: actions.resData

        }
        expect(ItemReducer(initialState,actions)).toEqual(expected)
    })

    it('Testando CREATE_ITEM',() => {
        const item = new Item((new Date().getTime() * (Math.random() + (10 - 1) + 1),'u1','Ronie','P1',10));
        const actions = {
            type:CREATE_ITEM,
            item
        }
        const expected = {
            items: initialState.items.concat(actions.item),
            usersItems: initialState.items.concat(actions.item)
        }        
        expect(ItemReducer(initialState,actions)).toEqual(expected)
    })
    
    it('Testando UPDATE_ITEM',() => {
        const item = new Item(4,'u1','Ronie','P1',10);
        const item2 = new Item(5,'u1','Andrey','P1',10);
        const item3 = new Item(6,'u1','Victor','P1',10);
        const item4 = new Item(6,'u1','Ricardo','P1',10);

        const state = {
            items: [item, item2, item3],
        }
        const actions = {
            type:UPDATE_ITEM,
            item:item4
        }
        const expected = {
            items: [item, item2, item4],
            usersItems: []
        }   
        expect(ItemReducer(state,actions)).toEqual(expected)
    })

    it('Testando DELETE_ITEM',() => {
        const item = new Item(1,'u1','Ronie','P1',10);
        const item2 = new Item(2,'u1','Andrey','P1',10);
        const item3 = new Item(3,'u1','Victor','P1',10);
        const state = {
            items: [item, item2, item3],
            usersItems: []
        }
        const actions = {
            type:DELETE_ITEM,
            id:item3.id
        }
        const expected = {
            items: [item, item2],
            usersItems: []
        }     
        let tmp = ItemReducer(state,actions)
        console.log(tmp);
           
        expect(tmp).toEqual(expected)
    })
})

