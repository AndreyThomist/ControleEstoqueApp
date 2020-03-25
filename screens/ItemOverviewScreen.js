import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { useSelector } from 'react-redux'
import ItemList from '../components/layout/ItemList'

const ItemOverView = (props) => {
   const items =  useSelector(state => state.itens.items)
    return <ItemList items={items} />
}

ItemOverView.navigationOptions = nav => {
    return {
        headerTitle:"Listagem de itens"
    }
}

export default ItemOverView;