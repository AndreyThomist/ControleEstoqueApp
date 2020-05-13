import Item from '../../models/Item'
export const FETCH_ITEMS = "FETCH_ITEMS";
export const DELETE_ITEM = 'DELETE_ITEM'
export const CREATE_ITEM = 'CREATE_ITEM'
export const UPDATE_ITEM = "UPDATE_ITEM"
export const FETCH_USER_ITEMS = 'FETCH_USER_ITEMS'

export const fetchItems = () => {
  return async dispatch => {
    const response = await fetch('https://estoque-e4c4b.firebaseio.com/items.json')
    const items = [];
    const resData = await response.json();
    for (const x in resData) {
      items.push(new Item(x.toString(), resData[x].imageUrl, resData[x].userId, resData[x].name, resData[x].provider, resData[x].quantity));
    }
    console.log(items)
    dispatch({
      type: FETCH_ITEMS,
      resData: items
    })
  }
}

export const fetchItemsUser = () => {
  return async (dispatch, getState) => {
    const userId = getState()['auth'].userId
    const response = await fetch(`https://estoque-e4c4b.firebaseio.com/items.json?orderBy="userId"&equalTo="${userId}"`)
    const items = [];
    const resData = await response.json();
    for (const x in resData) {
      items.push(new Item(x.toString(), resData[x].imageUrl, resData[x].userId, resData[x].name, resData[x].provider, resData[x].quantity,resData[x].userId));
    }
    dispatch({
      type:FETCH_USER_ITEMS,
      resData:items 
    })
  }
}

export const createItem = (item) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    item.userId = userId;
    const response = await fetch('https://estoque-e4c4b.firebaseio.com/items.json', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const resData = await response.json();
    const newItem = new Item(resData, item.imageUrl, item.userId, item.name, item.provider, item.quantity);
    dispatch({
      type: CREATE_ITEM,
      item: newItem
    })

  }
}

export const editItem = (item) => {
  console.log(item)
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    item.userId = userId;
    const response = await fetch(`https://estoque-e4c4b.firebaseio.com/items/${item.id}.json`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const resData = await response.json();
    const updatedItem = new Item(item.id, item.imageUrl, item.userId, item.name, item.provider, item.quantity);
    dispatch({
      type: UPDATE_ITEM,
      item: updatedItem
    })

  }
}


export const deleteItem = (id) => {
  return async dispatch => {
    const response = await fetch(`https://estoque-e4c4b.firebaseio.com/items/${id}.json`, {
      method: "Delete",
    })
    const data = await response.json();
    dispatch({
      type: DELETE_ITEM,
      id: id
    })
  }
}