import React from 'react'
import {FlatList,Text} from 'react-native'
import Item from  '../../components/layout/Item'
const ItemList = (props) => {
    return (
        <FlatList renderItem={(item,indice) => item.id} data={props.items} renderItem={({item}) => {
            return <Item name={item.name} quantity={item.quantity} imageUrl={item.imageUrl} />
       }} />
    );
}

export default ItemList;