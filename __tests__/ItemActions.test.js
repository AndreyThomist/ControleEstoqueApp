import * as itemsActions from '../store/actions/items'
import {FETCH_ITEMS} from '../store/actions/items'
import thunk from 'redux-thunk'
var fetchMock = require('fetch-mock');
import configureMockStore from 'redux-mock-store'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)



describe('actions', () => {
    it('buscou os dados do servidor', async () => {
       let request = await fetchMock.get('https://estoque-e4c4b.firebaseio.com/items.json', {
            headers: {
              ['Content-Type']: 'application/json'
            },
            sendAsJson: false,
        });
        console.log(request);
        const resData = await request.data;
        const items = [];
        for (const x in resData) {
          items.push(new Item(x.toString(), resData[x].imageUrl, resData[x].userId, resData[x].name, resData[x].provider, resData[x].quantity));
        }
        const expectedActions = [{
            type:FETCH_ITEMS,
            resData:itemsActions.fetchItems
        }]
        const store = mockStore();
        return store.dispatch(itemsActions.fetchItems()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})

