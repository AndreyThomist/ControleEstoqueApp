import Item from '../../models/Item'
export const FETCH_ITEMS = "FETCH_ITEMS";
export const DELETE_ITEM = 'DELETE_ITEM'

export const fecthItems = () => {
    return async dispatch => {
      const response =  await fetch('https://estoque-e4c4b.firebaseio.com/items.json')
      const items = [];
      const resData = await response.json();
      for(const x in resData){
        if(resData[x]){
          items.push(new Item(x.toString(),resData[x].imageUrl,resData[x].name,resData[x].name,resData[x].provider,resData[x].quantity));
        }
      }
      dispatch({
          type:FETCH_ITEMS,
          resData:items
      })
    }
}

export const deleteItem = (id) => {
    return async dispatch => {
        const response = await fetch(`https://estoque-e4c4b.firebaseio.com/items/${id}.json`,{
            method:"Delete",
        })
       const data = await response.json();
          dispatch({
            type:DELETE_ITEM,
            id:id          
       })
    }
}