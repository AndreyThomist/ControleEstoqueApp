
import Item from '../../models/Item'

const dummyProducts = [
    new Item('1','https://i.imgur.com/JFWdvQd.png','Caneta Azul ','u1','f1',10),
    new Item('2','https://i.imgur.com/HoVChfQ.png','Borracha Faber Castel','u1','f2',2),
    new Item('3','https://i.imgur.com/TT6q02x.png','Papel Higiênico mili','u1','f3',2),
];

const initialState = {
    items:dummyProducts,
    usersItems:dummyProducts.find(element => element.userId === "u1")
}

const ItemReducer = (state=initialState,actions) => {
    return state;
}

export default ItemReducer