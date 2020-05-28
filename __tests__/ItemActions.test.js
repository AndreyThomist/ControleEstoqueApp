import * as itemsActions from '../store/actions/items'
import Item from '.././models/Item'
import {FETCH_ITEMS} from '../store/actions/items'
import thunk from 'redux-thunk'
import 'isomorphic-fetch';
import configureMockStore from 'redux-mock-store'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)



describe('actions', () => {
    it('buscou os dados do servidor', async () => {
        let request = await fetch('https://estoque-e4c4b.firebaseio.com/items.json');
        const resData = await request.json();
        const items = [];
        for (const x in resData) {
          items.push(new Item(x.toString(), resData[x].imageUrl, resData[x].userId, resData[x].name, resData[x].provider, resData[x].quantity));
        }
        console.log(items);
        const expectedActions = [{
            type:FETCH_ITEMS,
            resData:items
        }]
        const store = mockStore();
        return store.dispatch(itemsActions.fetchItems()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})

